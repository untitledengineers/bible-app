import React, { useRef, useState } from 'react'
import {
  UIManager,
  findNodeHandle,
  Pressable,
  Share,
  Alert
} from 'react-native'

import { Verse as VerseStyle, VerseNumber } from './styles'
import { useBookController } from '../../useBookController'

import { useFont } from '@/context/font'

type VerseProps = {
  chapter: number
  number: number
  text: string
}

const Verse = ({ chapter, number, text }: VerseProps) => {
  const [backgroundColor, setBackgroundColor] = useState('transparent')
  const pressableRef = useRef(null)
  const { fontScale } = useFont()
  const { bookName, theme } = useBookController()

  const handleShowPopupError = () => {
    Alert.alert('Erro ao selecionar versículo')
  }

  const handleShareVerse = (eventName: string) => {
    try {
      setBackgroundColor('transparent')
      if (eventName !== 'itemSelected') return

      const message = `${text}\n(${bookName} ${chapter}:${number})`

      Share.share({ message })
    } catch (error: any) {
      Alert.alert(error.message)
    }
  }

  const handleMenuPress = () => {
    UIManager.showPopupMenu(
      findNodeHandle(pressableRef.current) as any,
      ['Compartilhar'],
      handleShowPopupError,
      handleShareVerse
    )
    setBackgroundColor(theme.colors.gradient[1])
  }

  return (
    <Pressable
      ref={pressableRef}
      onLongPress={handleMenuPress}
      delayLongPress={200}
    >
      <VerseStyle
        style={{
          fontSize: 20 * fontScale,
          lineHeight: 30 * fontScale,
          backgroundColor
        }}
      >
        <VerseNumber style={{ fontSize: 14 * fontScale }}>{number}</VerseNumber>{' '}
        {text}
      </VerseStyle>
    </Pressable>
  )
}

export default Verse
