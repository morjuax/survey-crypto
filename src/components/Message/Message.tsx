import './Message.scss';
import { Fragment, SyntheticEvent, useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import MessageInterface from '../../interfaces/Message.interface';
import { Snackbar } from '@material-ui/core';

export default function Message({type, text, show}: MessageInterface) {
  const [open, setOpen] = useState(false);
  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    setOpen( false);
  };

  if (!show) return <Fragment/>
  return (
    <Fragment>
      <Snackbar open={show} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity={type} >{text}</Alert>
      </Snackbar>
    </Fragment>
  )
}