import React from 'react'

import BasicModal from './BasicModal'
import Button from '../FormElements/Button'

const ErrorModal = (props) => {
  return (
    <BasicModal onCancel={props.onClear} header='An Error Occurred!' show={!!props.error} footer={<Button onClick={props.onClear}>Okay</Button>}>
      <p>{props.error}</p>
    </BasicModal>
  )
}

export default ErrorModal
