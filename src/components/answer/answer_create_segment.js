import React from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';
import { AnswerCreateForm } from './answer_create_form';

export const NewAnswerSegment = (props) => {
  return(
    <Segment>
        {props.showNewAnswerForm ? 
          <AnswerCreateForm reset={props.reset} question_id={props.question_id}/>
        :
        <React.Fragment >
          <Header onClick={props.onClick}>
            <Icon inverted id='plusIconButton'  circular size='large' name='plus'/>
            Create a new answer?
          </Header>
        </React.Fragment>
        }
    </Segment>
  );
}

