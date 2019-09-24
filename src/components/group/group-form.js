import React from 'react';
import { Form, Header, Segment } from "semantic-ui-react";

const GroupForm= ({onSubmit, onChange, name, description}) => {
  return (
    <Segment raised color='black'>
      <Form name='group' onClick={(e) => e.stopPropagation()} onSubmit={onSubmit}>
        <Header size="tiny" textAlign='center'>Add Group</Header>
        <Form.Group width='16'>
          <Form.Input width='4' placeholder='Name' onChange={onChange} name='name' value={name} />
          <Form.Input width='10' placeholder='Description' onChange={onChange} name='description' value={description} />
          <Form.Button  disabled={!name && !description} primary> Submit</Form.Button>
        </Form.Group>
      </Form>
    </Segment>
  );
}

export default GroupForm;