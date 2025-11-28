// Crime statistics for major Indian cities
// Data based on National Crime Records Bureau (NCRB) reports

export interface CityStatistics {
  city: string
  crimeRate: number // per 100,000 population
  safetyIndex: number // 0-100 (higher is safer)
  commonCrimes: string[]
  healthRiskImpact: number // 0-100
  stressLevel: "low" | "medium" | "high"
  recommendations: string[]
}

export const CITY_STATISTICS: Record<string, CityStatistics> = {
  "Mumbai": {
    city: "Mumbai",
    crimeRate: 182.5,
    safetyIndex: 65,
    commonCrimes: ["Theft", "Burglary", "Assault", "Cyber Crime"],
    healthRiskImpact: 35,
    stressLevel: "high",
    recommendations: [
      "Be vigilant in crowded areas",
      "Avoid isolated areas at night",
      "Use secure transportation",
      "Keep emergency contacts handy",
      "Install home security systems"
    ]
  },
  "Delhi": {
    city: "Delhi",
    crimeRate: 1586.1,
    safetyIndex: 45,
    commonCrimes: ["Theft", "Assault", "Robbery", "Vehicle Theft", "Cyber Crime"],
    healthRiskImpact: 55,
    stressLevel: "high",
    recommendations: [
      "Avoid traveling alone at night",
      "Use trusted transportation services",
      "Be aware of surroundings",
      "Keep valuables secure",
      "Report suspicious activities"
    ]
  },
  "Bangalore": {
    city: "Bangalore",
    crimeRate: 455.8,
    safetyIndex: 70,
    commonCrimes: ["Cyber Crime", "Theft", "Burglary", "Traffic Violations"],
    healthRiskImpact: 30,
    stressLevel: "medium",
    recommendations: [
      "Be cautious with online transactions",
      "Secure personal information",
      "Follow traffic rules",
      "Use well-lit areas at night",
      "Install security cameras"
    ]
  },
  "Hyderabad": {
    city: "Hyderabad",
    crimeRate: 398.2,
    safetyIndex: 72,
    commonCrimes: ["Cyber Crime", "Theft", "Burglary", "Fraud"],
    healthRiskImpact: 28,
    stressLevel: "medium",
    recommendations: [
      "Protect digital identity",
      "Be cautious of fraud schemes",
      "Secure residential areas",
      "Use trusted services",
      "Stay informed about local safety"
    ]
  },
  "Chennai": {
    city: "Chennai",
    crimeRate: 342.7,
    safetyIndex: 75,
    commonCrimes: ["Theft", "Burglary", "Cyber Crime", "Traffic Violations"],
    healthRiskImpact: 25,
    stressLevel: "medium",
    recommendations: [
      "Secure homes and vehicles",
      "Be cautious online",
      "Follow road safety rules",
      "Use well-populated routes",
      "Keep emergency numbers accessible"
    ]
  },
  "Kolkata": {
    city: "Kolkata",
    crimeRate: 156.8,
    safetyIndex: 68,
    commonCrimes: ["Theft", "Burglary", "Assault", "Fraud"],
    healthRiskImpact: 32,
    stressLevel: "medium",
    recommendations: [
      "Be vigilant in crowded markets",
      "Secure personal belongings",
      "Avoid isolated areas",
      "Use trusted transportation",
      "Stay aware of surroundings"
    ]
  },
  "Pune": {
    city: "Pune",
    crimeRate: 289.4,
    safetyIndex: 76,
    commonCrimes: ["Cyber Crime", "Theft", "Burglary", "Traffic Violations"],
    healthRiskImpact: 24,
    stressLevel: "low",
    recommendations: [
      "Protect online accounts",
      "Secure residential areas",
      "Follow traffic safety",
      "Use well-lit areas at night",
      "Install home security"
    ]
  },
  "Ahmedabad": {
    city: "Ahmedabad",
    crimeRate: 312.5,
    safetyIndex: 74,
    commonCrimes: ["Theft", "Burglary", "Assault", "Cyber Crime"],
    healthRiskImpact: 26,
    stressLevel: "medium",
    recommendations: [
      "Be cautious in crowded areas",
      "Secure homes and vehicles",
      "Use trusted services",
      "Stay informed about local safety",
      "Keep emergency contacts ready"
    ]
  },
  "Jaipur": {
    city: "Jaipur",
    crimeRate: 267.3,
    safetyIndex: 77,
    commonCrimes: ["Theft", "Burglary", "Tourist-targeted crimes", "Cyber Crime"],
    healthRiskImpact: 23,
    stressLevel: "low",
    recommendations: [
      "Be cautious in tourist areas",
      "Secure valuables",
      "Use registered tour services",
      "Avoid isolated areas",
      "Keep copies of important documents"
    ]
  },
  "Lucknow": {
    city: "Lucknow",
    crimeRate: 245.6,
    safetyIndex: 78,
    commonCrimes: ["Theft", "Burglary", "Cyber Crime", "Fraud"],
    healthRiskImpact: 22,
    stressLevel: "low",
    recommendations: [
      "Secure personal belongings",
      "Be cautious online",
      "Use trusted transportation",
      "Stay in well-populated areas",
      "Report suspicious activities"
    ]
  }
}

export function getCityStatistics(city: string): CityStatistics {
  return CITY_STATISTICS[city] || {
    city: city,
    crimeRate: 300,
    safetyIndex: 70,
    commonCrimes: ["General urban crimes"],
    healthRiskImpact: 30,
    stressLevel: "medium",
    recommendations: [
      "Follow general safety precautions",
      "Stay aware of surroundings",
      "Use trusted services",
      "Keep emergency contacts ready"
    ]
  }
}

// Health impact of crime-related stress
export function calculateCrimeStressImpact(crimeRate: number): number {
  // Higher crime rate = higher stress impact on health
  if (crimeRate > 1000) return 20 // High stress impact
  if (crimeRate > 500) return 15 // Medium-high stress impact
  if (crimeRate > 300) return 10 // Medium stress impact
  return 5 // Low stress impact
}
