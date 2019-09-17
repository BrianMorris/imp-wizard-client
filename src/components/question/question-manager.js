import React from "react";
import { Loader, Dimmer, Button, Label, Rail, Segment, Header } from "semantic-ui-react";
import Question from "./question";
import QuestionForm from "./question-form";
import Answer from "../answer/answer";
import AnswerForm from "../answer/answer-form";
import * as Constants from "../../helpers/constants";
import API from "../../service/api";
import Importfield from "../importfield/importfield";
import ImportfieldForm from "../importfield/importfield-form";

class QuestionManager extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded:false,
      focus_constant: null,
      focus_id:null, 
      questionDetails: {}
    }
    
    this.getQuestionDetails.bind(this);
    this.changeFocus.bind(this);
  }

  componentDidMount() {
    this.getQuestionDetails(this.props.id);
  }
  
  getQuestionDetails(question_id) {
    API.Question.getDetail(question_id).then(
      result => {
        this.setState({
          isLoaded: true,
          questionDetails: result
        });
      },
      error => {
        this.setState({
          isLoaded: true
        });
      }); }
  
  changeFocus(item_constant, item_id) {
    // added extra field to correctly show multiple answer and importfield detail
    if(this.state.focus_constant !== item_constant || this.state.focus_id !== item_id) {
      this.setState({
        focus_constant : item_constant,
        focus_id : item_id
      })
    }
  }

  handleInputfieldUnlink(answer_id, importfield_id, answerIndex) {
    API.Importfield.unlinkImportfield(answer_id, importfield_id).then(
      result => {
        // rerender my answer import fields using state. 
        this.renderAnswerImportfields(importfield_id, answerIndex);
      },
      error => {
        console.log('err', error);
      }
    );
  }

  handleImportfieldLink = (answer_id, importfield_id) => {
    // post field and rerender
    API.Importfield.linkImportfield(answer_id, importfield_id).then(
      result => {
        this.getQuestionDetails(this.props.id);
      },
      error => {
        console.log('er', error);
      }
    )
     }

  renderAnswerImportfields(importfield_id, answerIndex) {
        const questionDetails = {...this.state.questionDetails};
        const newImportfields = questionDetails.answers[answerIndex].answerimportfields.filter((answerimportfield) => answerimportfield.importfield_id !== importfield_id);
        questionDetails.answers[answerIndex].answerimportfields = newImportfields;
        this.setState({
          questionDetails: questionDetails
        });
  }

  render() {
    let answers = [];

    if(this.state.questionDetails.answers) {
      answers = this.state.questionDetails.answers;
    }
    // const arrAnswers = question.answers;
    
    const questionSegment = (
      <Segment onClick={() => this.changeFocus(Constants.QUESTION)}>
        <Header>Question:</Header>
        {this.state.focus_constant === Constants.QUESTION ? <QuestionForm question={this.state.questionDetails} /> : <Question question={this.state.questionDetails} />}
      </Segment>
    );
    
    const answerSegments = answers.map((answer, index) => {
      const answerimportfields = answer.answerimportfields;
      const importfieldSegment = (this.state.focus_constant === Constants.IMPORTFIELD && this.state.focus_id === answer.id) ?
        <ImportfieldForm 
          answerimportfields={answerimportfields}
          handleImportfieldUnlink={(importfield_id) => this.handleInputfieldUnlink(answer.id, importfield_id, index)}
          handleImportfieldLink={(importfield_id) => this.handleImportfieldLink(answer.id, importfield_id)}
        />
      :
        <Importfield  handleClick={(x,i) => this.changeFocus(x,i)}
          answerimportfields={answerimportfields}
          answer_id={answer.id}
        />
      ;

      return (
        <Segment key={answer.id} onClick={() => this.changeFocus(Constants.ANSWER, answer.id)}>
          <Header>Answer:</Header>
          <Button floated="right">Hi</Button>
          {this.state.focus_constant === Constants.ANSWER && this.state.focus_id === answer.id ? 
            <AnswerForm 
              answer={answer} 
            >
              {importfieldSegment}
            </AnswerForm>
            :
            <Answer 
              key={answer.id} 
              answer={answer} 
            >
            {importfieldSegment}
            </Answer>
          }
        </Segment>
      )
    });

    return (
      <React.Fragment>
        <Rail id="rail" position='right'>
          <Segment><Label color='blue'>!</Label> Click on a Module to expand</Segment>
        </Rail>

        {this.state.isLoaded ? (
        questionSegment
        ):
        <Segment style={{ minHeight: 125 }}>
            <Dimmer active inverted>
              <Loader inverted />
            </Dimmer>
          </Segment>

      }
      {answerSegments}
      </React.Fragment>
    );
  }
}

export default QuestionManager;