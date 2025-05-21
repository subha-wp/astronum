import { create } from "zustand";

interface HealthInfo {
  title: string;
  description: string;
  strengths: string[];
  challenges: string[];
  recommendations: string[];
  wellnessAreas: string[];
  elementalBalance: string;
}

interface HealthStore {
  getHealthInfo: (lifePathNumber: number) => HealthInfo;
}

const healthData: Record<number, HealthInfo> = {
  1: {
    title: "The Energetic Pioneer",
    description:
      "Your life path number 1 indicates high vitality and a natural inclination towards leadership in health matters. You thrive on physical challenges and need regular outlets for your dynamic energy.",
    strengths: [
      "High physical energy",
      "Quick recovery ability",
      "Strong immune system",
      "Natural athletic prowess",
      "Excellent stamina",
    ],
    challenges: [
      "Tendency to overexert",
      "Stress from perfectionism",
      "Headaches from tension",
      "Blood pressure concerns",
      "Difficulty relaxing",
    ],
    recommendations: [
      "High-intensity interval training",
      "Competitive sports",
      "Regular stress management",
      "Mindfulness practices",
      "Adequate rest periods",
    ],
    wellnessAreas: [
      "Head and brain health",
      "Cardiovascular system",
      "Muscular strength",
      "Bone density",
      "Immune function",
    ],
    elementalBalance: "Fire dominant - needs grounding practices",
  },
  2: {
    title: "The Balanced Harmonizer",
    description:
      "Life path number 2 suggests sensitivity and a need for balance in health matters. Your well-being is closely tied to emotional harmony and peaceful environments.",
    strengths: [
      "Natural healing ability",
      "Emotional awareness",
      "Good digestive health",
      "Flexibility",
      "Stress resilience",
    ],
    challenges: [
      "Emotional sensitivity",
      "Digestive sensitivity",
      "Sleep disturbances",
      "Anxiety tendencies",
      "Environmental sensitivity",
    ],
    recommendations: [
      "Gentle yoga",
      "Meditation",
      "Regular sleep schedule",
      "Nature walks",
      "Sound healing",
    ],
    wellnessAreas: [
      "Digestive system",
      "Nervous system",
      "Hormonal balance",
      "Lymphatic system",
      "Emotional health",
    ],
    elementalBalance: "Water dominant - needs warming practices",
  },
  3: {
    title: "The Expressive Vitalist",
    description:
      "Your life path number 3 indicates a strong connection between creativity and health. Your well-being flourishes through joyful expression and social connections.",
    strengths: [
      "High vitality",
      "Strong respiratory system",
      "Good circulation",
      "Natural flexibility",
      "Quick healing",
    ],
    challenges: [
      "Nervous energy",
      "Throat issues",
      "Scattered focus",
      "Irregular eating habits",
      "Sleep inconsistency",
    ],
    recommendations: [
      "Dance therapy",
      "Singing or voice work",
      "Creative movement",
      "Social sports",
      "Art therapy",
    ],
    wellnessAreas: [
      "Respiratory system",
      "Throat and voice",
      "Solar plexus",
      "Creative expression",
      "Social health",
    ],
    elementalBalance: "Air dominant - needs grounding practices",
  },
  4: {
    title: "The Structured Builder",
    description:
      "Life path number 4 suggests a need for routine and structure in health matters. Your well-being thrives on consistent habits and practical approaches.",
    strengths: [
      "Strong constitution",
      "Good endurance",
      "Stable energy",
      "Regular habits",
      "Physical resilience",
    ],
    challenges: [
      "Joint stiffness",
      "Skeletal concerns",
      "Resistance to change",
      "Stress from overwork",
      "Digestive slowness",
    ],
    recommendations: [
      "Regular exercise routine",
      "Strength training",
      "Stretching practices",
      "Meal planning",
      "Regular massages",
    ],
    wellnessAreas: [
      "Skeletal system",
      "Joints and ligaments",
      "Digestive system",
      "Muscular strength",
      "Physical structure",
    ],
    elementalBalance: "Earth dominant - needs movement practices",
  },
  5: {
    title: "The Dynamic Adventurer",
    description:
      "Your life path number 5 indicates a need for variety in health practices. Your well-being flourishes through movement and adaptable approaches.",
    strengths: [
      "Quick metabolism",
      "Adaptable body",
      "Good coordination",
      "Fast recovery",
      "High energy",
    ],
    challenges: [
      "Restlessness",
      "Nervous tension",
      "Digestive sensitivity",
      "Irregular habits",
      "Addiction tendencies",
    ],
    recommendations: [
      "Varied exercise routine",
      "Adventure sports",
      "Travel activities",
      "Mixed martial arts",
      "Dynamic stretching",
    ],
    wellnessAreas: [
      "Nervous system",
      "Respiratory system",
      "Sensory organs",
      "Coordination",
      "Metabolic health",
    ],
    elementalBalance: "Air dominant - needs stabilizing practices",
  },
  6: {
    title: "The Nurturing Healer",
    description:
      "Life path number 6 suggests a strong connection to nurturing and healing. Your well-being is tied to helping others and maintaining harmony.",
    strengths: [
      "Natural healing ability",
      "Good heart health",
      "Hormonal balance",
      "Nurturing energy",
      "Emotional resilience",
    ],
    challenges: [
      "Taking on others' stress",
      "Heart sensitivity",
      "Thyroid issues",
      "Perfectionism stress",
      "Boundary issues",
    ],
    recommendations: [
      "Heart-centered yoga",
      "Nature therapy",
      "Beauty rituals",
      "Gentle exercise",
      "Social wellness",
    ],
    wellnessAreas: [
      "Heart health",
      "Thyroid function",
      "Reproductive system",
      "Emotional balance",
      "Social wellness",
    ],
    elementalBalance: "Venus dominant - needs balancing practices",
  },
  7: {
    title: "The Mindful Seeker",
    description:
      "Your life path number 7 indicates a strong mind-body connection. Your well-being thrives through intellectual understanding and spiritual practices.",
    strengths: [
      "Strong mental focus",
      "Intuitive healing",
      "Good nervous system",
      "Spiritual awareness",
      "Natural detoxification",
    ],
    challenges: [
      "Overthinking stress",
      "Nervous sensitivity",
      "Sleep issues",
      "Digestive sensitivity",
      "Environmental sensitivity",
    ],
    recommendations: [
      "Meditation",
      "Tai Chi",
      "Research-based exercise",
      "Silent retreats",
      "Water therapy",
    ],
    wellnessAreas: [
      "Nervous system",
      "Brain health",
      "Pineal gland",
      "Immune system",
      "Mental clarity",
    ],
    elementalBalance: "Air/Water dominant - needs grounding",
  },
  8: {
    title: "The Powerful Achiever",
    description:
      "Life path number 8 suggests a connection between personal power and health. Your well-being flourishes through strength and achievement.",
    strengths: [
      "Strong constitution",
      "Physical power",
      "Good endurance",
      "Quick recovery",
      "Stress resilience",
    ],
    challenges: [
      "Stress from ambition",
      "Circulation issues",
      "Joint stress",
      "Digestive tension",
      "Sleep quality",
    ],
    recommendations: [
      "Power yoga",
      "Weight training",
      "Executive health programs",
      "Stress management",
      "Luxury spa treatments",
    ],
    wellnessAreas: [
      "Circulation",
      "Muscular system",
      "Adrenal health",
      "Stress response",
      "Physical power",
    ],
    elementalBalance: "Earth/Fire dominant - needs flow",
  },
  9: {
    title: "The Compassionate Healer",
    description:
      "Your life path number 9 indicates a universal approach to health. Your well-being is connected to serving others and maintaining spiritual harmony.",
    strengths: [
      "Natural healing ability",
      "Strong immune system",
      "Emotional wisdom",
      "Spiritual connection",
      "Regenerative power",
    ],
    challenges: [
      "Empathic overload",
      "Emotional processing",
      "Physical boundaries",
      "Energy depletion",
      "Sleep depth",
    ],
    recommendations: [
      "Energy healing",
      "Global wellness practices",
      "Service activities",
      "Spiritual exercise",
      "Universal healing arts",
    ],
    wellnessAreas: [
      "Immune system",
      "Lymphatic system",
      "Emotional processing",
      "Spiritual connection",
      "Energy field",
    ],
    elementalBalance: "All elements - needs integration",
  },
};

export const useHealthStore = create<HealthStore>(() => ({
  getHealthInfo: (lifePathNumber) =>
    healthData[lifePathNumber] || healthData[1],
}));
