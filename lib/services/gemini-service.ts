import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export interface GeminiAnalysisRequest {
  userProfile: any
  environmentalData: any
  statisticalData: any
  occupationHazard: any
  cityStats: any
}

export interface GeminiFinancialRequest {
  riskAnalysis: any
  userProfile: any
  insurancePlan: any
}

/**
 * Agent 1: Risk Analysis using Gemini
 */
export async function analyzeHealthRisks(data: GeminiAnalysisRequest): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || "gemini-2.5-pro" })

    const prompt = `
You are a health risk analysis expert. Analyze the following data and provide a comprehensive health risk assessment.

USER PROFILE:
- Age: ${data.userProfile.age}
- Occupation: ${data.userProfile.occupation}
- City: ${data.userProfile.city}, Area: ${data.userProfile.area}
- Work Shift: ${data.userProfile.workShift}
- Health Condition: ${data.userProfile.healthCondition}
- Addictions: ${data.userProfile.addictions}
- Past Surgery: ${data.userProfile.pastSurgery}

ENVIRONMENTAL DATA:
- Air Quality Index (AQI): ${data.environmentalData.aqi}
- Temperature: ${data.environmentalData.temperature}°C
- Humidity: ${data.environmentalData.humidity}%

OCCUPATION HAZARDS:
- Hazard Level: ${data.occupationHazard.hazardLevel}
- Risk Score: ${data.occupationHazard.riskScore}
- Death Rate: ${data.occupationHazard.deathRate} per 100,000 workers
- Common Risks: ${data.occupationHazard.commonRisks.join(", ")}
- Health Issues: ${data.occupationHazard.healthIssues.join(", ")}

CITY STATISTICS:
- Crime Rate: ${data.cityStats.crimeRate} per 100,000 population
- Safety Index: ${data.cityStats.safetyIndex}/100
- Stress Level: ${data.cityStats.stressLevel}
- Health Risk Impact: ${data.cityStats.healthRiskImpact}

STATISTICAL DATA:
- City Health Index: ${data.statisticalData.cityHealthIndex}
- Death Rate: ${data.statisticalData.deathRate}

Please provide:
1. A detailed analysis of the major health risk factors
2. How environmental conditions affect health
3. Occupation-specific health concerns
4. Impact of lifestyle factors (work shift, addictions, etc.)
5. City-specific health risks (pollution, crime-related stress)
6. Overall health outlook

Keep the analysis professional, clear, and actionable. Focus on preventive measures and risk mitigation.
`

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error("[Gemini] Risk analysis error:", error)
    return "AI analysis temporarily unavailable. Risk assessment based on statistical data and expert guidelines."
  }
}

/**
 * Agent 2: Financial Planning using Gemini
 */
export async function generateFinancialPlan(data: GeminiFinancialRequest): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || "gemini-2.5-pro" })

    const prompt = `
You are a financial planning expert specializing in health insurance and medical savings. Analyze the following data and provide comprehensive financial recommendations.

USER PROFILE:
- Age: ${data.userProfile.age}
- Occupation: ${data.userProfile.occupation}
- City: ${data.userProfile.city}

RISK ANALYSIS:
- Risk Score: ${data.riskAnalysis.riskScore}/100
- Risk Level: ${data.riskAnalysis.riskLevel}
- Key Risk Factors: ${data.riskAnalysis.riskFactors.map((f: any) => f.category).join(", ")}

RECOMMENDED INSURANCE:
- Plan: ${data.insurancePlan.name}
- Coverage: ₹${data.insurancePlan.coverage.toLocaleString()}
- Monthly Premium: ₹${data.insurancePlan.premium.toLocaleString()}
- Features: ${data.insurancePlan.features.slice(0, 5).join(", ")}

Please provide:
1. Why this insurance plan is suitable for the user's risk profile
2. Financial planning recommendations for healthcare costs
3. Monthly savings strategy to build emergency health fund
4. Tips for optimizing insurance benefits
5. Long-term financial health security advice
6. How to prepare for unexpected medical expenses

Keep recommendations practical, India-specific, and focused on financial security. Consider the user's occupation and risk level.
`

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error("[Gemini] Financial planning error:", error)
    return "AI financial analysis temporarily unavailable. Recommendations based on standard financial planning guidelines."
  }
}

/**
 * Generate prevention steps using Gemini
 */
export async function generatePreventionSteps(
  riskFactors: any[],
  userProfile: any,
  occupationHazard: any
): Promise<string[]> {
  try {
    const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || "gemini-2.5-pro"})

    const prompt = `
Based on the following health risk factors, provide 5-7 specific, actionable prevention steps:

RISK FACTORS:
${riskFactors.map(f => `- ${f.category}: ${f.description}`).join("\n")}

USER CONTEXT:
- Occupation: ${userProfile.occupation}
- Age: ${userProfile.age}
- Health Condition: ${userProfile.healthCondition}

OCCUPATION HAZARDS:
${occupationHazard.commonRisks.join(", ")}

Provide prevention steps as a numbered list. Each step should be:
- Specific and actionable
- Relevant to the user's situation
- Practical to implement
- Focused on prevention rather than treatment

Format: Return only the numbered list, one step per line.
`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    // Parse the response into an array
    const steps = text
      .split("\n")
      .filter(line => line.trim().match(/^\d+\./))
      .map(line => line.replace(/^\d+\.\s*/, "").trim())
      .filter(step => step.length > 0)
    
    return steps.length > 0 ? steps : [
      "Schedule regular health check-ups every 6 months",
      "Maintain a balanced diet rich in fruits and vegetables",
      "Exercise for at least 30 minutes daily",
      "Get adequate sleep (7-8 hours per night)",
      "Practice stress management techniques",
      "Follow workplace safety guidelines",
      "Stay hydrated and avoid excessive caffeine"
    ]
  } catch (error) {
    console.error("[Gemini] Prevention steps error:", error)
    return [
      "Schedule regular health check-ups every 6 months",
      "Maintain a balanced diet rich in fruits and vegetables",
      "Exercise for at least 30 minutes daily",
      "Get adequate sleep (7-8 hours per night)",
      "Practice stress management techniques",
      "Follow workplace safety guidelines",
      "Stay hydrated and avoid excessive caffeine"
    ]
  }
}

/**
 * Check if Gemini API is configured
 */
export function isGeminiConfigured(): boolean {
  return !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.length > 0
}
