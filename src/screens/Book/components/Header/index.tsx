import React from 'react'
import { Animated } from 'react-native'

import { AnimatedHeader } from './styles'
import { useBookController } from '../../useBookController'

import HeaderApp from '@/components/Header'

type HeaderProps = {
  translateY: Animated.AnimatedInterpolation<string | number>
  titleOpacity: Animated.AnimatedInterpolation<string | number>
}

const Header = ({ translateY, titleOpacity }: HeaderProps) => {
  const { bookName } = useBookController()

  return (
    <AnimatedHeader
      style={{
        transform: [{ translateY }]
      }}
    >
      <HeaderApp titleOpacity={titleOpacity} title={bookName} />
    </AnimatedHeader>
  )
}

export default Header