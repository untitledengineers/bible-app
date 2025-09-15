import React, { memo } from 'react'
import { Text, View } from 'react-native'
import { useStyles } from 'react-native-unistyles'

import { stylesheet } from './styles'

type ListHeaderProps = {
  text: string
}

const ListHeader = memo(({ text }: ListHeaderProps) => {
  const { styles } = useStyles(stylesheet)

  return (
    <View style={styles.container}>
      <View style={styles.separator} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.separator} />
    </View>
  )
})

export default ListHeader
