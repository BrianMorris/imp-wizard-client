import React from 'react';
import { Popup, Icon } from 'semantic-ui-react';

export const DeleteButton = (props) => {
  const disabled = !!props.hasChildren; 
  const content = disabled ? 'Child questions are present' : 'Delete';
  return(
    <Popup 
      className='popup' 
      inverted 
      content={content} 
      trigger={
        <Icon 
          onClick={(e) => props.delete(e, props.id)} 
          disabled={disabled} 
          className='deleteButton' 
          name='delete' 
          color='red'
        />
      }
    />
  );
}