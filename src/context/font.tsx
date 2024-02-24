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

    setFontScale(prevFontScale => prevFontScale + 0.1)
    AsyncStorage.setItem('@fontScale', JSON.stringify(fontScale))
  }, [fontScale])

  const decreaseFontScale = useCallback(() => {
    if (fontScale <= 1) {
      return
    }

    setFontScale(prevFontScale => prevFontScale - 0.1)
    AsyncStorage.setItem('@fontScale', JSON.stringify(fontScale))
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
