import React from 'react'
import { Animated } from 'react-native'

import { useBookController } from '../../useBookController'

import HeaderApp from '@/components/Header'

type HeaderProps = {
  translateY: Animated.AnimatedInterpolation<string | number>
  titleOpacity: Animated.AnimatedInterpolation<string | number>
}

const Header = ({ translateY, titleOpacity }: HeaderProps) => {
  const { bookName } = useBookController()

  return (
    <Animated.View
      style={{
        zIndex: 99,
        transform: [{ translateY }]
      }}
    >
      <HeaderApp titleOpacity={titleOpacity} title={bookName} />
    </Animated.View>
  )
}

export default Header
