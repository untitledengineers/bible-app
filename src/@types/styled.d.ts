import 'styled-components/native'

import { lightTheme } from '../styles'

export type Theme = typeof lightTheme

declare module 'styled-components/native' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}
