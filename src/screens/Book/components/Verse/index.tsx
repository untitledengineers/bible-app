import React, { memo, useState } from 'react'
import { Pressable, Share, Alert, Text } from 'react-native'
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

  const resetBackgroundColor = () => {
    setBackgroundColor('transparent')
  }

  const handleShareVerse = () => {
    try {
      resetBackgroundColor()

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
        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: resetBackgroundColor
        },
        {
          text: 'Compartilhar',
          onPress: handleShareVerse
        }
      ]
    )
  }

  return (
    <Pressable onLongPress={handleMenuPress} delayLongPress={200}>
      <Text style={styles.verse(backgroundColor, fontScale)}>
        <Text style={styles.verseNumber(fontScale)}>{number}</Text> {text}
      </Text>
    </Pressable>
  )
})

export default Verse
