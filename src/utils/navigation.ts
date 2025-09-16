import { CommonActions, NavigationContainerRef } from '@react-navigation/native'

import { RootStackParamList } from '../@types/navigation'

let navigator: NavigationContainerRef<RootStackParamList>

export function setNavigator(
  ref: NavigationContainerRef<RootStackParamList>
): void {
  navigator = ref
}

export function navigate(
  routeName: string,
  params?: Record<string, unknown>
): void {
  navigator?.dispatch(
    CommonActions.navigate({
      name: routeName,
      params
    })
  )
}

export function reset(routeName: string, index = 0): void {
  navigator?.dispatch(
    CommonActions.reset({
      index,
      routes: [{ name: routeName }]
    })
  )
}
