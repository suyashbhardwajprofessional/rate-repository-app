import { View as NativeView, StyleSheet } from 'react-native';
import theme from './theme';

const styles = StyleSheet.create({
  view: {
    backgroundColor: theme.colors.fillApplcationPaletteOne,
    color: theme.colors.textWhite,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    maxHeight: 60,
    alignItems: 'flex-end',
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorFillPrimary: {
    backgroundColor: theme.colors.fillPrimary,
  },
  colorFillVanilla: {
    backgroundColor: theme.colors.fillVanilla,
  },
  colorFillDarkChocolate: {
    backgroundColor: theme.colors.fillDarkChocolate,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  fontWeightNormal: {
    fontWeight: theme.fontWeights.normal,
  },
  fontWeightSmall: {
    fontWeight: theme.fontWeights.light,
  },
});

const AppBarContainer = ({ ambience, detailing, style, ...props }) => {
  const viewStyle = [
      styles.view,
      ambience === 'light' && styles.colorFillVanilla,
      ambience === 'dark' && styles.colorFillDarkChocolate,
      detailing == 'gross' && styles.fontWeightBold,
      detailing == 'normal' && styles.fontWeightNormal,
      detailing == 'sharp' && styles.fontWeightSmall,
      style,
    ];
  return (
      <NativeView style = {viewStyle} {...props} />
  )
}

export default AppBarContainer