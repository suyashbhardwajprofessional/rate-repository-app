import { Text as NativeText, StyleSheet } from 'react-native';

import theme from './theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textWhite,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorTextLight: {
    color: theme.colors.textBlack,
  },
  colorTextDark: {
    color: theme.colors.textWhite,
  },
  colorPrimary: {
    color: theme.colors.fillPrimary,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightHeavy: {
    fontWeight: theme.fontWeights.heavy,
  },
  fontWeightNormal: {
    fontWeight: theme.fontWeights.normal,
  },
});

const MyText = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textLight' && styles.colorTextLight,
    color === 'textDark' && styles.colorTextDark,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightHeavy,
    fontWeight === 'normal' && styles.fontWeightNormal,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default MyText;
