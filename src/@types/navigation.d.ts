/* eslint-disable @typescript-eslint/no-empty-interface */
export interface RootStackParamList {
  Onboarding: undefined
  Home: undefined
  Book: {
    bookName: string
    initialScrollIndex?: number
  }
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
