// Insurance plan templates based on risk levels

export interface InsurancePlanTemplate {
  name: string
  type: string
  minCoverage: number
  maxCoverage: number
  basePremium: number
  features: string[]
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
