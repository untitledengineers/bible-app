import React from 'react'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'
import { useStyles } from 'react-native-unistyles'

import { useBookController } from '../../useBookController'
import DrawerNavigation from '../DrawerNavigation'

type DrawerProps = {
  children: React.ReactNode
  drawerRef: React.RefObject<DrawerLayout>
  handleScrollToIndex: (index: number) => void
}

const Drawer = ({ handleScrollToIndex, children, drawerRef }: DrawerProps) => {
  const { window } = useBookController()
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
        <DrawerNavigation handleScroll={handleScrollToIndex} />
      )}
      useNativeAnimations={false}
    >
      {children}
    </DrawerLayout>
  )
}

export default Drawer
