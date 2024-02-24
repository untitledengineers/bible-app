import React from 'react'
import { ThemeProvider } from './theme'
import { LoadingProvider } from './loading'
import { SearchProvider } from './search'
import { FontProvider } from './font'

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
