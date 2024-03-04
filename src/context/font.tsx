import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  Dispatch,
  SetStateAction
} from 'react'

interface FontContextData {
  fontScale: number
  setFontScale: Dispatch<SetStateAction<number>>
  increaseFontScale: () => void
  decreaseFontScale: () => void
}

export const FontContext = createContext({} as FontContextData)

export const FontProvider = ({
  children
}: React.PropsWithChildren<unknown>) => {
  const [fontScale, setFontScale] = useState(1)

  const increaseFontScale = useCallback(() => {
    if (fontScale >= 1.4) {
      return
    }

    const newFontScale = fontScale + 0.1
    setFontScale(newFontScale)
    AsyncStorage.setItem('@fontScale', JSON.stringify(newFontScale))
  }, [fontScale])

  const decreaseFontScale = useCallback(() => {
    if (fontScale <= 1) {
      return
    }

    const newFontScale = fontScale - 0.1
    setFontScale(newFontScale)
    AsyncStorage.setItem('@fontScale', JSON.stringify(newFontScale))
  }, [fontScale])

  return (
    <FontContext.Provider
      value={{ fontScale, setFontScale, increaseFontScale, decreaseFontScale }}
    >
      {children}
    </FontContext.Provider>
  )
}

export function useFont() {
  const context = useContext(FontContext)

  return context
}
