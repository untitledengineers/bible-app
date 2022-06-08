import { CommonActions, NavigationContainerRef } from '@react-navigation/native'

let navigator: NavigationContainerRef

export function setNavigator(ref: NavigationContainerRef): void {
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
