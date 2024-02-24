import React, { useState } from 'react'
import Onboarding from 'react-native-onboarding-swiper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import Checkbox from 'expo-checkbox'

import { ChapterImg, ChapterMenuImg } from '../../assets/images'
import { useTheme } from '../../context/theme'

import * as S from './styles'

function Onboard() {
  const [pageIndexCallback, setPageIndexCallback] = useState(0)
  const [isChecked, setChecked] = useState(false)
  const navigation = useNavigation()
  const { theme } = useTheme()

  const onDone = () => {
    if (isChecked) {
      AsyncStorage.setItem('@hasOnboarded', 'true')
    }

    navigation.navigate('Home')
  }

  return (
    <>
      <Onboarding
        onDone={onDone}
        pages={[
          {
            backgroundColor: theme.colors.background,
            image: <S.Image source={ChapterImg} />,
            title: 'Início',
            subtitle:
              'Em qualquer livro, arraste para a esquerda para acessar seus capítulos.'
          },
          {
            backgroundColor: theme.colors.background,
            image: <S.Image source={ChapterMenuImg} />,
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
        <S.NotShowAgainWrapper>
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? theme.colors.secondary : undefined}
            style={{ borderColor: theme.colors.primary }}
          />
          <S.NotShowAgainText onPress={() => setChecked(!isChecked)}>
            Não mostrar novamente
          </S.NotShowAgainText>
        </S.NotShowAgainWrapper>
      )}
    </>
  )
}

export default Onboard
