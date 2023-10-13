// External Libraries
import 'styled-components';
import { defaultTheme as theme} from './default';

declare module 'styled-components' {
  type ThemeType = typeof theme

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ThemeType {}
}
