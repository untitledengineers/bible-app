import AsyncStorage from '@react-native-async-storage/async-storage'
import Checkbox from 'expo-checkbox'
import React, { useState } from 'react'
import { Image, Text, View } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'
import { useStyles } from 'react-native-unistyles'

import { stylesheet } from './styles'
import { ChapterImg, ChapterMenuImg } from '../../assets/images'

import { reset } from '@/utils/navigation'

function Onboard() {
  const [pageIndexCallback, setPageIndexCallback] = useState(0)
  const [isChecked, setChecked] = useState(false)
  const { styles, theme } = useStyles(stylesheet)

  const onDone = () => {
    if (isChecked) {
      AsyncStorage.setItem('@hasOnboarded', 'true')
    }

    reset('Home')
  }

  return (
    <>
      <Onboarding
        onDone={onDone}
        pages={[
          {
            backgroundColor: theme.colors.background,
            image: (
              <Image
                source={ChapterImg}
                style={styles.image}
                resizeMode="contain"
              />
            ),
            title: 'Início',
            subtitle:
              'Em qualquer livro, arraste para a esquerda para acessar seus capítulos.'
          },
          {
            backgroundColor: theme.colors.background,
            image: (
              <Image
                source={ChapterMenuImg}
                style={styles.image}
                resizeMode="contain"
              />
            ),
            title: 'Livro',
            subtitle:
              'Na tela de livro, arraste para a esquerda para acessar a lista de capítulos.'
          }
        ]}
        nextLabel="Próximo"
        bottomBarColor={theme.colors.background}
        showSkip={false}
        pageIndexCallback={setPageIndexCallback}
      />
      {pageIndexCallback === 1 && (
        <View style={styles.notShowAgainWrapper}>
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? theme.colors.secondary : undefined}
            style={{ borderColor: theme.colors.primary }}
          />
          <Text
            style={styles.notShowAgainText}
            onPress={() => setChecked(!isChecked)}
          >
            Não mostrar novamente
          </Text>
        </View>
      )}
    </>
  )
}

export default Onboard
