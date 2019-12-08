import React from 'react';
import { LOADING_IMG } from '../_constants';

const Message = (props) => {
  return (
    props.message ?
      <p>{props.message}</p> :
      props.isPlaying ?
        <p>Your turn:</p> :
        <p>Waiting for opponent turn <img src={LOADING_IMG} /></p>
  );
};

export default Message;
