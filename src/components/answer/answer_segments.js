import React from 'react';
import { Segment, Button, Header } from 'semantic-ui-react';
import ImportfieldLinkForm from "../import/importfield/importfield_link_form";
import Importfield from "../import/importfield/importfield";
import Answer from "../answer/answer";
import { AnswerUpdateForm } from "../answer/answer_update_form";
import { DeleteButton } from "../../helpers/delete_button.js";
import API from '../../service/api';
import * as Constants from "../../helpers/constants";

export class AnswerSegments extends React.Component {

  deleteAnswer = (e, answer_id) => {
    e.stopPropagation();
    API.Answer.delete(answer_id).then(
      result => {
        this.props.reset();
      },
      error => {
        console.log('handle erorr', error);
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

          let linkedChildButtons = [];
        if(answer.child_questions.length) {
          linkedChildButtons = answer.child_questions.map((child_question, index) => {
            return(
              <Button key={child_question.id} size='tiny' onClick={(e) => this.props.handleQuestionNavigation(e, child_question.id)}>Question id: {child_question.id}</Button>
            );
          });
        }
        console.log('answ', answer)
        return (
          <Segment key={answer.id} onClick={() => this.props.changeFocus(Constants.ANSWER, answer.id)}>
            <Header>Answer: <DeleteButton id={answer.id} hasChildren={answer.child_questions.length > 0} delete={this.deleteAnswer} /></Header>
            <Button.Group floated='right'>
              {linkedChildButtons}
            </Button.Group>
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