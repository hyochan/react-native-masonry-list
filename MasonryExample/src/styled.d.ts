import '@emotion/react';
import type {DoobooTheme} from 'dooboo-ui';
import type {CustomAppTheme} from './theme';

type AllTheme = CustomAppTheme & DoobooTheme;

interface CustomTheme extends AllTheme {}

declare module '@emotion/react' {
  export interface Theme extends CustomTheme {
    isMobile?: boolean;
    isTablet?: boolean;
    isDesktop?: boolean;
  }
}
