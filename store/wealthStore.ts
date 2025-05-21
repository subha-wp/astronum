import { create } from "zustand";

interface WealthInfo {
  title: string;
  description: string;
  strengths: string[];
  challenges: string[];
  opportunities: string[];
  bestInvestments: string[];
  careerPaths: string[];
  luckyDays: string[];
}

interface WealthStore {
  getWealthInfo: (lifePathNumber: number) => WealthInfo;
}

const wealthData: Record<number, WealthInfo> = {
  1: {
    title: "The Wealth Pioneer",
    description:
      "Your life path number 1 indicates strong potential for innovative wealth creation. You excel in pioneering new business ventures and creating unique income streams.",
    strengths: [
      "Natural leadership in business",
      "Innovative thinking",
      "Strong entrepreneurial spirit",
      "Quick decision-making",
      "Independent wealth creation",
    ],
    challenges: [
      "Overconfidence in investments",
      "Difficulty delegating",
      "Impatience with growth",
      "Risk management",
      "Collaborative ventures",
    ],
    opportunities: [
      "Tech startups",
      "Innovation consulting",
      "Personal branding",
      "Digital platforms",
      "Emerging markets",
    ],
    bestInvestments: [
      "Technology stocks",
      "Startup ventures",
      "Innovation funds",
      "Digital assets",
      "Intellectual property",
    ],
    careerPaths: [
      "Entrepreneur",
      "CEO",
      "Innovation Director",
      "Tech Founder",
      "Venture Capitalist",
    ],
    luckyDays: [
      "1st of each month",
      "9th of each month",
      "Sundays",
      "New moon days",
    ],
  },
  2: {
    title: "The Wealth Harmonizer",
    description:
      "Life path number 2 suggests success through partnerships and diplomatic financial dealings. Your wealth grows through collaboration and balanced approaches.",
    strengths: [
      "Partnership abilities",
      "Negotiation skills",
      "Detail orientation",
      "Risk assessment",
      "Client relations",
    ],
    challenges: [
      "Decision paralysis",
      "Undervaluing services",
      "Partnership conflicts",
      "Financial assertiveness",
      "Market timing",
    ],
    opportunities: [
      "Partnership ventures",
      "Mediation services",
      "Relationship coaching",
      "Diplomatic consulting",
      "Collaborative projects",
    ],
    bestInvestments: [
      "Partnership businesses",
      "Real estate partnerships",
      "Cooperative ventures",
      "Balanced portfolios",
      "Social impact funds",
    ],
    careerPaths: [
      "Business Mediator",
      "Partnership Consultant",
      "Relationship Manager",
      "Diplomatic Advisor",
      "Cooperation Specialist",
    ],
    luckyDays: [
      "2nd of each month",
      "20th of each month",
      "Mondays",
      "Full moon days",
    ],
  },
  3: {
    title: "The Creative Wealth Builder",
    description:
      "Your life path number 3 indicates wealth potential through creative expression and communication. Financial success comes through artistic ventures and social connections.",
    strengths: [
      "Creative monetization",
      "Communication skills",
      "Social networking",
      "Marketing intuition",
      "Artistic value creation",
    ],
    challenges: [
      "Financial discipline",
      "Project completion",
      "Budget management",
      "Investment focus",
      "Business structure",
    ],
    opportunities: [
      "Creative industries",
      "Social media",
      "Entertainment",
      "Communication platforms",
      "Artistic ventures",
    ],
    bestInvestments: [
      "Entertainment industry",
      "Digital media",
      "Art markets",
      "Creative startups",
      "Communication technology",
    ],
    careerPaths: [
      "Creative Director",
      "Marketing Executive",
      "Entertainment Producer",
      "Social Media Influencer",
      "Artistic Entrepreneur",
    ],
    luckyDays: [
      "3rd of each month",
      "12th of each month",
      "Wednesdays",
      "Waxing moon",
    ],
  },
  4: {
    title: "The Structured Wealth Builder",
    description:
      "Life path number 4 suggests wealth accumulation through systematic and practical approaches. Your financial success comes from solid planning and consistent effort.",
    strengths: [
      "Financial discipline",
      "Organizational skills",
      "Long-term planning",
      "Risk management",
      "Asset protection",
    ],
    challenges: [
      "Adapting to change",
      "Missing opportunities",
      "Conservative bias",
      "Growth limitations",
      "Innovation resistance",
    ],
    opportunities: [
      "Real estate",
      "Infrastructure projects",
      "Systems development",
      "Traditional industries",
      "Asset management",
    ],
    bestInvestments: [
      "Property development",
      "Blue-chip stocks",
      "Government bonds",
      "Infrastructure funds",
      "Established industries",
    ],
    careerPaths: [
      "Property Developer",
      "Financial Planner",
      "Systems Analyst",
      "Project Manager",
      "Asset Manager",
    ],
    luckyDays: [
      "4th of each month",
      "13th of each month",
      "Saturdays",
      "Last quarter moon",
    ],
  },
  5: {
    title: "The Dynamic Wealth Creator",
    description:
      "Your life path number 5 indicates wealth potential through adaptability and change. Financial success comes through versatile approaches and multiple income streams.",
    strengths: [
      "Adaptability",
      "Opportunity recognition",
      "Risk tolerance",
      "Marketing skills",
      "Networking ability",
    ],
    challenges: [
      "Financial consistency",
      "Long-term commitment",
      "Resource management",
      "Investment focus",
      "Stability maintenance",
    ],
    opportunities: [
      "Travel industry",
      "Change management",
      "Adventure tourism",
      "Digital nomad ventures",
      "Flexible businesses",
    ],
    bestInvestments: [
      "Travel companies",
      "Technology trends",
      "Cryptocurrency",
      "Flexible ventures",
      "Adventure sports",
    ],
    careerPaths: [
      "Business Consultant",
      "Travel Entrepreneur",
      "Change Manager",
      "Digital Nomad",
      "Adventure Guide",
    ],
    luckyDays: [
      "5th of each month",
      "14th of each month",
      "Wednesdays",
      "Waxing gibbous",
    ],
  },
  6: {
    title: "The Nurturing Wealth Builder",
    description:
      "Life path number 6 suggests wealth creation through service and responsibility. Your financial success comes from helping others and creating beauty.",
    strengths: [
      "Service orientation",
      "Customer care",
      "Quality delivery",
      "Relationship building",
      "Aesthetic sense",
    ],
    challenges: [
      "Setting boundaries",
      "Pricing services",
      "Work-life balance",
      "Perfectionism costs",
      "Resource allocation",
    ],
    opportunities: [
      "Healthcare services",
      "Beauty industry",
      "Home services",
      "Family businesses",
      "Counseling services",
    ],
    bestInvestments: [
      "Healthcare stocks",
      "Beauty companies",
      "Home improvement",
      "Family businesses",
      "Service industries",
    ],
    careerPaths: [
      "Healthcare Provider",
      "Beauty Entrepreneur",
      "Family Business Owner",
      "Service Provider",
      "Wellness Consultant",
    ],
    luckyDays: [
      "6th of each month",
      "15th of each month",
      "Fridays",
      "First quarter moon",
    ],
  },
  7: {
    title: "The Analytical Wealth Master",
    description:
      "Your life path number 7 indicates wealth potential through specialized knowledge and analysis. Financial success comes through expertise and intellectual property.",
    strengths: [
      "Research ability",
      "Technical expertise",
      "Analysis skills",
      "Strategic thinking",
      "Specialized knowledge",
    ],
    challenges: [
      "Marketing resistance",
      "Practical application",
      "Client relations",
      "Business networking",
      "Market timing",
    ],
    opportunities: [
      "Research services",
      "Technical consulting",
      "Specialized education",
      "Analysis platforms",
      "Intellectual property",
    ],
    bestInvestments: [
      "Technology research",
      "Educational platforms",
      "Intellectual property",
      "Specialized markets",
      "Research development",
    ],
    careerPaths: [
      "Research Analyst",
      "Technical Expert",
      "Education Provider",
      "Specialized Consultant",
      "Technology Advisor",
    ],
    luckyDays: [
      "7th of each month",
      "16th of each month",
      "Mondays",
      "Last quarter moon",
    ],
  },
  8: {
    title: "The Power Wealth Manifester",
    description:
      "Life path number 8 suggests strong potential for material success and power. Your financial success comes through executive leadership and large-scale ventures.",
    strengths: [
      "Business acumen",
      "Executive leadership",
      "Wealth consciousness",
      "Power management",
      "Strategic vision",
    ],
    challenges: [
      "Work-life balance",
      "Power dynamics",
      "Ethical decisions",
      "Relationship management",
      "Stress handling",
    ],
    opportunities: [
      "Corporate leadership",
      "Investment banking",
      "Large-scale ventures",
      "Executive consulting",
      "Wealth management",
    ],
    bestInvestments: [
      "Corporate acquisitions",
      "Real estate empire",
      "Investment portfolios",
      "Business expansion",
      "Power industries",
    ],
    careerPaths: [
      "CEO",
      "Investment Banker",
      "Business Magnate",
      "Executive Consultant",
      "Wealth Manager",
    ],
    luckyDays: [
      "8th of each month",
      "17th of each month",
      "Thursdays",
      "Full moon",
    ],
  },
  9: {
    title: "The Humanitarian Wealth Creator",
    description:
      "Your life path number 9 indicates wealth potential through global and humanitarian ventures. Financial success comes through serving humanity and creating universal value.",
    strengths: [
      "Global perspective",
      "Humanitarian focus",
      "Universal appeal",
      "Charitable influence",
      "Wisdom application",
    ],
    challenges: [
      "Material attachment",
      "Business boundaries",
      "Profit focus",
      "Resource allocation",
      "Personal worth",
    ],
    opportunities: [
      "Global organizations",
      "Humanitarian projects",
      "Educational platforms",
      "Spiritual ventures",
      "Universal services",
    ],
    bestInvestments: [
      "Global initiatives",
      "Social impact funds",
      "Educational systems",
      "Humanitarian projects",
      "Universal platforms",
    ],
    careerPaths: [
      "Global Leader",
      "Humanitarian Entrepreneur",
      "Education Founder",
      "Social Impact Director",
      "Universal Service Provider",
    ],
    luckyDays: [
      "9th of each month",
      "18th of each month",
      "Tuesdays",
      "New moon",
    ],
  },
};

export const useWealthStore = create<WealthStore>(() => ({
  getWealthInfo: (lifePathNumber) =>
    wealthData[lifePathNumber] || wealthData[1],
}));
