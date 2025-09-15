import React from 'react'
import { useWindowDimensions } from 'react-native'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'
import { useStyles } from 'react-native-unistyles'

import DrawerNavigation from '../DrawerNavigation'

type DrawerProps = {
  children: React.ReactNode
  drawerRef: React.RefObject<DrawerLayout>
  chaptersNumber: number[]
  handleScrollToIndex: (index: number) => void
}

const Drawer = ({
  handleScrollToIndex,
  children,
  drawerRef,
  chaptersNumber
}: DrawerProps) => {
  const window = useWindowDimensions()
  const { theme } = useStyles()

  return (
    <DrawerLayout
      ref={drawerRef}
      drawerWidth={40}
      edgeWidth={window.width}
      drawerPosition="right"
      drawerType="slide"
      overlayColor="transparent"
      drawerBackgroundColor={theme.colors.background}
      renderNavigationView={() => (
        <DrawerNavigation
          chaptersNumber={chaptersNumber}
          handleScroll={handleScrollToIndex}
        />
      )}
      useNativeAnimations={false}
    >
      {children}
    </DrawerLayout>
  )
}

export default Drawer
