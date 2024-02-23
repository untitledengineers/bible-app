import 'styled-components'

import { lightTheme } from '../theme/lightTheme'

export type Theme = typeof lightTheme

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}
