// import React from 'react';
// import ReactDOM from 'react-dom';
// import { CSSTransition } from 'react-transition-group';

// import Backdrop from './Backdrop';
// import './Modal.css';

// const ModalOverlay = props => {
//   const content = (
//     <div className={`modal ${props.className}`} style={props.style}>
//       <header className={`modal__header ${props.headerClass}`}>
//         <h2>{props.header}</h2>
//       </header>
//       <form
//         onSubmit={
//           props.onSubmit ? props.onSubmit : event => event.preventDefault()
//         }
//       >
//         <div className={`modal__content ${props.contentClass}`}>
//           {props.children}
//         </div>
//         <footer className={`modal__footer ${props.footerClass}`}>
//           {props.footer}
//         </footer>
//       </form>
//     </div>
//   );
//   return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
// };

// const Modal = props => {
//   return (
//     <React.Fragment>
//       {props.show && <Backdrop onClick={props.onCancel} />}
//       <CSSTransition
//         in={props.show}
//         mountOnEnter
//         unmountOnExit
//         timeout={200}
//         classNames="modal"
//       >
//         <ModalOverlay {...props} />
//       </CSSTransition>
//     </React.Fragment>
//   );
// };

// export default Modal;

import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #ffffff',
  boxShadow: 24,
  borderRadius: '4px',
  p: 4,
}

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Text in a modal
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}
