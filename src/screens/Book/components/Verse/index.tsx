import React, { memo, useState } from 'react'
import {
  Pressable,
  Share,
  Alert,
  Text
} from 'react-native'
import { useStyles } from 'react-native-unistyles'

import { stylesheet } from './styles'

import { useFont } from '@/context/font'

type VerseProps = {
  bookName: string
  chapter: number
  number: number
  text: string
}

const Verse = memo(({ bookName, chapter, number, text }: VerseProps) => {
  const [backgroundColor, setBackgroundColor] = useState('transparent')
  const { fontScale } = useFont()
  const { styles, theme } = useStyles(stylesheet)

  const handleShareVerse = (eventName: string) => {
    try {
      setBackgroundColor('transparent')
      if (eventName !== 'itemSelected') return

      const message = `${text}\n(${bookName} ${chapter}:${number})`

      Share.share({ message })
    } catch {
      Alert.alert('Erro ao compartilhar versículo')
    }
  }

  const handleMenuPress = () => {
    setBackgroundColor(theme.colors.gradient[1])
    Alert.alert(
      'Compartilhar versículo',
      'Deseja compartilhar este versículo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Compartilhar', onPress: () => handleShareVerse('itemSelected') }
      ]
    )
  }

  return (
    <Pressable
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
