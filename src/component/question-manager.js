import React from "react";
import { Loader, Dimmer, Button, Label, Rail, Segment, Header } from "semantic-ui-react";
import Question from "./question";
import QuestionForm from "./question-form";
import Answer from "./answer";
import AnswerForm from "./answer-form";
import * as Constants from "../helpers/constants";
import API from "../service/api";
import Importfield from "./importfield";
import ImportfieldForm from "./importfield-form";

class QuestionManager extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded:false,
      focus_constant: null,
      focus_id:null, 
      questionDetails: {}
    }
    
    this.getAnswerImportfields.bind(this);
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
      }
    );
  }

  getAnswerImportfields(id) {
    let answer = null; 
    if(id === 1) {
      answer = {
        "id": 3,
        "question_id": 2,
        "sort_order": 1,
        "name": "Yes",
        "description": null,
        "created_at": "2019-09-04 20:05:59",
        "updated_at": "2019-09-04 20:05:59",
        "answerimportfields": [
          {
            "id": 2,
            "answer_id": 3,
            "importfield_id": 15,
            "importfield": {
              "id": 15,
              "importtype_id": 3,
              "name": "Weight",
              "description": null,
              "default_field": 0
            }
          },
          {
            "id": 3,
            "answer_id": 3,
            "importfield_id": 11,
            "importfield": {
              "id": 11,
              "importtype_id": 3,
              "name": "Weight UOM",
              "description": null,
              "default_field": 0
            }
          }
        ]
      };
    }

    return answer;
  }

  changeFocus(item_constant, item_id) {
    // added extra field to correctly show multiple answer and importfield detail
    if(this.state.focus_constant !== item_constant || this.state.focus_id !== item_id) {
      console.log('setting sate');
      this.setState({
        focus_constant : item_constant,
        focus_id : item_id
      })
    }
  }

  render() {
    console.log('deats', this.state.questionDetails);
    let answers = [];
    let group = null;

    if(this.state.questionDetails.answers) {
      console.log('here');
      answers = this.state.questionDetails.answers;
    }
    // const arrAnswers = question.answers;
    
    const questionSegment = (
      <Segment onClick={() => this.changeFocus(Constants.QUESTION)}>
        <Header>Question:</Header>
        {this.state.focus_constant === Constants.QUESTION ? <QuestionForm question={this.state.questionDetails} /> : <Question question={this.state.questionDetails} />}
      </Segment>
    );
    
    const answerSegments = answers.map((answer) => {
      const answerimportfields = answer.answerimportfields;
      const importfieldSegment = (this.state.focus_constant === Constants.IMPORTFIELD && this.state.focus_id === answer.id) ?
      <ImportfieldForm />
      : 
      <Importfield  handleClick={(x,i) => this.changeFocus(x,i)}
        answerimportfields={answerimportfields}
        answer_id={answer.id}
      />

      return (
        <Segment onClick={() => this.changeFocus(Constants.ANSWER, answer.id)}>
          <Header>Answer:</Header>
          <Button floated="right">Hi</Button>
          {this.state.focus_constant === Constants.ANSWER && this.state.focus_id === answer.id ? 
          <AnswerForm 
            key={answer.id} 
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