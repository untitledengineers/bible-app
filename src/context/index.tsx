import React from 'react'
import { ThemeProvider } from './theme'
import { LoadingProvider } from './loading'
import { SearchProvider } from './search'

type AppProvidersProps = {
  children: React.ReactNode
}

const AppProviders = ({ children }: AppProvidersProps): JSX.Element => {
  return (
    <ThemeProvider>
      <LoadingProvider>
        <SearchProvider>{children}</SearchProvider>
      </LoadingProvider>
    </ThemeProvider>
  )
}

export default AppProviders
