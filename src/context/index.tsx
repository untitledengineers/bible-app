import React from 'react'

import { FontProvider } from './font'
import { SearchProvider } from './search'
import { ThemeProvider } from './theme'

type AppProvidersProps = {
  children: React.ReactNode
}

const AppProviders = ({ children }: AppProvidersProps): JSX.Element => {
  return (
    <ThemeProvider>
      <SearchProvider>
        <FontProvider>{children}</FontProvider>
      </SearchProvider>
    </ThemeProvider>
  )
}

export default AppProviders
