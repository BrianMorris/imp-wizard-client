import React from 'react';
import { Form, Header, Segment } from "semantic-ui-react";

const ImportfieldForm = ({onSubmit, onChange, fieldName, fieldDescription}) => {
  return (
    <Segment raised color='black'>
      <Form name='importfield' onClick={(e) => e.stopPropagation()} onSubmit={onSubmit}>
        <Header size="tiny" textAlign='center'>Add Import Field</Header>
        <Form.Group width='16'>
          <Form.Input width='3' placeholder='Name' onChange={onChange} name='fieldName' value={fieldName} />
          <Form.Input width='10' placeholder='Description' onChange={onChange} name='fieldDescription' value={fieldDescription} />
          <Form.Button width='2'  disabled={!fieldName && !fieldDescription} primary> Submit</Form.Button>
        </Form.Group>
      </Form>
    </Segment>

    );
}

export default ImportfieldForm;