import { StyleSheet, Text, View, ViewStyle } from 'react-native';

interface BadgeProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Badge = ({ children, style }: BadgeProps) => {
  return (
    <View style={[styles.badge, style]}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(245, 189, 65, 0.9)',
  },
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});