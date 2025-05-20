import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Icon from 'lucide-react-native';

type IconType = keyof typeof Icon;

interface ButtonProps {
  text: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: ViewStyle;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: IconType;
  iconPosition?: 'left' | 'right';
}

export const Button = ({
  text,
  onPress,
  style,
  textStyle,
  disabled = false,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
}: ButtonProps) => {
  const getIconSize = () => {
    if (size === 'sm') return 16;
    if (size === 'lg') return 24;
    return 20;
  };

  const IconComponent = icon ? Icon[icon] : null;

  const renderContent = () => (
    <>
      {IconComponent && iconPosition === 'left' && (
        <IconComponent size={getIconSize()} color="#FFFFFF" style={styles.leftIcon} />
      )}
      <Text
        style={[
          styles.text,
          size === 'sm' && styles.textSmall,
          size === 'lg' && styles.textLarge,
          textStyle,
        ]}
      >
        {text}
      </Text>
      {IconComponent && iconPosition === 'right' && (
        <IconComponent size={getIconSize()} color="#FFFFFF" style={styles.rightIcon} />
      )}
    </>
  );

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        style={[
          styles.container,
          size === 'sm' && styles.containerSmall,
          size === 'lg' && styles.containerLarge,
          disabled && styles.disabled,
          style,
        ]}
      >
        <LinearGradient
          colors={['#3B47C9', '#8A4FFF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradient, disabled && styles.disabledGradient]}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  // Other variants would be implemented here
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        size === 'sm' && styles.containerSmall,
        size === 'lg' && styles.containerLarge,
        disabled && styles.disabled,
        style,
      ]}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    overflow: 'hidden',
    height: 48,
    minWidth: 100,
  },
  containerSmall: {
    height: 36,
    minWidth: 80,
  },
  containerLarge: {
    height: 56,
    minWidth: 120,
  },
  gradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  textSmall: {
    fontSize: 14,
  },
  textLarge: {
    fontSize: 18,
  },
  disabled: {
    opacity: 0.6,
  },
  disabledGradient: {
    opacity: 0.6,
  },
  leftIcon: {
    marginRight: 10,
  },
  rightIcon: {
    marginLeft: 10,
  },
});