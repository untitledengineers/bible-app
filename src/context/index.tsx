import React from 'react'

import { FontProvider } from './font'
import { LoadingProvider } from './loading'
import { SearchProvider } from './search'
import { ThemeProvider } from './theme'

type AppProvidersProps = {
  children: React.ReactNode
}

const AppProviders = ({ children }: AppProvidersProps): JSX.Element => {
  return (
    <ThemeProvider>
      <LoadingProvider>
        <SearchProvider>
          <FontProvider>{children}</FontProvider>
        </SearchProvider>
      </LoadingProvider>
    </ThemeProvider>
  )
}

export default AppProviders
