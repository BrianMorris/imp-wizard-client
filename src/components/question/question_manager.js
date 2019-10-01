import React from "react";
import { navigate } from "@reach/router";
import { Icon, Popup, Loader, Dimmer, Button, Label, Rail, Segment, Header } from "semantic-ui-react";
import Question from "./question";
import QuestionForm from "./question_update_form";
import Answer from "../answer/answer";
import {AnswerUpdateForm} from "../answer/answer_update_form";
import {AnswerCreateForm} from "../answer/answer_create_form";
import * as Constants from "../../helpers/constants";
import API from "../../service/api";
import Importfield from "../import/importfield/importfield";
import ImportfieldLinkForm from "../import/importfield/importfield_link_form";

class QuestionManager extends React.Component {

  constructor(props) {
    super(props); 
    this.state = {
      isLoaded:false,
      focus_constant: null,
      focus_id:null, 
      showNewAnswerForm: false,
      questionDetails: {}
    }
    
    console.log('this.props', this.props);
    this.getQuestionDetails.bind(this);
    this.changeFocus.bind(this);
  }

  componentDidMount() {
    this.getQuestionDetails(this.props.id);
  }
  componentWillReceiveProps(oldProps) {
    // refresh when selecting child/parent questions
    this.getQuestionDetails(oldProps.id);
  }
  
  getQuestionDetails(question_id) {
    API.Question.getDetail(question_id).then(
      result => {
        this.setState({
          isLoaded: true,
          questionDetails: result,
          showNewAnswerForm: false
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
        focus_id : item_id,
        showNewAnswerForm: false
      })
    }
  }

  handleImportfieldUnlink(answer_id, importfield_id, answerIndex) {
    API.Importfield.unlink(answer_id, importfield_id).then(
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
    API.Importfield.link(answer_id, importfield_id).then(
      result => {
        this.getQuestionDetails(this.props.id);
      },
      error => {
        console.log('er', error);
      }
    )
  }

  goBack = () => {
    navigate("/questions");
  }


  handleClick = (e, question_id) => {
    e.stopPropagation();
    this.props.navigate(`/questionmanager/${question_id}`);

  }

  resetAfterSubmision = () => {
    this.getQuestionDetails(this.props.id);
    this.changeFocus(null, null);
  }

  showNewAnswerForm = () => {
    const currentAnswerFormBool = this.state.showNewAnswerForm;
      this.setState({
        showNewAnswerForm: !currentAnswerFormBool
      });
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
        {this.state.focus_constant === Constants.QUESTION ?
          <QuestionForm 
              question={this.state.questionDetails}
              reset={this.resetAfterSubmision}
          /> :
          <Question 
            question={this.state.questionDetails} 
          />
        }
      </Segment>
    );
    
    const answerSegments = answers.map((answer, index) => {
    const answerimportfields = answer.answerimportfields;
    const importfieldSegment = (this.state.focus_constant === Constants.IMPORTFIELD && this.state.focus_id === answer.id) ?
      <ImportfieldLinkForm 
        answerimportfields={answerimportfields}
        handleImportfieldUnlink={(importfield_id) => this.handleImportfieldUnlink(answer.id, importfield_id, index)}
        handleImportfieldLink={(importfield_id) => this.handleImportfieldLink(answer.id, importfield_id)}
      />
    :
      <Importfield  handleClick={(item_constant, item_id) => this.changeFocus(item_constant, item_id)}
        answerimportfields={answerimportfields}
        answer_id={answer.id}
      />
    ;

       let parentAnswerButtons = [];
    if(answer.child_questions.length) {
      parentAnswerButtons  = answer.child_questions.map((child_question, index) => {
        return(
          <Button key={child_question.id} size='tiny' onClick={(e) => this.handleClick(e, child_question.id)}>Question id: {child_question.id}</Button>
        );
      });
    }

      return (
        <Segment key={answer.id} onClick={() => this.changeFocus(Constants.ANSWER, answer.id)}>
          <Header>Answer:</Header>
          <Button.Group floated='right'>
            {parentAnswerButtons}
          </Button.Group>
          {this.state.focus_constant === Constants.ANSWER && this.state.focus_id === answer.id ? 
            <AnswerUpdateForm 
              answer={answer} 
              reset={this.resetAfterSubmision}
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
      )
    });
 
  let newAnswerSegment =
  <Segment>
      {this.state.showNewAnswerForm ? 
      <AnswerCreateForm reset={this.resetAfterSubmision} question_id={this.state.questionDetails.id}/>
      :
      <React.Fragment >
        <Header onClick={this.showNewAnswerForm}>
          <Icon inverted id='plusIconButton'  circular size='large' name='plus'/>
          Create a new answer?
        </Header>
      </React.Fragment>
      }
    </Segment>



    return (
      <React.Fragment>
        <Rail id="rail" position='right'>
          <Segment><Label color='blue'>!</Label> Click on a Module to expand</Segment>
        </Rail>
        <Popup 
          className='popup'
          inverted
          content='back'
          trigger={<Icon id='backButton' onClick={this.goBack} style={{cursor:'pointer'}} size='large' name='arrow circle left' />}
        />
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
      {newAnswerSegment}
      </React.Fragment>
    );
  }
}

export default QuestionManager;