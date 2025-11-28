import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import clientPromise from "@/lib/mongodb"
import { 
  getInsurancePlan, 
  getAlternativePlans, 
  calculateMonthlySavings, 
  calculateEmergencyFund 
} from "@/lib/data/insurance-plans"
import { generateFinancialPlan, isGeminiConfigured } from "@/lib/services/gemini-service"
import { Agent2Results, AnalysisResults } from "@/types/agents"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { agent1Results, userProfile } = body

    if (!agent1Results || !userProfile) {
      return NextResponse.json({ error: "Agent 1 results and user profile are required" }, { status: 400 })
    }

    console.log("[Agent 2] Starting financial planning...")

    // Step 1: Get recommended insurance plan
    const insurancePlan = getInsurancePlan(
      agent1Results.riskScore,
      userProfile.age,
      userProfile.occupation
    )

    console.log("[Agent 2] Insurance plan selected:", insurancePlan.name)

    // Step 2: Get alternative plans
    const alternativePlans = getAlternativePlans(
      agent1Results.riskScore,
      userProfile.age
    )

    // Step 3: Calculate monthly savings
    const monthlySavings = calculateMonthlySavings(
      agent1Results.riskScore,
      insurancePlan.premium,
      userProfile.age
    )

    // Step 4: Calculate emergency fund
    const emergencyFund = calculateEmergencyFund(
      monthlySavings,
      agent1Results.riskScore
    )

    // Step 5: Calculate yearly health budget
    const yearlyHealthBudget = (insurancePlan.premium * 12) + (monthlySavings * 12)

    console.log("[Agent 2] Financial calculations complete")

    // Step 6: Generate financial recommendations
    const financialRecommendations = [
      {
        category: "Insurance Premium",
        suggestion: `Pay ₹${insurancePlan.premium.toLocaleString()} monthly for ${insurancePlan.name}`,
        amount: insurancePlan.premium,
        priority: "high" as const
      },
      {
        category: "Emergency Savings",
        suggestion: `Save ₹${monthlySavings.toLocaleString()} monthly to build emergency health fund`,
        amount: monthlySavings,
        priority: "high" as const
      },
      {
        category: "Emergency Fund Target",
        suggestion: `Build emergency fund of ₹${emergencyFund.toLocaleString()} over ${Math.ceil(emergencyFund / monthlySavings)} months`,
        amount: emergencyFund,
        priority: "medium" as const
      },
      {
        category: "Annual Health Budget",
        suggestion: `Allocate ₹${yearlyHealthBudget.toLocaleString()} annually for health expenses`,
        amount: yearlyHealthBudget,
        priority: "medium" as const
      },
      {
        category: "Tax Benefits",
        suggestion: "Claim tax deduction under Section 80D for health insurance premium",
        priority: "low" as const
      }
    ]

    // Add risk-specific recommendations
    if (agent1Results.riskScore > 70) {
      financialRecommendations.push({
        category: "Critical Illness Cover",
        suggestion: "Consider additional critical illness rider for comprehensive protection",
        priority: "low" as const
      })
    }

    if (userProfile.age > 45) {
      financialRecommendations.push({
        category: "Senior Care",
        suggestion: "Plan for increased healthcare costs in retirement years",
        priority: "low" as const
      })
    }

    // Step 7: Generate AI financial analysis using Gemini (if configured)
    let geminiAnalysis = "Financial recommendations based on standard planning guidelines and risk assessment."
    
    if (isGeminiConfigured()) {
      try {
        console.log("[Agent 2] Requesting Gemini AI financial analysis...")
        geminiAnalysis = await generateFinancialPlan({
          riskAnalysis: agent1Results,
          userProfile,
          insurancePlan
        })
        console.log("[Agent 2] Gemini financial analysis complete")
      } catch (error) {
        console.error("[Agent 2] Gemini analysis failed:", error)
      }
    } else {
      console.log("[Agent 2] Gemini API not configured, using fallback analysis")
    }

    // Step 8: Auto-pay setup information (future feature)
    const autoPaySetup = {
      available: false,
      message: "Auto-pay feature coming soon! You'll be able to set up automatic deductions from your bank account for insurance premiums and savings."
    }

    // Compile Agent 2 results
    const agent2Results: Agent2Results = {
      insurancePlan,
      alternativePlans,
      monthlySavings,
      emergencyFund,
      yearlyHealthBudget,
      financialRecommendations,
      geminiAnalysis,
      autoPaySetup,
      timestamp: new Date().toISOString()
    }

    console.log("[Agent 2] Financial planning complete")

    // Step 9: Store complete analysis in MongoDB
    try {
      const client = await clientPromise
      const db = client.db("carefund")

      const analysisResults = {
        userId: session.user.id,
        profileData: userProfile,
        agent1Results,
        agent2Results,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      await db.collection("analysis_results").insertOne(analysisResults)
      console.log("[Agent 2] Analysis results saved to database")
    } catch (dbError) {
      console.error("[Agent 2] Failed to save to database:", dbError)
      // Continue even if database save fails
    }

    return NextResponse.json({
      success: true,
      data: agent2Results
    })

  } catch (error) {
    console.error("[Agent 2] Error:", error)
    return NextResponse.json(
      { 
        error: "Failed to complete financial planning",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}
