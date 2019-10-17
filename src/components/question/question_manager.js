import React from "react";
import { navigate } from "@reach/router";
import { Icon, Popup, Loader, Dimmer, Label, Rail, Segment, Header } from "semantic-ui-react";
import { Question } from "./question";
import QuestionUpdateForm from "./question_update_form";
import * as Constants from "../../helpers/constants";
import { API } from "../../service/api";
import { errorHandler } from '../../service/errorHandler';
import { NewAnswerSegment } from "../answer/answer_create_segment";
import { AnswerSegments } from "../answer/answer_segments";

export class QuestionManager extends React.Component {

  constructor(props) {
    super(props); 
    this.state = {
      isLoaded:false,
      focus_constant: null,
      focus_id:null, 
      showNewAnswerForm: false,
      questionDetails: {}
    }
    
    this.renderQuestionDetails.bind(this);
    this.changeFocus.bind(this);
  }

  componentDidMount() {
    this.renderQuestionDetails(this.props.id);
  }
  componentWillReceiveProps(oldProps) {
    // refresh when selecting child/parent questions
    this.renderQuestionDetails(oldProps.id);
  }
  
  renderQuestionDetails(question_id) {
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
        errorHandler(error);
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
        errorHandler(error);
      }
    );
  }

  handleImportfieldLink = (answer_id, importfield_id) => {
    // post field and rerender
    API.Importfield.link(answer_id, importfield_id).then(
      result => {
        this.renderQuestionDetails(this.props.id);
      },
      error => {
        errorHandler(error);
      }
    )
  }

  goBack = () => {
    navigate("/questions");
  }


  handleQuestionNavigation= (e, question_id) => {
    e.stopPropagation();
    this.props.navigate(`/questionmanager/${question_id}`);
  }

  reset = () => {
    this.renderQuestionDetails(this.props.id);
    this.changeFocus(null, null);
  }

  showNewAnswerForm = () => {
    const currentAnswerFormBool = this.state.showNewAnswerForm;
      this.setState({
        showNewAnswerForm: !currentAnswerFormBool
      });
  }
  renderAnswerImportfields(importfield_id, answerIndex) {
      // this results in a faster update than pinging the api, and reloading the importfields
      const questionDetails = {...this.state.questionDetails};
      const newImportfields = questionDetails.answers[answerIndex].answerimportfields.filter((answerimportfield) => answerimportfield.importfield_id !== importfield_id);
      questionDetails.answers[answerIndex].answerimportfields = newImportfields;
      this.setState({questionDetails});
  }

  render() {
    const questionSegment = (
      <Segment onClick={() => this.changeFocus(Constants.QUESTION)}>
        <Header>Question:</Header>
        {this.state.focus_constant === Constants.QUESTION ?
          <QuestionUpdateForm 
              question={this.state.questionDetails}
              reset={this.reset}
          /> :
          <Question 
            question={this.state.questionDetails} 
          />
        }
      </Segment>
    );
 
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
      <AnswerSegments
        answers={this.state.questionDetails.answers || []}
        focus_constant={this.state.focus_constant}
        focus_id={this.state.focus_id}
        handleImportfieldUnlink={(answer_id, importfield_id, index) => this.handleImportfieldUnlink(answer_id, importfield_id, index)}
        handleImportfieldLink={(answer_id, importfield_id) => this.handleImportfieldLink(answer_id, importfield_id)}
        handleQuestionNavigation={(e, child_question_id) => this.handleQuestionNavigation(e, child_question_id)}
        reset={this.reset}
        changeFocus={(item_constant, item_id) => this.changeFocus(item_constant, item_id)}
        deleteAnswer={this.deleteAnswer}
      />
      <NewAnswerSegment 
          showNewAnswerForm={this.state.showNewAnswerForm}
          onClick={this.showNewAnswerForm}
          reset={this.reset}
          question_id={this.state.questionDetails.id}
      /> 
      </React.Fragment>
    );
  }
}
