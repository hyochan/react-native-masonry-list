import '@emotion/react';
import {DoobooTheme} from 'dooboo-ui';
import {CustomAppTheme} from './theme';

type AllTheme = CustomAppTheme & DoobooTheme;

interface CustomTheme extends AllTheme {}

declare module '@emotion/react' {
  export interface Theme extends CustomTheme {
    isMobile?: boolean;
    isTablet?: boolean;
    isDesktop?: boolean;
  }
}
