import React, { ReactNode } from 'react'
import { Modal, ModalProps } from 'react-native'

type Props = ModalProps & {
  children: ReactNode
}

function ModalView({ children, ...rest }: Props): JSX.Element {
  return (
    <Modal transparent animationType="slide" statusBarTranslucent {...rest}>
      {children}
    </Modal>
  )
}

export default ModalView
