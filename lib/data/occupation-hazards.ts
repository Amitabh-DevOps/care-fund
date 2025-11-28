// Occupation hazard data based on ILO and OSHA statistics

export interface OccupationHazard {
  occupation: string
  hazardLevel: "low" | "medium" | "high" | "critical"
  riskScore: number
  commonRisks: string[]
  deathRate: number // per 100,000 workers
  healthIssues: string[]
  preventiveMeasures: string[]
}

export const OCCUPATION_HAZARDS: Record<string, OccupationHazard> = {
  "IT Professional": {
    occupation: "IT Professional",
    hazardLevel: "low",
    riskScore: 15,
    commonRisks: [
      "Sedentary lifestyle",
      "Eye strain and vision problems",
      "Repetitive strain injury (RSI)",
      "Mental stress and burnout",
      "Poor posture leading to back pain"
    ],
    deathRate: 2.1,
    healthIssues: [
      "Cardiovascular disease risk",
      "Obesity",
      "Diabetes type 2",
      "Mental health issues",
      "Sleep disorders"
    ],
    preventiveMeasures: [
      "Regular breaks every hour",
      "Ergonomic workspace setup",
      "Regular exercise (30 min daily)",
      "Eye exercises and proper lighting",
      "Stress management techniques"
    ]
  },
  "Healthcare Worker": {
    occupation: "Healthcare Worker",
    hazardLevel: "high",
    riskScore: 65,
    commonRisks: [
      "Infectious disease exposure",
      "Needlestick injuries",
      "Chemical exposure",
      "Physical strain from lifting patients",
      "High stress and long hours"
    ],
    deathRate: 8.7,
    healthIssues: [
      "Infectious diseases (TB, Hepatitis, COVID-19)",
      "Musculoskeletal disorders",
      "Mental health issues",
      "Chronic fatigue",
      "Workplace violence injuries"
    ],
    preventiveMeasures: [
      "Strict PPE usage",
      "Regular health screenings",
      "Vaccination programs",
      "Proper lifting techniques",
      "Mental health support access"
    ]
  },
  "Factory Worker": {
    occupation: "Factory Worker",
    hazardLevel: "high",
    riskScore: 70,
    commonRisks: [
      "Machinery accidents",
      "Chemical exposure",
      "Noise-induced hearing loss",
      "Respiratory issues from dust/fumes",
      "Repetitive motion injuries"
    ],
    deathRate: 12.3,
    healthIssues: [
      "Respiratory diseases",
      "Hearing loss",
      "Musculoskeletal disorders",
      "Skin conditions",
      "Industrial accidents"
    ],
    preventiveMeasures: [
      "Safety equipment usage",
      "Regular safety training",
      "Proper ventilation",
      "Hearing protection",
      "Regular health check-ups"
    ]
  },
  "Driver": {
    occupation: "Driver",
    hazardLevel: "medium",
    riskScore: 55,
    commonRisks: [
      "Road accidents",
      "Air pollution exposure",
      "Sedentary lifestyle",
      "Irregular sleep patterns",
      "Back and neck problems"
    ],
    deathRate: 15.2,
    healthIssues: [
      "Cardiovascular disease",
      "Respiratory issues",
      "Obesity",
      "Sleep disorders",
      "Musculoskeletal problems"
    ],
    preventiveMeasures: [
      "Defensive driving training",
      "Regular vehicle maintenance",
      "Adequate rest breaks",
      "Proper seating posture",
      "Regular health screenings"
    ]
  },
  "Teacher": {
    occupation: "Teacher",
    hazardLevel: "low",
    riskScore: 25,
    commonRisks: [
      "Voice strain",
      "Mental stress",
      "Infectious disease exposure (from students)",
      "Standing for long periods",
      "Workplace stress"
    ],
    deathRate: 3.2,
    healthIssues: [
      "Vocal cord problems",
      "Mental health issues",
      "Varicose veins",
      "Stress-related conditions",
      "Common infections"
    ],
    preventiveMeasures: [
      "Voice training and rest",
      "Stress management",
      "Regular breaks",
      "Comfortable footwear",
      "Vaccination programs"
    ]
  },
  "Engineer": {
    occupation: "Engineer",
    hazardLevel: "medium",
    riskScore: 35,
    commonRisks: [
      "Site accidents (for field engineers)",
      "Sedentary work (for office engineers)",
      "Mental stress",
      "Eye strain",
      "Exposure to hazardous materials (varies by field)"
    ],
    deathRate: 5.4,
    healthIssues: [
      "Cardiovascular issues",
      "Musculoskeletal problems",
      "Mental stress",
      "Vision problems",
      "Field-specific hazards"
    ],
    preventiveMeasures: [
      "Safety protocols on site",
      "Regular exercise",
      "Ergonomic workspace",
      "Stress management",
      "Field-specific safety training"
    ]
  },
  "Business Owner": {
    occupation: "Business Owner",
    hazardLevel: "medium",
    riskScore: 40,
    commonRisks: [
      "High mental stress",
      "Irregular work hours",
      "Sedentary lifestyle",
      "Poor work-life balance",
      "Financial stress"
    ],
    deathRate: 4.8,
    healthIssues: [
      "Cardiovascular disease",
      "Mental health issues",
      "Sleep disorders",
      "Hypertension",
      "Stress-related conditions"
    ],
    preventiveMeasures: [
      "Stress management techniques",
      "Regular exercise routine",
      "Proper sleep schedule",
      "Delegation of tasks",
      "Regular health check-ups"
    ]
  },
  "Student": {
    occupation: "Student",
    hazardLevel: "low",
    riskScore: 10,
    commonRisks: [
      "Academic stress",
      "Sedentary lifestyle",
      "Poor sleep habits",
      "Eye strain from screens",
      "Poor nutrition"
    ],
    deathRate: 1.5,
    healthIssues: [
      "Mental health issues",
      "Obesity",
      "Vision problems",
      "Sleep disorders",
      "Stress-related conditions"
    ],
    preventiveMeasures: [
      "Regular physical activity",
      "Balanced diet",
      "Adequate sleep (7-8 hours)",
      "Screen time management",
      "Stress management"
    ]
  },
  "Construction Worker": {
    occupation: "Construction Worker",
    hazardLevel: "critical",
    riskScore: 85,
    commonRisks: [
      "Falls from height",
      "Heavy machinery accidents",
      "Electrocution",
      "Falling objects",
      "Extreme weather exposure"
    ],
    deathRate: 18.5,
    healthIssues: [
      "Traumatic injuries",
      "Musculoskeletal disorders",
      "Respiratory issues",
      "Hearing loss",
      "Skin conditions"
    ],
    preventiveMeasures: [
      "Safety harness usage",
      "Hard hat and protective gear",
      "Regular safety training",
      "Proper equipment maintenance",
      "Weather-appropriate clothing"
    ]
  },
  "Farmer": {
    occupation: "Farmer",
    hazardLevel: "high",
    riskScore: 60,
    commonRisks: [
      "Pesticide exposure",
      "Machinery accidents",
      "Extreme weather exposure",
      "Physical strain",
      "Animal-related injuries"
    ],
    deathRate: 11.2,
    healthIssues: [
      "Respiratory diseases",
      "Skin conditions",
      "Musculoskeletal disorders",
      "Heat-related illnesses",
      "Pesticide poisoning"
    ],
    preventiveMeasures: [
      "Protective equipment for pesticides",
      "Machinery safety training",
      "Adequate hydration",
      "Sun protection",
      "Regular health screenings"
    ]
  },
  "Other": {
    occupation: "Other",
    hazardLevel: "medium",
    riskScore: 30,
    commonRisks: [
      "General workplace hazards",
      "Stress",
      "Sedentary or physical work risks",
      "Variable exposure to hazards"
    ],
    deathRate: 5.0,
    healthIssues: [
      "General health risks",
      "Stress-related conditions",
      "Occupation-specific issues"
    ],
    preventiveMeasures: [
      "Follow workplace safety guidelines",
      "Regular health check-ups",
      "Maintain work-life balance",
      "Stay physically active"
    ]
  }
}

export function getOccupationHazard(occupation: string): OccupationHazard {
  return OCCUPATION_HAZARDS[occupation] || OCCUPATION_HAZARDS["Other"]
}
