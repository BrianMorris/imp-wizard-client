import React from 'react';
import { Form, Header, Segment } from "semantic-ui-react";

const ImporttypeForm = ({onSubmit, onChange, typeName, typeDescription}) => {
  return (
    <Segment raised color='black'>
      <Form name='importtype' onClick={(e) => e.stopPropagation()} onSubmit={onSubmit}>
        <Header size="tiny" textAlign='center'>Add Import Type</Header>
        <Form.Group width='16'>
          <Form.Input width='4' placeholder='Name' onChange={onChange} name='typeName' value={typeName} />
          <Form.Input width='10' placeholder='Description' onChange={onChange} name='typeDescription' value={typeDescription} />
          <Form.Button  disabled={!typeName && !typeDescription} primary> Submit</Form.Button>
        </Form.Group>
      </Form>
    </Segment>
  );
}

export default ImporttypeForm;