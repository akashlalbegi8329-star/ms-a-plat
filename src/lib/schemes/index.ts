export interface GovernmentScheme {
  id: string;
  name: string;
  code: string;
  ministry: string;
  description: string;
  maxAmount: number;
  eligibility: {
    minEmployees?: number;
    maxEmployees?: number;
    industries?: string[];
    turnoverMax?: number;
    locationPriority?: string[];
  };
  benefits: string[];
  documents: string[];
  applicationUrl?: string;
}

export const SCHEMES: GovernmentScheme[] = [
  {
    id: "pmegp",
    name: "Prime Minister's Employment Generation Programme",
    code: "PMEGP",
    ministry: "Ministry of Micro, Small and Medium Enterprises",
    description: "Subsidy for new micro and small enterprises",
    maxAmount: 5000000,
    eligibility: {
      minEmployees: 1,
      maxEmployees: 50,
      turnoverMax: 50000000,
      industries: ["Manufacturing", "Services"]
    },
    benefits: [
      "Subsidy up to 35% in general areas, 45% in special areas",
      "Bank finance up to 35 lakhs for manufacturing",
      "Bank finance up to 10 lakhs for service sector"
    ],
    documents: [
      "Project report",
      "ID proof",
      "Address proof",
      "Bank account details"
    ],
    applicationUrl: "https://www.kviconline.gov.in"
  },
  {
    id: "mudra",
    name: "Pradhan Mantri Mudra Yojana",
    code: "PMMY",
    ministry: "Ministry of Finance",
    description: "Collateral-free loans for micro-enterprises",
    maxAmount: 1000000,
    eligibility: {
      minEmployees: 1,
      industries: ["Manufacturing", "Services", "Trading"]
    },
    benefits: [
      "Loan up to ₹10 lakh",
      "No collateral required",
      "Low interest rates"
    ],
    documents: [
      "KYC documents",
      "Business plan",
      "Bank statements"
    ],
    applicationUrl: "https://www.mudra.org.in"
  },
  {
    id: "cgtsi",
    name: "Credit Guarantee Fund Trust for Micro and Small Enterprises",
    code: "CGTMSE",
    ministry: "Ministry of MSME",
    description: "Credit guarantee for collateral-free loans",
    maxAmount: 2000000,
    eligibility: {
      minEmployees: 1,
      maxEmployees: 100,
      industries: ["Manufacturing", "Services"]
    },
    benefits: [
      "Collateral-free credit up to ₹2 crore",
      "Guarantee cover up to 85%",
      "No processing fees"
    ],
    documents: [
      "Udyam registration",
      "Financial statements",
      "Project report"
    ]
  },
  {
    id: "asm",
    name: "Credit Linked Capital Subsidy Scheme",
    code: "CLCSS",
    ministry: "Ministry of MSME",
    description: "Subsidy for technology upgradation",
    maxAmount: 15000000,
    eligibility: {
      minEmployees: 1,
      industries: ["Manufacturing"]
    },
    benefits: [
      "25% subsidy on technology upgrade",
      "Maximum subsidy ₹15 lakh",
      "Interest-free loan support"
    ],
    documents: [
      "Technology upgradation plan",
      "Quotes from vendors",
      "Udyam registration"
    ]
  },
  {
    id: "zedi",
    name: "Zero Defect Zero Effect",
    code: "ZED",
    ministry: "Ministry of MSME",
    description: "Recognition and certification for quality and environmental compliance",
    maxAmount: 500000,
    eligibility: {
      minEmployees: 1,
      industries: ["Manufacturing"]
    },
    benefits: [
      "ZED certification",
      "Marketing assistance",
      "Technology support"
    ],
    documents: [
      "Quality management system",
      "Environmental compliance records",
      "Factory audit report"
    ]
  }
];

export function checkEligibility(
  business: {
    employees: number;
    industry: string;
    turnover: number;
    location?: string;
  },
  scheme: GovernmentScheme
): { eligible: boolean; score: number; reasons: string[] } {
  const reasons: string[] = [];
  let score = 100;

  if (scheme.eligibility.minEmployees && business.employees < scheme.eligibility.minEmployees) {
    reasons.push(`Minimum employees required: ${scheme.eligibility.minEmployees}`);
    score -= 30;
  }

  if (scheme.eligibility.maxEmployees && business.employees > scheme.eligibility.maxEmployees) {
    reasons.push(`Maximum employees exceeded: ${scheme.eligibility.maxEmployees}`);
    score -= 30;
  }

  if (scheme.eligibility.industries && !scheme.eligibility.industries.includes(business.industry)) {
    reasons.push(`Industry not covered: ${scheme.eligibility.industries.join(", ")}`);
    score -= 25;
  }

  if (scheme.eligibility.turnoverMax && business.turnover > scheme.eligibility.turnoverMax) {
    reasons.push(`Turnover exceeds limit: ₹${scheme.eligibility.turnoverMax}`);
    score -= 20;
  }

  return {
    eligible: score >= 50,
    score: Math.max(0, score),
    reasons
  };
}
