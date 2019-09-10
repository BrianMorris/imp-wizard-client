import React from "react";
import {Label, Rail, Segment, Header } from "semantic-ui-react";
import Question from "./question";
import QuestionDetail from "./question-detail";
import Answer from "./answer";
import * as Constants from "../helpers/constants";

class QuestionManager extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      focus_id: null 
    }

    this.getAnswerImportfields.bind(this);
    this.getQuestion.bind(this);
    this.changeFocus.bind(this);
  }
  
  getQuestion() {
    const question = {
      "id": 1,
      "name": "Do you want to import parts?",
      "description": "Manages part related import.",
      "parent_answer_id": null,
      "group_id": 1,
      "multiple": 0,
      "sort_order": 1,
      "active": 1,
      "created_at": "2019-09-04 20:05:59",
      "updated_at": "2019-09-04 20:05:59",
      "has_children": 1,
      "answers": [
        {
          "id": 1,
          "question_id": 1,
          "sort_order": 1,
          "name": "Yes",
          "description": null,
          "created_at": "2019-09-04 20:05:59",
          "updated_at": "2019-09-04 20:05:59",
          "implementation_answers": [
            {
            "id": 24,
            "implementation_id": 1,
            "answer_id": 1
            }
          ]
        },
        {
        "id": 2,
        "question_id": 1,
        "sort_order": 2,
        "name": "No",
        "description": null,
        "created_at": "2019-09-04 20:05:59", "updated_at": "2019-09-04 20:05:59",
        "implementation_answers": []
        }
      ],
      "group": {
        "id": 2,
        "name": "Customers",
        "description": "Group for all customer related questions",
        "active": 1
      }
    }

    return question;
  }

  getAnswerImportfields(id) {
    console.log('anser id', id);
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

  changeFocus(id) {
    console.log('changing focus', id);
    if(this.state.focus_id !== id) {
      console.log('calling cahnge', id);
      this.setState({
        focus_id : id
      })
    }
  }

  render() {

    const question = this.getQuestion(this.props.id);
    let arrAnswers = question.answers;
    
    let answers = arrAnswers.map((answer) => {
      return (
        <Segment onClick={() => this.changeFocus(Constants.ANSWER)}>
          <Header>Answer:</Header>
          {this.state.focus_id === Constants.ANSWER ? <p>Answer Detail</p> : null}
          <Answer handleClick={(e) => this.ChangeFocus(e)} answer={answer} getAnswerImportfields={() => this.getAnswerImportfields(answer.id)} />
        </Segment>
      )
    });

    return (
      <React.Fragment>
        <Rail id="rail" position='lower right'>
          <Segment><Label color='blue'>!</Label> Click on a Module to expand</Segment>
        </Rail>
        <Segment onClick={() => this.changeFocus(Constants.QUESTION)}>
          <Header>Question:</Header>
          {this.state.focus_id === Constants.QUESTION ? <QuestionDetail question={question} /> : <Question question={question} />}
        </Segment>
        {answers}
        {/* <Segment onClick={() => this.changeFocus(IMPORTFIELD)}>
        <Header>Links</Header>
        {this.state.focus_id === IMPORTFIELD ? <p>Links Detail </p> : null}
        </Segment> */}
      </React.Fragment>
    );
  }
}

export default QuestionManager;