import { Dimensions } from 'react-native';

//Guideline sizes are based on standard ~5" screen mobile device: 360x800
const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 360;

export const SCALE = (size: number) => (width / guidelineBaseWidth) * size;

export const COLORS = {
  primary10: '#E2F2EB',
  primary50: '#E1E8E5',
  primary70: '#6E8E7F',
  primary100: '#119656',
  primary400: '#073f24',
  lightGreen: '#ECF7F1',
  mediumGray: '#49454F',
  green20: '#073F24',
  secondary100: '#f2f2f2',
  lightGray: '#f0f0f0',
  darkGray: '#93A29B',
  error100: '#f44336',
  white: '#ffffff',
  black: '#212121',
};

export const SIZES = {
  // app dimensions
  width,
  height,

  // radius
  r4: SCALE(4),
  r10: SCALE(10),
  r14: SCALE(14),
  r20: SCALE(20),
  r22: SCALE(22),

  // regular width and height
  s12: SCALE(12),
  s16: SCALE(16),
  s18: SCALE(18),
  s20: SCALE(20),
  s24: SCALE(24),
  s30: SCALE(30),
  s36: SCALE(36),
  s40: SCALE(40),
  s44: SCALE(44),
  s48: SCALE(48),
  s50: SCALE(50),
  s60: SCALE(60),
  s70: SCALE(70),
  s200: SCALE(200),
  s328: SCALE(328),
  s400: SCALE(400),

  // paddings and margins
  m2: SCALE(2),
  m4: SCALE(4),
  m6: SCALE(6),
  m10: SCALE(10),
  m12: SCALE(12),
  m16: SCALE(16),
  m18: SCALE(18),
  m20: SCALE(20),
  m24: SCALE(24),
  m30: SCALE(30),
  m35: SCALE(35),
  m40: SCALE(40),

  // font sizes
  f8: SCALE(8),
  f10: SCALE(10),
  f12: SCALE(12),
  f14: SCALE(14),
  f16: SCALE(16),
  f18: SCALE(18),
  f20: SCALE(20),
};

export const FONTS = {
  //Bold
  bold20: { fontFamily: 'Heebo-Bold', fontSize: SIZES.f20 },

  // SemiBold
  semibold16: { fontFamily: 'Heebo-SemiBold', fontSize: SIZES.f16 },
  semibold18: { fontFamily: 'Heebo-SemiBold', fontSize: SIZES.f18 },
  semibold20: { fontFamily: 'Heebo-SemiBold', fontSize: SIZES.f20 },

  // Medium
  medium12: { fontFamily: 'Heebo-Medium', fontSize: SIZES.f12 },
  medium14: { fontFamily: 'Heebo-Medium', fontSize: SIZES.f14 },
  medium16: { fontFamily: 'Heebo-Medium', fontSize: SIZES.f16 },
  medium18: { fontFamily: 'Heebo-Medium', fontSize: SIZES.f18 },

  // Regular
  regular8: { fontFamily: 'Heebo-Regular', fontSize: SIZES.f8 },
  regular10: { fontFamily: 'Heebo-Regular', fontSize: SIZES.f10 },
  regular12: { fontFamily: 'Heebo-Regular', fontSize: SIZES.f12 },
  regular14: { fontFamily: 'Heebo-Regular', fontSize: SIZES.f14 },
  regular16: { fontFamily: 'Heebo-Regular', fontSize: SIZES.f16 },
};

export default { COLORS, SIZES, FONTS, SCALE };
