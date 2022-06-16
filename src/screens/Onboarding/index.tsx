import React from 'react'
import Onboarding from 'react-native-onboarding-swiper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

import { ChapterImg, ChapterMenuImg, MenuImg } from '../../assets/images'

import { Image } from './styles'

function Onboard() {
  const navigation = useNavigation()

  const onDone = () => {
    AsyncStorage.setItem('@hasOnboarded', 'true')

    navigation.navigate('Home')
  }

  return (
    <Onboarding
      onDone={onDone}
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image source={ChapterImg} />,
          title: 'Início',
          subtitle:
            'Em qualquer livro, arraste para a esquerda para acessar seus capítulos.'
        },
        {
          backgroundColor: '#fff',
          image: <Image source={MenuImg} />,
          title: 'Menu Lateral',
          subtitle:
            'Em qualquer tela, arraste para a direita para abrir o menu lateral.'
        },
        {
          backgroundColor: '#fff',
          image: <Image source={ChapterMenuImg} />,
          title: 'Livro',
          subtitle:
            'Na tela de livro, arraste para a esquerda para acessar a lista de capítulos.'
        }
      ]}
      nextLabel="Próximo"
      showSkip={false}
      bottomBarColor="#efebe4"
    />
  )
}

export default Onboard
