import { NextResponse } from "next/server"

// City coordinates for Indian cities
const CITY_COORDINATES: Record<string, { lat: number; lon: number }> = {
  Mumbai: { lat: 19.076, lon: 72.8777 },
  Delhi: { lat: 28.7041, lon: 77.1025 },
  Bangalore: { lat: 12.9716, lon: 77.5946 },
  Hyderabad: { lat: 17.385, lon: 78.4867 },
  Chennai: { lat: 13.0827, lon: 80.2707 },
  Kolkata: { lat: 22.5726, lon: 88.3639 },
  Pune: { lat: 18.5204, lon: 73.8567 },
  Ahmedabad: { lat: 23.0225, lon: 72.5714 },
  Jaipur: { lat: 26.9124, lon: 75.7873 },
  Lucknow: { lat: 26.8467, lon: 80.9462 },
}

// Fallback estimated AQI values for Indian cities (based on historical averages)
function getEstimatedAQI(city: string): number {
  const estimatedAQI: Record<string, number> = {
    Mumbai: 165,
    Delhi: 220,
    Bangalore: 95,
    Hyderabad: 130,
    Chennai: 140,
    Kolkata: 180,
    Pune: 110,
    Ahmedabad: 150,
    Jaipur: 160,
    Lucknow: 190,
  }
  return estimatedAQI[city] || 150
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get("city")

    if (!city || !CITY_COORDINATES[city]) {
      return NextResponse.json({ error: "Invalid city" }, { status: 400 })
    }

    const { lat, lon } = CITY_COORDINATES[city]

    // Fetch weather data from Open-Meteo (completely free, no API key needed)
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m&timezone=Asia/Kolkata`,
      { cache: 'no-store' }
    )

    if (!weatherResponse.ok) {
      throw new Error("Failed to fetch weather data")
    }

    const weatherData = await weatherResponse.json()

    // Fetch AQI data from AQICN with your API key
    let aqi = null
    let aqiSource = "Estimated (Historical Average)"
    
    // Get AQICN API key from environment
    const aqicnApiKey = process.env.AQICN_API_KEY
    
    if (aqicnApiKey) {
      try {
        // Try city-based endpoint first (more reliable for major cities)
        const cityName = city.toLowerCase()
        const aqiCityResponse = await fetch(
          `https://api.waqi.info/feed/${cityName}/?token=${aqicnApiKey}`,
          { cache: 'no-store' }
        )
        
        if (aqiCityResponse.ok) {
          const aqiCityData = await aqiCityResponse.json()
          if (aqiCityData.status === "ok" && aqiCityData.data?.aqi && aqiCityData.data.aqi > 0) {
            aqi = aqiCityData.data.aqi
            aqiSource = "AQICN (Real-time)"
            console.log(`[CareFund] Real-time AQI for ${city}:`, aqi)
          }
        }
        
        // If city endpoint fails, try geo-location API
        if (!aqi) {
          const aqiGeoResponse = await fetch(
            `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${aqicnApiKey}`,
            { cache: 'no-store' }
          )
          
          if (aqiGeoResponse.ok) {
            const aqiGeoData = await aqiGeoResponse.json()
            if (aqiGeoData.status === "ok" && aqiGeoData.data?.aqi && aqiGeoData.data.aqi > 0) {
              aqi = aqiGeoData.data.aqi
              aqiSource = "AQICN (Real-time)"
              console.log(`[CareFund] Real-time AQI for ${city} (geo):`, aqi)
            }
          }
        }
      } catch (error) {
        console.error(`[CareFund] AQICN API error for ${city}:`, error)
      }
    } else {
      console.log(`[CareFund] AQICN_API_KEY not found in environment, using estimated values`)
    }

    // Use estimated values if API key not available or fetch failed
    if (!aqi) {
      aqi = getEstimatedAQI(city)
      console.log(`[CareFund] Using estimated AQI for ${city}:`, aqi)
    }

    return NextResponse.json({
      city,
      aqi,
      temperature: Math.round(weatherData.current.temperature_2m),
      humidity: weatherData.current.relative_humidity_2m,
      timestamp: new Date().toISOString(),
      source: {
        weather: "Open-Meteo (Real-time)",
        aqi: aqiSource,
      },
    })
  } catch (error) {
    console.error("[CareFund] Environment API error:", error)
    return NextResponse.json(
      { error: "Failed to fetch environmental data" },
      { status: 500 }
    )
  }
}
