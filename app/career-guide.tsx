// @ts-nocheck
import { GlassmorphicCard } from "@/components/ui/GlassmorphicCard";
import { theme } from "@/constants/theme";
import { useTranslation } from "@/hooks/useTranslation";
import { useUserStore } from "@/store/userStore";
import { calculateLifePathNumber } from "@/utils/numerologyCalculations";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ArrowLeft, Briefcase as BriefcaseIcon } from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CareerPath {
  title: string;
  description: string;
  skills: string[];
  industries: string[];
  challenges: string[];
  growth: string[];
}

const getCareerPaths = (lifePathNumber: number): CareerPath => {
  const paths: Record<number, CareerPath> = {
    1: {
      title: "The Pioneer",
      description:
        "As a Life Path 1, you are a natural leader and innovator. Your career should allow you to express your independence, creativity, and pioneering spirit.",
      skills: [
        "Leadership and initiative",
        "Strategic thinking",
        "Innovation and creativity",
        "Decision-making",
        "Project management",
        "Problem-solving",
      ],
      industries: [
        "Entrepreneurship",
        "Technology startups",
        "Executive management",
        "Creative direction",
        "Innovation consulting",
        "Product development",
      ],
      challenges: [
        "Delegating responsibilities",
        "Team collaboration",
        "Patience with processes",
        "Accepting others' input",
        "Following established procedures",
      ],
      growth: [
        "Develop active listening skills",
        "Practice collaborative leadership",
        "Balance independence with teamwork",
        "Learn to appreciate different perspectives",
        "Cultivate patience and diplomacy",
      ],
    },
    2: {
      title: "The Diplomat",
      description:
        "Your Life Path 2 indicates excellence in cooperation, mediation, and detail-oriented work. Your career should leverage your diplomatic and intuitive abilities.",
      skills: [
        "Diplomacy and mediation",
        "Emotional intelligence",
        "Detail orientation",
        "Team coordination",
        "Support and nurturing",
        "Conflict resolution",
      ],
      industries: [
        "Human Resources",
        "Counseling and therapy",
        "Diplomatic services",
        "Project coordination",
        "Customer relations",
        "Team management",
      ],
      challenges: [
        "Being assertive",
        "Making quick decisions",
        "Setting boundaries",
        "Self-promotion",
        "Handling confrontation",
      ],
      growth: [
        "Develop assertiveness skills",
        "Practice decision-making",
        "Set clear boundaries",
        "Build self-confidence",
        "Learn to promote your achievements",
      ],
    },
    3: {
      title: "The Communicator",
      description:
        "With Life Path 3, your career should embrace creativity, communication, and self-expression. You thrive in roles that allow you to inspire and entertain others.",
      skills: [
        "Creative expression",
        "Communication",
        "Public speaking",
        "Artistic ability",
        "Social networking",
        "Entertainment",
      ],
      industries: [
        "Marketing and advertising",
        "Entertainment",
        "Media and journalism",
        "Creative arts",
        "Public relations",
        "Education",
      ],
      challenges: [
        "Maintaining focus",
        "Following through",
        "Organization",
        "Time management",
        "Handling criticism",
      ],
      growth: [
        "Develop organizational systems",
        "Set and follow schedules",
        "Practice project completion",
        "Build resilience to criticism",
        "Balance creativity with discipline",
      ],
    },
    4: {
      title: "The Builder",
      description:
        "As a Life Path 4, you excel in roles requiring organization, reliability, and systematic thinking. Your career should allow you to build lasting structures and systems.",
      skills: [
        "Organization",
        "Systematic thinking",
        "Attention to detail",
        "Process management",
        "Planning",
        "Implementation",
      ],
      industries: [
        "Engineering",
        "Architecture",
        "Finance and accounting",
        "Project management",
        "Construction",
        "Systems analysis",
      ],
      challenges: [
        "Adaptability",
        "Risk-taking",
        "Innovation",
        "Flexibility",
        "Embracing change",
      ],
      growth: [
        "Practice adaptability",
        "Embrace new approaches",
        "Develop creative thinking",
        "Learn to be flexible",
        "Balance structure with innovation",
      ],
    },
    5: {
      title: "The Freedom Seeker",
      description:
        "Your Life Path 5 suggests a career that offers variety, freedom, and adventure. You excel in roles that allow you to adapt and explore new possibilities.",
      skills: [
        "Adaptability",
        "Communication",
        "Problem-solving",
        "Quick learning",
        "Marketing",
        "Sales",
      ],
      industries: [
        "Travel and tourism",
        "Sales and marketing",
        "Journalism",
        "Entertainment",
        "Digital nomad",
        "Consulting",
      ],
      challenges: [
        "Commitment",
        "Routine",
        "Focus",
        "Long-term planning",
        "Stability",
      ],
      growth: [
        "Develop commitment skills",
        "Create flexible routines",
        "Practice focus techniques",
        "Set long-term goals",
        "Balance freedom with stability",
      ],
    },
    6: {
      title: "The Nurturer",
      description:
        "Life Path 6 indicates success in careers involving care, responsibility, and service to others. You thrive in roles that allow you to help and support people.",
      skills: [
        "Caregiving",
        "Teaching",
        "Counseling",
        "Problem-solving",
        "Artistic sense",
        "Leadership",
      ],
      industries: [
        "Healthcare",
        "Education",
        "Counseling",
        "Social services",
        "Interior design",
        "Community leadership",
      ],
      challenges: [
        "Setting boundaries",
        "Self-care",
        "Perfectionism",
        "Over-responsibility",
        "Work-life balance",
      ],
      growth: [
        "Establish clear boundaries",
        "Practice self-care",
        "Accept imperfection",
        "Delegate responsibilities",
        "Balance giving with receiving",
      ],
    },
    7: {
      title: "The Analyst",
      description:
        "With Life Path 7, your career should involve analysis, research, and specialized knowledge. You excel in roles requiring deep thinking and expertise.",
      skills: [
        "Analysis",
        "Research",
        "Technical expertise",
        "Problem-solving",
        "Strategic thinking",
        "Investigation",
      ],
      industries: [
        "Research and development",
        "Technology",
        "Academia",
        "Science",
        "Investigation",
        "Technical writing",
      ],
      challenges: [
        "Social interaction",
        "Practical application",
        "Team collaboration",
        "Communication",
        "Marketing yourself",
      ],
      growth: [
        "Develop social skills",
        "Practice practical application",
        "Learn team collaboration",
        "Improve communication",
        "Build professional networks",
      ],
    },
    8: {
      title: "The Executive",
      description:
        "Life Path 8 indicates success in business, finance, and leadership roles. Your career should allow you to exercise authority and achieve material success.",
      skills: [
        "Leadership",
        "Financial management",
        "Business strategy",
        "Organization",
        "Decision-making",
        "Authority",
      ],
      industries: [
        "Business management",
        "Finance",
        "Real estate",
        "Investment",
        "Executive leadership",
        "Entrepreneurship",
      ],
      challenges: [
        "Work-life balance",
        "Delegation",
        "Personal relationships",
        "Stress management",
        "Power dynamics",
      ],
      growth: [
        "Maintain work-life balance",
        "Practice delegation",
        "Nurture relationships",
        "Develop stress management",
        "Use power wisely",
      ],
    },
    9: {
      title: "The Humanitarian",
      description:
        "Your Life Path 9 suggests a career focused on helping humanity and making a difference. You excel in roles that allow you to serve and inspire others.",
      skills: [
        "Leadership",
        "Teaching",
        "Healing",
        "Communication",
        "Empathy",
        "Vision",
      ],
      industries: [
        "Non-profit",
        "International relations",
        "Healthcare",
        "Education",
        "Humanitarian services",
        "Arts",
      ],
      challenges: [
        "Boundaries",
        "Detachment",
        "Financial focus",
        "Personal limits",
        "Emotional balance",
      ],
      growth: [
        "Set healthy boundaries",
        "Practice detachment",
        "Develop financial skills",
        "Recognize limits",
        "Balance emotions",
      ],
    },
  };

  return paths[lifePathNumber] || paths[1];
};

export default function CareerGuideScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { user } = useUserStore();

  const lifePathNumber = user?.dateOfBirth
    ? calculateLifePathNumber(user.dateOfBirth)
    : 1;

  const careerPath = getCareerPaths(lifePathNumber);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          "rgba(59, 71, 201, 0.8)",
          "rgba(138, 79, 255, 0.6)",
          "rgba(245, 189, 65, 0.1)",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.headerGradient, { paddingTop: insets.top + 10 }]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <View style={styles.titleContainer}>
            <BriefcaseIcon color="#FFFFFF" size={24} />
            <Text style={styles.title}>{t("career.title")}</Text>
          </View>
          <Text style={styles.subtitle}>{careerPath.title}</Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(600).delay(300)}>
          <GlassmorphicCard style={styles.descriptionCard}>
            <Text style={styles.descriptionText}>{careerPath.description}</Text>
          </GlassmorphicCard>

          <GlassmorphicCard style={[styles.sectionCard, styles.marginTop]}>
            <Text style={styles.sectionTitle}>{t("career.keySkills")}</Text>
            <View style={styles.skillsContainer}>
              {careerPath.skills.map((skill, index) => (
                <View key={index} style={styles.skillTag}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </GlassmorphicCard>

          <GlassmorphicCard style={[styles.sectionCard, styles.marginTop]}>
            <Text style={styles.sectionTitle}>{t("career.industries")}</Text>
            <View style={styles.listContainer}>
              {careerPath.industries.map((industry, index) => (
                <Text key={index} style={styles.listItem}>
                  • {industry}
                </Text>
              ))}
            </View>
          </GlassmorphicCard>

          <GlassmorphicCard style={[styles.sectionCard, styles.marginTop]}>
            <Text style={styles.sectionTitle}>{t("career.challenges")}</Text>
            <View style={styles.listContainer}>
              {careerPath.challenges.map((challenge, index) => (
                <Text key={index} style={styles.listItem}>
                  • {challenge}
                </Text>
              ))}
            </View>
          </GlassmorphicCard>

          <GlassmorphicCard style={[styles.sectionCard, styles.marginTop]}>
            <Text style={styles.sectionTitle}>{t("career.growth")}</Text>
            <View style={styles.listContainer}>
              {careerPath.growth.map((item, index) => (
                <Text key={index} style={styles.listItem}>
                  • {item}
                </Text>
              ))}
            </View>
          </GlassmorphicCard>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContent: {
    marginTop: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: "#FFFFFF",
    marginLeft: 10,
  },
  subtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 5,
    marginLeft: 34,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  descriptionCard: {
    padding: 20,
  },
  descriptionText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: theme.colors.primary,
    lineHeight: 24,
  },
  sectionCard: {
    padding: 20,
  },
  marginTop: {
    marginTop: 20,
  },
  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: theme.colors.primary,
    marginBottom: 15,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -5,
  },
  skillTag: {
    backgroundColor: theme.colors.tertiaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    margin: 5,
    borderWidth: 1,
    borderColor: theme.colors.tertiary,
  },
  skillText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: theme.colors.secondary,
  },
  listContainer: {
    marginTop: 5,
  },
  listItem: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: theme.colors.secondary,
    marginBottom: 10,
    lineHeight: 24,
  },
});
