import { create } from "zustand";

interface NumerologyData {
  lifePath: {
    [key: number]: {
      title: string;
      description: string;
      strengths: string[];
      challenges: string[];
      career: string[];
      love: string[];
      health: string[];
    };
  };
  destiny: {
    [key: number]: {
      title: string;
      description: string;
      strengths: string[];
      challenges: string[];
      purpose: string;
    };
  };
  lucky: {
    [key: number]: {
      description: string;
      activities: string[];
      colors: string[];
      gemstones: string[];
    };
  };
}

const numerologyData: NumerologyData = {
  lifePath: {
    1: {
      title: "The Leader",
      description:
        "Life Path Number 1 represents leadership, independence, and innovation. You are a natural-born leader with strong ambition and determination. Your creative and pioneering spirit drives you to initiate new ventures and inspire others.",
      strengths: [
        "Natural leadership abilities",
        "Strong independence",
        "Creative thinking",
        "Determination",
        "Innovation",
      ],
      challenges: [
        "Can be overly dominant",
        "Difficulty accepting help",
        "Impatience with others",
        "Tendency to be self-critical",
      ],
      career: [
        "Entrepreneur",
        "Executive",
        "Project Manager",
        "Creative Director",
        "Business Owner",
      ],
      love: [
        "Values independence in relationships",
        "Needs a strong partner",
        "Direct in communication",
        "Loyal and protective",
      ],
      health: [
        "Thrives with physical challenges",
        "Benefits from competitive sports",
        "Needs outlets for high energy",
        "Should practice stress management",
      ],
    },
    2: {
      title: "The Mediator",
      description:
        "Life Path Number 2 embodies harmony, cooperation, and sensitivity. You excel in partnerships and have a natural ability to bring peace to any situation. Your diplomatic nature makes you an excellent mediator and friend.",
      strengths: [
        "Diplomatic abilities",
        "Emotional intelligence",
        "Cooperation skills",
        "Attention to detail",
        "Patience",
      ],
      challenges: [
        "Can be oversensitive",
        "Tendency to avoid conflict",
        "Sometimes indecisive",
        "May neglect own needs",
      ],
      career: [
        "Counselor",
        "Diplomat",
        "HR Professional",
        "Teacher",
        "Mediator",
      ],
      love: [
        "Deeply romantic",
        "Highly empathetic",
        "Values emotional connection",
        "Nurturing partner",
      ],
      health: [
        "Benefits from gentle exercise",
        "Needs emotional balance",
        "Responds well to music therapy",
        "Should practice self-care",
      ],
    },
    3: {
      title: "The Communicator",
      description:
        "Life Path Number 3 represents creativity, expression, and joy. You have a natural gift for communication and artistic expression. Your optimistic nature brings light and inspiration to others.",
      strengths: [
        "Creative expression",
        "Communication skills",
        "Social charm",
        "Artistic talent",
        "Optimism",
      ],
      challenges: [
        "Can be scattered",
        "Difficulty with focus",
        "Emotional sensitivity",
        "May avoid serious matters",
      ],
      career: [
        "Artist",
        "Writer",
        "Performer",
        "Marketing Professional",
        "Public Speaker",
      ],
      love: [
        "Charming and expressive",
        "Enjoys romance",
        "Values intellectual connection",
        "Brings joy to relationships",
      ],
      health: [
        "Thrives with creative movement",
        "Benefits from social activities",
        "Needs emotional outlets",
        "Should maintain routine",
      ],
    },
    4: {
      title: "The Builder",
      description:
        "Life Path Number 4 symbolizes stability, organization, and hard work. You are the foundation builder with a practical approach to life. Your methodical nature ensures lasting success through dedication and persistence.",
      strengths: [
        "Strong work ethic",
        "Organizational skills",
        "Reliability",
        "Practical thinking",
        "Attention to detail",
      ],
      challenges: [
        "Can be too rigid",
        "Resistance to change",
        "Workaholic tendencies",
        "May lack flexibility",
      ],
      career: [
        "Engineer",
        "Architect",
        "Financial Advisor",
        "Project Manager",
        "Systems Analyst",
      ],
      love: [
        "Values stability",
        "Loyal and dedicated",
        "Traditional approach",
        "Builds lasting relationships",
      ],
      health: [
        "Benefits from routine exercise",
        "Needs structure",
        "Should practice flexibility",
        "Focus on stress relief",
      ],
    },
    5: {
      title: "The Freedom Seeker",
      description:
        "Life Path Number 5 represents freedom, adventure, and change. You are naturally adaptable and versatile, with a strong desire for new experiences. Your progressive thinking brings innovation and excitement to life.",
      strengths: [
        "Adaptability",
        "Versatility",
        "Progressive thinking",
        "Communication skills",
        "Adventure spirit",
      ],
      challenges: [
        "Can be restless",
        "Difficulty with commitment",
        "May scatter energy",
        "Tendency to take risks",
      ],
      career: [
        "Travel Writer",
        "Sales Representative",
        "Journalist",
        "Marketing Manager",
        "Adventure Guide",
      ],
      love: [
        "Values freedom",
        "Exciting partner",
        "Needs variety",
        "Spontaneous romance",
      ],
      health: [
        "Enjoys varied activities",
        "Benefits from adventure sports",
        "Needs physical freedom",
        "Should maintain balance",
      ],
    },
    6: {
      title: "The Nurturer",
      description:
        "Life Path Number 6 embodies responsibility, care, and harmony. You have a natural ability to nurture and support others. Your sense of justice and beauty creates harmony in all areas of life.",
      strengths: [
        "Nurturing ability",
        "Responsibility",
        "Artistic sense",
        "Problem-solving",
        "Compassion",
      ],
      challenges: [
        "Can be perfectionist",
        "Tendency to worry",
        "May sacrifice too much",
        "Difficulty saying no",
      ],
      career: [
        "Teacher",
        "Healthcare Provider",
        "Counselor",
        "Interior Designer",
        "Social Worker",
      ],
      love: [
        "Deeply caring",
        "Family-oriented",
        "Romantic nature",
        "Creates harmony",
      ],
      health: [
        "Benefits from balanced activities",
        "Needs beauty in environment",
        "Should practice self-care",
        "Focus on stress management",
      ],
    },
    7: {
      title: "The Seeker",
      description:
        "Life Path Number 7 represents wisdom, analysis, and spirituality. You have a deep need for knowledge and understanding. Your analytical mind combined with spiritual awareness brings unique insights.",
      strengths: [
        "Analytical thinking",
        "Spiritual awareness",
        "Research abilities",
        "Technical skills",
        "Independence",
      ],
      challenges: [
        "Can be distant",
        "Difficulty trusting",
        "May isolate self",
        "Perfectionist tendencies",
      ],
      career: [
        "Researcher",
        "Scientist",
        "Analyst",
        "Technical Writer",
        "Spiritual Teacher",
      ],
      love: [
        "Values mental connection",
        "Needs space",
        "Deep emotional bonds",
        "Thoughtful partner",
      ],
      health: [
        "Benefits from meditation",
        "Needs solitude",
        "Should balance mind-body",
        "Focus on inner peace",
      ],
    },
    8: {
      title: "The Achiever",
      description:
        "Life Path Number 8 symbolizes power, abundance, and material success. You have natural business acumen and leadership abilities. Your drive for success creates opportunities for wealth and influence.",
      strengths: [
        "Business sense",
        "Leadership ability",
        "Material success",
        "Organization skills",
        "Authority",
      ],
      challenges: [
        "Can be workaholic",
        "Power struggles",
        "May be materialistic",
        "Control issues",
      ],
      career: [
        "CEO",
        "Financial Advisor",
        "Business Owner",
        "Investment Banker",
        "Executive Manager",
      ],
      love: [
        "Values success",
        "Protective nature",
        "Provides security",
        "Strong presence",
      ],
      health: [
        "Benefits from power activities",
        "Needs physical outlets",
        "Should manage stress",
        "Focus on balance",
      ],
    },
    9: {
      title: "The Humanitarian",
      description:
        "Life Path Number 9 represents compassion, wisdom, and universal love. You have a natural ability to see the bigger picture and help others. Your humanitarian nature brings healing and inspiration to the world.",
      strengths: [
        "Compassion",
        "Universal understanding",
        "Artistic ability",
        "Leadership",
        "Wisdom",
      ],
      challenges: [
        "Can be aloof",
        "Difficulty letting go",
        "May sacrifice too much",
        "Emotional sensitivity",
      ],
      career: [
        "Humanitarian",
        "Artist",
        "Teacher",
        "Healer",
        "Non-profit Leader",
      ],
      love: [
        "Universal love",
        "Romantic idealist",
        "Deeply caring",
        "Spiritual connection",
      ],
      health: [
        "Benefits from service",
        "Needs emotional release",
        "Should practice detachment",
        "Focus on wholeness",
      ],
    },
  },
  destiny: {
    1: {
      title: "The Pioneer",
      description:
        "Your Destiny Number 1 indicates a path of leadership and innovation. You are meant to break new ground and inspire others through your originality and independence.",
      strengths: [
        "Leadership",
        "Innovation",
        "Independence",
        "Courage",
        "Originality",
      ],
      challenges: [
        "Ego management",
        "Balancing independence",
        "Accepting help",
        "Patience",
      ],
      purpose:
        "To lead and innovate, inspiring others through original ideas and courageous action.",
    },
    2: {
      title: "The Peacemaker",
      description:
        "Your Destiny Number 2 reveals a path of diplomacy and cooperation. You are meant to bring harmony and balance to situations and relationships.",
      strengths: [
        "Diplomacy",
        "Cooperation",
        "Intuition",
        "Sensitivity",
        "Balance",
      ],
      challenges: [
        "Self-assertion",
        "Decision making",
        "Emotional balance",
        "Standing ground",
      ],
      purpose:
        "To create harmony and facilitate cooperation between people and groups.",
    },
    3: {
      title: "The Creator",
      description:
        "Your Destiny Number 3 indicates a path of creative expression and joy. You are meant to inspire and uplift others through your artistic and communicative abilities.",
      strengths: [
        "Creativity",
        "Expression",
        "Joy",
        "Inspiration",
        "Communication",
      ],
      challenges: ["Focus", "Follow-through", "Emotional depth", "Discipline"],
      purpose:
        "To create and express, bringing joy and inspiration to others through artistic endeavors.",
    },
    4: {
      title: "The Foundation Builder",
      description:
        "Your Destiny Number 4 reveals a path of building and organizing. You are meant to create stable foundations and systems that benefit others.",
      strengths: [
        "Organization",
        "Reliability",
        "Practicality",
        "Dedication",
        "Structure",
      ],
      challenges: ["Flexibility", "Adaptation", "Spontaneity", "Change"],
      purpose:
        "To build lasting foundations and create practical systems that serve others.",
    },
    5: {
      title: "The Messenger",
      description:
        "Your Destiny Number 5 indicates a path of freedom and change. You are meant to bring progressive ideas and adaptability to others.",
      strengths: [
        "Adaptability",
        "Freedom",
        "Communication",
        "Adventure",
        "Progress",
      ],
      challenges: ["Focus", "Stability", "Commitment", "Excess"],
      purpose:
        "To bring change and progress through freedom of thought and action.",
    },
    6: {
      title: "The Guardian",
      description:
        "Your Destiny Number 6 reveals a path of service and responsibility. You are meant to nurture and protect others, creating harmony in their lives.",
      strengths: [
        "Nurturing",
        "Responsibility",
        "Harmony",
        "Service",
        "Balance",
      ],
      challenges: ["Perfectionism", "Boundaries", "Self-care", "Control"],
      purpose:
        "To serve and protect others, creating harmony and beauty in the world.",
    },
    7: {
      title: "The Mystic",
      description:
        "Your Destiny Number 7 indicates a path of wisdom and spirituality. You are meant to seek and share deep knowledge and understanding.",
      strengths: [
        "Wisdom",
        "Analysis",
        "Research",
        "Spirituality",
        "Understanding",
      ],
      challenges: ["Trust", "Practicality", "Connection", "Expression"],
      purpose:
        "To seek and share wisdom, bridging the material and spiritual worlds.",
    },
    8: {
      title: "The Executive",
      description:
        "Your Destiny Number 8 reveals a path of power and abundance. You are meant to achieve material success while maintaining balance and integrity.",
      strengths: [
        "Leadership",
        "Management",
        "Achievement",
        "Authority",
        "Success",
      ],
      challenges: ["Balance", "Power use", "Material attachment", "Judgment"],
      purpose:
        "To achieve material success while maintaining spiritual balance and integrity.",
    },
    9: {
      title: "The Teacher",
      description:
        "Your Destiny Number 9 indicates a path of universal service and wisdom. You are meant to share your understanding and compassion with the world.",
      strengths: [
        "Compassion",
        "Wisdom",
        "Service",
        "Understanding",
        "Completion",
      ],
      challenges: ["Attachment", "Boundaries", "Completion", "Personal needs"],
      purpose:
        "To serve humanity through wisdom, compassion, and universal understanding.",
    },
  },
  lucky: {
    1: {
      description:
        "Number 1 represents new beginnings and leadership. It brings energy for starting new projects and taking initiative.",
      activities: [
        "Starting new projects",
        "Leadership roles",
        "Independent ventures",
        "Creative pursuits",
      ],
      colors: ["Red", "Gold", "Orange"],
      gemstones: ["Ruby", "Garnet", "Red Jasper"],
    },
    2: {
      description:
        "Number 2 represents harmony and cooperation. It brings energy for partnerships and diplomatic endeavors.",
      activities: [
        "Collaboration",
        "Meditation",
        "Peaceful activities",
        "Relationship building",
      ],
      colors: ["Blue", "Green", "Pink"],
      gemstones: ["Moonstone", "Pearl", "Rose Quartz"],
    },
    3: {
      description:
        "Number 3 represents creativity and expression. It brings energy for artistic pursuits and social activities.",
      activities: [
        "Creative projects",
        "Social gatherings",
        "Performance",
        "Communication",
      ],
      colors: ["Yellow", "Purple", "Pink"],
      gemstones: ["Citrine", "Amber", "Topaz"],
    },
    4: {
      description:
        "Number 4 represents stability and organization. It brings energy for building and establishing foundations.",
      activities: ["Planning", "Organizing", "Building", "Practical tasks"],
      colors: ["Green", "Brown", "Blue"],
      gemstones: ["Jade", "Emerald", "Green Aventurine"],
    },
    5: {
      description:
        "Number 5 represents change and adventure. It brings energy for travel and new experiences.",
      activities: [
        "Travel",
        "Adventure sports",
        "Learning new skills",
        "Social networking",
      ],
      colors: ["Turquoise", "Silver", "White"],
      gemstones: ["Turquoise", "Aquamarine", "Sodalite"],
    },
    6: {
      description:
        "Number 6 represents harmony and responsibility. It brings energy for nurturing and creating beauty.",
      activities: [
        "Home improvement",
        "Caregiving",
        "Artistic projects",
        "Community service",
      ],
      colors: ["Pink", "Green", "Purple"],
      gemstones: ["Pink Tourmaline", "Emerald", "Amethyst"],
    },
    7: {
      description:
        "Number 7 represents wisdom and spirituality. It brings energy for study and spiritual pursuits.",
      activities: ["Research", "Meditation", "Study", "Spiritual practices"],
      colors: ["Purple", "Silver", "White"],
      gemstones: ["Amethyst", "Clear Quartz", "Selenite"],
    },
    8: {
      description:
        "Number 8 represents power and abundance. It brings energy for business and material success.",
      activities: [
        "Business ventures",
        "Financial planning",
        "Leadership roles",
        "Power activities",
      ],
      colors: ["Purple", "Gold", "Red"],
      gemstones: ["Diamond", "Pyrite", "Tiger's Eye"],
    },
    9: {
      description:
        "Number 9 represents completion and universal love. It brings energy for humanitarian efforts and artistic expression.",
      activities: [
        "Volunteer work",
        "Teaching",
        "Artistic expression",
        "Spiritual practices",
      ],
      colors: ["Purple", "Gold", "White"],
      gemstones: ["Lapis Lazuli", "Amethyst", "Sugilite"],
    },
  },
};

interface NumerologyStore {
  data: NumerologyData;
  getLifePathInfo: (
    number: number
  ) => (typeof numerologyData.lifePath)[number] | null;
  getDestinyInfo: (
    number: number
  ) => (typeof numerologyData.destiny)[number] | null;
  getLuckyInfo: (
    number: number
  ) => (typeof numerologyData.lucky)[number] | null;
}

export const useNumerologyStore = create<NumerologyStore>((set, get) => ({
  data: numerologyData,
  getLifePathInfo: (number) => get().data.lifePath[number] || null,
  getDestinyInfo: (number) => get().data.destiny[number] || null,
  getLuckyInfo: (number) => get().data.lucky[number] || null,
}));
