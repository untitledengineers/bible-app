import React, { memo, useRef, useState } from 'react'
import {
  UIManager,
  findNodeHandle,
  Pressable,
  Share,
  Alert,
  Text
} from 'react-native'
import { useStyles } from 'react-native-unistyles'

import { stylesheet } from './styles'
import { useBookController } from '../../useBookController'

import { useFont } from '@/context/font'

type VerseProps = {
  chapter: number
  number: number
  text: string
}

const Verse = memo(({ chapter, number, text }: VerseProps) => {
  const [backgroundColor, setBackgroundColor] = useState('transparent')
  const pressableRef = useRef(null)
  const { fontScale } = useFont()
  const { bookName } = useBookController()
  const { styles, theme } = useStyles(stylesheet)

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
      <Text
        style={{
          ...styles.verse,
          fontSize: 20 * fontScale,
          lineHeight: 30 * fontScale,
          backgroundColor
        }}
      >
        <Text style={{ ...styles.verseNumber, fontSize: 14 * fontScale }}>
          {number}
        </Text>{' '}
        {text}
      </Text>
    </Pressable>
  )
})

export default Verse
