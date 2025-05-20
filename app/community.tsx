import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassmorphicCard } from "@/components/ui/GlassmorphicCard";
import { useTranslation } from "@/hooks/useTranslation";
import { useUserStore } from "@/store/userStore";
import { generateMockCommunityPosts } from "@/utils/mockData";
import { calculateLifePathNumber } from "@/utils/numerologyCalculations";
import {
  HeartIcon,
  MessageCircle,
  Share2Icon,
  Users,
} from "lucide-react-native";

import { theme } from "@/constants/theme";
import { ScrollView } from "react-native-gesture-handler";

export default function CommunityScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { user } = useUserStore();
  const [posts, setPosts] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState("popular");

  useEffect(() => {
    const lifePathNumber = user?.dateOfBirth
      ? calculateLifePathNumber(user.dateOfBirth)
      : Math.floor(Math.random() * 9) + 1;
    setPosts(generateMockCommunityPosts(lifePathNumber));
  }, [user]);

  const renderPost = ({ item, index }: { item: any; index: number }) => (
    <Animated.View entering={FadeInDown.duration(400).delay(200 + index * 100)}>
      <GlassmorphicCard style={styles.postCard}>
        <View style={styles.postHeader}>
          <View style={styles.postUser}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>{item.userName.charAt(0)}</Text>
            </View>
            <View>
              <Text style={styles.userName}>{item.userName}</Text>
              <View style={styles.userNumberContainer}>
                <Text style={styles.userNumber}>
                  {t("community.lifePath")} {item.lifePathNumber}
                </Text>
              </View>
            </View>
          </View>
          <Badge
            style={
              item.postType === "compatibility"
                ? styles.compatBadge
                : styles.storyBadge
            }
          >
            {t(`community.postTypes.${item.postType}`)}
          </Badge>
        </View>

        <Text style={styles.postContent}>{item.content}</Text>

        {item.imageUrl && (
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.postImage}
            resizeMode="cover"
          />
        )}

        <View style={styles.postFooter}>
          <TouchableOpacity style={styles.actionButton}>
            <HeartIcon size={20} color="#FFFFFF" />
            <Text style={styles.actionText}>{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MessageCircle size={20} color="#FFFFFF" />
            <Text style={styles.actionText}>{item.comments}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Share2Icon size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </GlassmorphicCard>
    </Animated.View>
  );

  return (
    <View style={[styles.container]}>
      <LinearGradient
        colors={[
          "rgba(245, 189, 65, 0.8)",
          "rgba(138, 79, 255, 0.5)",
          "rgba(59, 71, 201, 0.1)",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.headerGradient, { paddingTop: insets.top + 10 }]}
      >
        <View style={styles.headerContent}>
          <View style={styles.titleContainer}>
            <Users color="#FFFFFF" size={24} />
            <Text style={styles.title}>{t("community.title")}</Text>
          </View>
          <Text style={styles.subtitle}>{t("community.subtitle")}</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
          {["popular", "lifePath", "compatibility", "stories"].map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setActiveFilter(filter)}
              style={[
                styles.filterButton,
                activeFilter === filter && styles.activeFilterButton,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter && styles.activeFilterText,
                ]}
              >
                {t(`community.filters.${filter}`)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.peopleContainer}>
            <View style={styles.sectionHeader}>
              <Text
                style={[styles.sectionTitle, { color: theme.colors.primary }]}
              >
                {t("community.peopleHeader")}
              </Text>
              <TouchableOpacity>
                <Text
                  style={[styles.seeAllText, { color: theme.colors.primary }]}
                >
                  {t("common.seeAll")}
                </Text>
              </TouchableOpacity>
            </View>

            <Animated.View
              style={styles.peopleList}
              entering={FadeInRight.duration(600).delay(300)}
            >
              {[...Array(5)].map((_, index) => (
                <TouchableOpacity key={index} style={styles.personButton}>
                  <View style={styles.personAvatar}>
                    <Text style={styles.personAvatarText}>
                      {String.fromCharCode(65 + index)}
                    </Text>
                  </View>
                  <Badge style={styles.lifePathBadge}>{index + 1}</Badge>
                </TouchableOpacity>
              ))}
            </Animated.View>
          </View>
        }
        ListFooterComponent={
          <View style={styles.shareExperienceContainer}>
            <Button
              text={t("community.shareExperience")}
              onPress={() => {}}
              style={styles.shareButton}
            />
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 5,
  },
  filterContainer: {
    marginTop: 15,
    paddingBottom: 8,
  },
  filterButton: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 30,
    marginRight: 10,
  },
  activeFilterButton: {
    backgroundColor: "#FFFFFF",
  },
  filterText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#FFFFFF",
  },
  activeFilterText: {
    color: "#3B47C9",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 100,
  },
  peopleContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
  },
  seeAllText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
  },
  peopleList: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  personButton: {
    alignItems: "center",
  },
  personAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(138, 79, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  personAvatarText: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: "#FFFFFF",
  },
  lifePathBadge: {
    minWidth: 24,
    height: 24,
    backgroundColor: "#F5BD41",
  },
  postCard: {
    marginBottom: 20,
    padding: 15,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  postUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(59, 71, 201, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  avatarText: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: "#FFFFFF",
  },
  userName: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#FFFFFF",
  },
  userNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userNumber: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
  },
  compatBadge: {
    backgroundColor: "#8A4FFF",
  },
  storyBadge: {
    backgroundColor: "#34D399",
  },
  postContent: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#FFFFFF",
    marginBottom: 15,
    lineHeight: 20,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    marginBottom: 15,
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: 200,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#FFFFFF",
    marginLeft: 6,
  },
  shareExperienceContainer: {
    marginTop: 10,
    marginBottom: 40,
    alignItems: "center",
  },
  shareButton: {
    width: 220,
  },
});
