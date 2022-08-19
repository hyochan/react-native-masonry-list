import {DoobooTheme} from 'dooboo-ui';

export const colors = {
  success: '#00BA90',
  darkGray: '#00000070',
  mediumGray: '#00000030',
  lightGray: '#CFCED0',
};

export type Colors = typeof colors;

export const light = {
  background: '#FFFFFF',
  paper: '#EAEBF4',
  primary: '#393D7A',
  accent: '#B446BF',
  link: '#393D7A',
  heading: '#393D7A',
  titleText: '#000000',
  subText: '#404040',
  text: '#000000',
  textContrast: '#D3D8E8',
  disabled: colors.mediumGray,
  border: '#EDEDED',
  placeholder: '#999999',
};

export type CustomAppTheme = typeof light & DoobooTheme;

export const dark = {
  background: '#232323',
  paper: '#2C2C2C',
  primary: '#8A96DC',
  accent: '#8A96DC',
  link: '#E0E0E0',
  heading: '#FFFFFF',
  titleText: '#8A96DC',
  subText: '#D3D8E8',
  text: '#D3D8E8',
  textContrast: '#000000',
  disabled: colors.mediumGray,
  border: '#333333',
  placeholder: '#444444',
};

export const theme = {
  light,
  dark,
};
