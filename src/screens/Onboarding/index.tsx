import React, { useState } from 'react'
import Onboarding from 'react-native-onboarding-swiper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import Checkbox from 'expo-checkbox'

import { ChapterImg, ChapterMenuImg, MenuImg } from '../../assets/images'

import * as S from './styles'

function Onboard() {
  const [pageIndexCallback, setPageIndexCallback] = useState(0)
  const [isChecked, setChecked] = useState(false)
  const navigation = useNavigation()

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
            backgroundColor: '#fff',
            image: <S.Image source={ChapterImg} />,
            title: 'Início',
            subtitle:
              'Em qualquer livro, arraste para a esquerda para acessar seus capítulos.'
          },
          {
            backgroundColor: '#fff',
            image: <S.Image source={MenuImg} />,
            title: 'Menu Lateral',
            subtitle:
              'Em qualquer tela, arraste para a direita para abrir o menu lateral.'
          },
          {
            backgroundColor: '#fff',
            image: <S.Image source={ChapterMenuImg} />,
            title: 'Livro',
            subtitle:
              'Na tela de livro, arraste para a esquerda para acessar a lista de capítulos.'
          }
        ]}
        nextLabel="Próximo"
        bottomBarColor="#efebe4"
        showSkip={false}
        pageIndexCallback={setPageIndexCallback}
      />
      {pageIndexCallback === 2 && (
        <S.NotShowAgainWrapper>
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? '#cabca4' : undefined}
            style={{ borderColor: '#000000' }}
          />
          <S.NotShowAgainText>Não mostrar novamente</S.NotShowAgainText>
        </S.NotShowAgainWrapper>
      )}
    </>
  )
}

export default Onboard
