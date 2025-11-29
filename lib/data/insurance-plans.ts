// Insurance plan templates based on risk levels

export interface InsurancePlanTemplate {
  name: string
  type: string
  minCoverage: number
  maxCoverage: number
  basePremium: number
  features: string[]
  advantages: string[]
  disadvantages: string[]
  suitableFor: string[]
  riskRange: {
    min: number
    max: number
  }
}

export const INSURANCE_PLANS: InsurancePlanTemplate[] = [
  {
    name: "Essential Health Cover",
    type: "Basic",
    minCoverage: 300000,
    maxCoverage: 500000,
    basePremium: 3500,
    features: [
      "Hospitalization coverage",
      "Pre and post hospitalization (30/60 days)",
      "Daycare procedures",
      "Ambulance charges",
      "Room rent (shared/semi-private)",
      "Annual health check-up"
    ],
    advantages: [
      "Most affordable premium - ideal for budget-conscious individuals",
      "Covers essential medical emergencies and hospitalization",
      "Quick claim settlement process",
      "No medical tests required for young, healthy individuals",
      "Tax benefits under Section 80D",
      "Suitable for those with low health risks"
    ],
    disadvantages: [
      "Limited coverage amount may not be sufficient for major illnesses",
      "Room rent restrictions (shared/semi-private only)",
      "Pre-existing diseases not covered initially",
      "No coverage for advanced treatments",
      "Limited network of hospitals",
      "No international coverage"
    ],
    suitableFor: [
      "Young professionals",
      "Low-risk occupations",
      "Good health conditions",
      "Students"
    ],
    riskRange: {
      min: 0,
      max: 40
    }
  },
  {
    name: "Comprehensive Care Plus",
    type: "Standard",
    minCoverage: 500000,
    maxCoverage: 1000000,
    basePremium: 5500,
    features: [
      "All Essential Cover features",
      "Private room coverage",
      "Pre-existing disease cover (after 2 years)",
      "Maternity coverage (optional)",
      "Critical illness rider",
      "No claim bonus (up to 50%)",
      "Worldwide emergency coverage",
      "Organ donor expenses"
    ],
    advantages: [
      "Balanced coverage with reasonable premium",
      "Private room facility for better comfort",
      "Pre-existing disease coverage after waiting period",
      "Critical illness protection included",
      "No claim bonus rewards healthy lifestyle",
      "Worldwide emergency coverage for travelers",
      "Suitable for families with optional maternity coverage",
      "Wide network of cashless hospitals"
    ],
    disadvantages: [
      "Higher premium compared to basic plans",
      "2-year waiting period for pre-existing diseases",
      "Room rent may have sub-limits",
      "Some advanced treatments may require co-payment",
      "Maternity coverage comes with additional cost",
      "May not cover all alternative treatments"
    ],
    suitableFor: [
      "Mid-career professionals",
      "Medium-risk occupations",
      "Families",
      "Those with minor health conditions"
    ],
    riskRange: {
      min: 41,
      max: 70
    }
  },
  {
    name: "Premium Health Shield",
    type: "Premium",
    minCoverage: 1000000,
    maxCoverage: 2000000,
    basePremium: 8500,
    features: [
      "All Comprehensive Care features",
      "Deluxe room coverage",
      "Pre-existing disease cover (immediate)",
      "Mental health coverage",
      "Alternative treatments (Ayurveda, Homeopathy)",
      "International treatment coverage",
      "Home healthcare",
      "Health coaching and wellness programs",
      "Second medical opinion",
      "No room rent capping",
      "Restoration of sum insured"
    ],
    advantages: [
      "Highest coverage amount for major medical expenses",
      "Immediate pre-existing disease coverage - no waiting period",
      "Deluxe room with no rent capping",
      "Comprehensive mental health coverage",
      "Alternative treatment options (Ayurveda, Homeopathy)",
      "International treatment coverage",
      "Home healthcare and wellness programs",
      "Sum insured restoration benefit",
      "Priority claim settlement",
      "Dedicated relationship manager"
    ],
    disadvantages: [
      "Significantly higher premium cost",
      "May require detailed medical examination",
      "Not affordable for lower income groups",
      "Some benefits may have usage limits",
      "Complex policy terms and conditions",
      "Higher documentation requirements for claims"
    ],
    suitableFor: [
      "High-risk occupations",
      "Senior professionals",
      "Those with existing health conditions",
      "High-stress jobs"
    ],
    riskRange: {
      min: 71,
      max: 100
    }
  }
]

export function getInsurancePlan(riskScore: number, age: number, occupation: string) {
  // Find the appropriate plan based on risk score
  let plan = INSURANCE_PLANS.find(
    p => riskScore >= p.riskRange.min && riskScore <= p.riskRange.max
  ) || INSURANCE_PLANS[1] // Default to Comprehensive

  // Calculate coverage based on risk and age
  let coverage = plan.minCoverage
  if (riskScore > 70) {
    coverage = plan.maxCoverage
  } else if (riskScore > 50) {
    coverage = Math.round((plan.minCoverage + plan.maxCoverage) / 2)
  } else {
    coverage = plan.minCoverage
  }

  // Adjust premium based on age
  let premium = plan.basePremium
  if (age > 50) {
    premium = Math.round(premium * 1.5)
  } else if (age > 35) {
    premium = Math.round(premium * 1.2)
  }

  // Adjust premium based on risk score
  const riskMultiplier = 1 + (riskScore / 100)
  premium = Math.round(premium * riskMultiplier)

  return {
    name: plan.name,
    type: plan.type,
    coverage: coverage,
    premium: premium,
    features: plan.features,
    advantages: plan.advantages,
    disadvantages: plan.disadvantages,
    recommended: true
  }
}

export function getAlternativePlans(riskScore: number, age: number) {
  // Get all plans except the recommended one
  const recommendedPlan = getInsurancePlan(riskScore, age, "")
  
  return INSURANCE_PLANS
    .filter(p => p.name !== recommendedPlan.name)
    .map(plan => {
      let coverage = plan.minCoverage
      let premium = plan.basePremium
      
      // Age adjustment
      if (age > 50) {
        premium = Math.round(premium * 1.5)
      } else if (age > 35) {
        premium = Math.round(premium * 1.2)
      }
      
      // Risk adjustment
      const riskMultiplier = 1 + (riskScore / 100)
      premium = Math.round(premium * riskMultiplier)
      
      return {
        name: plan.name,
        type: plan.type,
        coverage: coverage,
        premium: premium,
        features: plan.features,
        advantages: plan.advantages,
        disadvantages: plan.disadvantages,
        recommended: false
      }
    })
}

export function calculateMonthlySavings(riskScore: number, premium: number, age: number): number {
  // Base savings recommendation
  let baseAmount = 2000
  
  // Adjust based on risk score
  const riskMultiplier = riskScore / 50
  baseAmount = Math.round(baseAmount * riskMultiplier)
  
  // Ensure savings can cover at least 3 months of premium
  const minSavings = Math.round(premium * 0.3)
  
  // Age-based adjustment
  if (age > 45) {
    baseAmount = Math.round(baseAmount * 1.3)
  } else if (age > 35) {
    baseAmount = Math.round(baseAmount * 1.15)
  }
  
  return Math.max(baseAmount, minSavings)
}

export function calculateEmergencyFund(monthlySavings: number, riskScore: number): number {
  // Emergency fund should cover 6-12 months of expenses
  let months = 6
  
  if (riskScore > 70) {
    months = 12
  } else if (riskScore > 50) {
    months = 9
  }
  
  return monthlySavings * months
}

export interface AffordabilityAnalysis {
  isAffordable: boolean
  affordabilityScore: number // 0-100
  monthlyIncomePercentage: number
  recommendation: string
  financialStrain: "low" | "moderate" | "high" | "critical"
}

export function calculateAffordability(
  monthlyIncome: number,
  premium: number,
  monthlySavings: number
): AffordabilityAnalysis {
  const totalMonthlyCommitment = premium + monthlySavings
  const incomePercentage = (totalMonthlyCommitment / monthlyIncome) * 100
  
  // Calculate affordability score (100 = very affordable, 0 = not affordable)
  let affordabilityScore = 100
  let financialStrain: "low" | "moderate" | "high" | "critical" = "low"
  let recommendation = ""
  let isAffordable = true
  
  if (incomePercentage <= 10) {
    affordabilityScore = 100
    financialStrain = "low"
    recommendation = "Excellent affordability. You can comfortably manage this plan with room for additional savings."
    isAffordable = true
  } else if (incomePercentage <= 15) {
    affordabilityScore = 85
    financialStrain = "low"
    recommendation = "Good affordability. This plan fits well within your budget with minimal financial strain."
    isAffordable = true
  } else if (incomePercentage <= 20) {
    affordabilityScore = 70
    financialStrain = "moderate"
    recommendation = "Moderate affordability. This plan is manageable but will require careful budgeting."
    isAffordable = true
  } else if (incomePercentage <= 25) {
    affordabilityScore = 50
    financialStrain = "moderate"
    recommendation = "Stretching your budget. Consider a lower-tier plan or reduce savings amount temporarily."
    isAffordable = true
  } else if (incomePercentage <= 30) {
    affordabilityScore = 30
    financialStrain = "high"
    recommendation = "High financial strain. Strongly recommend considering a more affordable plan option."
    isAffordable = false
  } else {
    affordabilityScore = 10
    financialStrain = "critical"
    recommendation = "Not affordable. This plan exceeds recommended spending limits. Please choose a lower-tier plan."
    isAffordable = false
  }
  
  return {
    isAffordable,
    affordabilityScore,
    monthlyIncomePercentage: Math.round(incomePercentage * 10) / 10,
    recommendation,
    financialStrain
  }
}
