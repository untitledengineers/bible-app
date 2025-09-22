import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Animated, View } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { useStyles } from 'react-native-unistyles'

import { stylesheet } from './styles'
import { useFont } from '../../context/font'

type Props = {
  title?: string
  titleOpacity?: number | Animated.AnimatedInterpolation<string | number>
}

const ICON_SIZE = 26

const Header = ({ title, titleOpacity = 1 }: Props) => {
  const { goBack } = useNavigation()
  const { styles, theme } = useStyles(stylesheet)
  const { increaseFontScale, decreaseFontScale } = useFont()

  return (
    <View style={styles.container}>
      <BorderlessButton style={styles.backButton} onPress={goBack}>
        <MaterialIcons
          name="arrow-back"
          size={ICON_SIZE}
          color={theme.colors.primary}
        />
      </BorderlessButton>

      {!!title && (
        <Animated.Text
          style={{
            ...styles.animatedTitle,
            opacity: titleOpacity,
            fontSize: title.length > 20 ? 18 : 22
          }}
        >
          {title}
        </Animated.Text>
      )}

      <View style={styles.fontScaleWrapper}>
        <BorderlessButton
          style={styles.fontScaleButton}
          onPress={decreaseFontScale}
        >
          <MaterialIcons
            name="text-decrease"
            size={ICON_SIZE}
            color={theme.colors.primary}
          />
        </BorderlessButton>
        <BorderlessButton
          style={styles.fontScaleButton}
          onPress={increaseFontScale}
        >
          <MaterialIcons
            name="text-increase"
            size={ICON_SIZE}
            color={theme.colors.primary}
          />
        </BorderlessButton>
      </View>
    </View>
  )
}

export default Header
