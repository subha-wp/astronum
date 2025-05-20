import { StyleSheet, View, ViewStyle, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';

interface GlassmorphicCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
}

export const GlassmorphicCard = ({ children, style, intensity = 60 }: GlassmorphicCardProps) => {
  const { isDark } = useTheme();
  
  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, style]}>
        <LinearGradient
          colors={[
            isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.7)',
            isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.3)',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.content}>{children}</View>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <BlurView
        intensity={intensity}
        tint={isDark ? 'dark' : 'light'}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={[
          isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.7)',
          isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.3)',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  content: {
    padding: 16,
  },
});