import { create } from "zustand";

interface CompatibilityResult {
  percentage: number;
  description: string;
  strengths: string[];
  challenges: string[];
  remedies: string[];
}

interface CompatibilityStore {
  getCompatibility: (number1: number, number2: number) => CompatibilityResult;
}

// Helper function to calculate base compatibility percentage
const calculateBaseCompatibility = (
  number1: number,
  number2: number
): number => {
  // Same numbers have high compatibility but not perfect (to avoid stagnation)
  if (number1 === number2) return 85;

  // Calculate difference and adjust percentage
  const diff = Math.abs(number1 - number2);

  // Numbers that sum to 10 (e.g., 1&9, 2&8, etc.) have special harmony
  if (number1 + number2 === 10) return 90;

  // Numbers within 2 steps have good compatibility
  if (diff <= 2) return 80;

  // Numbers within 4 steps have moderate compatibility
  if (diff <= 4) return 70;

  // Other combinations have base compatibility
  return 60;
};

// Helper function to get number characteristics
const getNumberCharacteristics = (num: number) => {
  const traits = {
    1: { nature: "leader", energy: "independent", focus: "achievement" },
    2: { nature: "mediator", energy: "cooperative", focus: "harmony" },
    3: { nature: "creator", energy: "expressive", focus: "joy" },
    4: { nature: "builder", energy: "practical", focus: "stability" },
    5: { nature: "freedom", energy: "adventurous", focus: "change" },
    6: { nature: "nurturer", energy: "responsible", focus: "balance" },
    7: { nature: "seeker", energy: "analytical", focus: "wisdom" },
    8: { nature: "achiever", energy: "powerful", focus: "success" },
    9: { nature: "humanitarian", energy: "compassionate", focus: "completion" },
  };
  return traits[num as keyof typeof traits];
};

export const useCompatibilityStore = create<CompatibilityStore>(() => ({
  getCompatibility: (number1, number2) => {
    const basePercentage = calculateBaseCompatibility(number1, number2);
    const traits1 = getNumberCharacteristics(number1);
    const traits2 = getNumberCharacteristics(number2);

    // Generate dynamic description based on numbers' characteristics
    const description = `This combination brings together ${traits1.nature}'s ${
      traits1.energy
    } energy with ${traits2.nature}'s ${traits2.focus}-oriented nature. ${
      basePercentage >= 80
        ? "This creates a harmonious and complementary partnership."
        : "While there are differences, these can lead to growth and balance."
    }`;

    // Generate dynamic strengths based on numbers' traits
    const strengths = [
      `Combined focus on ${traits1.focus} and ${traits2.focus}`,
      `Balance of ${traits1.energy} and ${traits2.energy} energies`,
      `Mutual support in personal growth`,
      number1 === number2
        ? "Deep understanding of each other's perspectives"
        : "Complementary approaches to challenges",
    ];

    // Generate dynamic challenges
    const challenges = [
      number1 === number2
        ? "May get stuck in similar patterns"
        : "Different approaches may cause friction",
      `Balancing ${traits1.energy} with ${traits2.energy} tendencies`,
      `Reconciling ${traits1.focus} with ${traits2.focus} priorities`,
      "Communication style differences",
    ];

    // Generate dynamic remedies
    const remedies = [
      "Practice active listening and open communication",
      `Appreciate ${traits1.nature}'s perspective while valuing ${traits2.nature}'s approach`,
      "Create shared goals that honor both paths",
      "Regular check-ins to maintain balance and understanding",
    ];

    return {
      percentage: basePercentage,
      description,
      strengths,
      challenges,
      remedies,
    };
  },
}));
