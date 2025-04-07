import Constants from 'expo-constants';

const theme = {
  colors: {
    textWhite: '#ffffff',
    textBlack: '#000000',
    textPrimary: '#24292e',
    textSecondary: '#586069',
    fillVanilla: '#f0ead6',
    fillChocolate: '#D2691E',
    fillDarkChocolate: '#150a03',
    fillPrimary: '#0366d6',
    fillApplcationPaletteOne: '#24292e'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    heading: 30,
  },
  fonts: {
    main: 'System',
  },
  fontWeights: {
    light: '200',
    normal: '400',
    bold: '700',
  },
  topPaddings: {
    regular: Constants.statusBarHeight,
  }, 
  paddings: {
    sharp:'10'
  }
};

export default theme;