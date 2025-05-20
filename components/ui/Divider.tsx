import { StyleSheet, View, ViewStyle } from 'react-native';

interface DividerProps {
  style?: ViewStyle;
}

export const Divider = ({ style }: DividerProps) => {
  return <View style={[styles.divider, style]} />;
};

const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    width: '100%',
  },
});