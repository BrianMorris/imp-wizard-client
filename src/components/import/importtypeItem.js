import React from 'react';
import { Popup, Checkbox, List } from "semantic-ui-react";

const ImporttypeItem = (props) => {
  return(
    <List.Item id={props.importtype.id} onClick={props.expandImporttype}>
      <List.Icon name={props.activeImporttype_id === props.importtype.id ? 'angle down' : 'angle right'} />
      <List.Content >
        <List.Header className='listHeader'>
        {props.importtype.name}
        </List.Header>
        <Popup 
          className='popup' 
          inverted 
          content='activate' 
          trigger={
            <Checkbox 
              onChange={() => props.handleCheckboxToggle(props.importtype.id, props.importtype.active)} 
              onClick={props.handleClick} 
              className='right floated' 
              toggle 
              checked={!!props.importtype.active} 
            />
          } 
        />
        <List.Description>{props.importtype.description}</List.Description>
        {props.children} 
      </List.Content>
    </List.Item>
  ); 
}

export default ImporttypeItem;