import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import { BackHandler } from 'react-native'

export const useBackHandler = () => {
  const onBackHandler = useCallback(() => {
    return true
  }, [])

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', onBackHandler)

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackHandler)
    }, [onBackHandler])
  )
}
