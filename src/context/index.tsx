import React from 'react'

import { FontProvider } from './font'
import { SearchProvider } from './search'

type AppProvidersProps = {
  children: React.ReactNode
}

const AppProviders = ({ children }: AppProvidersProps): JSX.Element => {
  return (
    <SearchProvider>
      <FontProvider>{children}</FontProvider>
    </SearchProvider>
  )
}

export default AppProviders
