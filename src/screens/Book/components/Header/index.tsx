import React from 'react'
import { Animated } from 'react-native'

import HeaderApp from '@/components/Header'

type HeaderProps = {
  bookName: string
  translateY: Animated.AnimatedInterpolation<string | number>
  titleOpacity: Animated.AnimatedInterpolation<string | number>
}

const Header = ({ bookName, translateY, titleOpacity }: HeaderProps) => {
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
