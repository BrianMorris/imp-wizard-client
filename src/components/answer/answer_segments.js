import React from 'react';
import { Label, Segment, Button, Header } from 'semantic-ui-react';
import ImportfieldLinkForm from "../import/importfield/importfield_link_form";
import Importfield from "../import/importfield/importfield";
import Answer from "../answer/answer";
import { AnswerUpdateForm } from "../answer/answer_update_form";
import { DeleteButton } from "../../helpers/delete_button.js";
import { API } from '../../service/api';
import { errorHandler } from '../../service/errorHandler';
import * as Constants from "../../helpers/constants";

export class AnswerSegments extends React.Component {

  deleteAnswer = (e, answer_id) => {
    e.stopPropagation();
    API.Answer.delete(answer_id).then(
      result => {
        this.props.reset();
      },
      error => {
        errorHandler(error);
      }
    );
  }

  render() {
    const answerSegment =  this.props.answers.map((answer, index) => {
        const answerimportfields = answer.answerimportfields;
        const importfieldSegment = (this.props.focus_constant === Constants.IMPORTFIELD && this.props.focus_id === answer.id) ?
          <ImportfieldLinkForm 
            answerimportfields={answerimportfields}
            handleImportfieldUnlink={(importfield_id) => this.props.handleImportfieldUnlink(answer.id, importfield_id, index)}
            handleImportfieldLink={(importfield_id) => this.props.handleImportfieldLink(answer.id, importfield_id)}
          />
        :
          <Importfield  changeFocus={(item_constant, item_id) => this.props.changeFocus(item_constant, item_id)}
            answerimportfields={answerimportfields}
            answer_id={answer.id}
          />
        ;

          let linkedChildButtonGroup = null;
        if(answer.child_questions.length) {
          let linkedChildButtons = answer.child_questions.map((child_question, index) => {
            return(
              <Label style={{'cursor':'pointer'}} as='button' circular color='blue' key={child_question.id} size='mini' onClick={(e) => this.props.handleQuestionNavigation(e, child_question.id)}> {child_question.id}</Label >
            );
          });

          linkedChildButtonGroup =  
            // <Button.Group floated='right'>
            // <React.Fragment floated='right'>

             <Button.Group floated='right'>
                <Label color='black'>Linked Children:</Label>
                {linkedChildButtons}
             </Button.Group>;
            // </React.Fragment>
        }

        return (
          <Segment key={answer.id} onClick={() => this.props.changeFocus(Constants.ANSWER, answer.id)}>
            <Header>Answer: <DeleteButton id={answer.id} hasChildren={answer.child_questions.length > 0} delete={this.deleteAnswer} /></Header>
            {linkedChildButtonGroup}
            {this.props.focus_constant === Constants.ANSWER && this.props.focus_id === answer.id ? 
              <AnswerUpdateForm 
                answer={answer} 
                reset={this.props.reset}
              >
                {importfieldSegment}
              </AnswerUpdateForm>
              :
              <Answer 
                key={answer.id} 
                answer={answer} 
              >
              {importfieldSegment}
              </Answer>
            }
        </Segment>
      );
    });

    return (
      answerSegment
    )
  }
}