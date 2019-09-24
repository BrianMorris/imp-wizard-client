import React from "react";
import Question from "./question";
import {Form, Header, Segment, Loader, Dimmer } from "semantic-ui-react";
import { navigate } from "@reach/router";
import API from "../../service/api";

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      questions: null,
      filter:null
    };
  }
  
  componentDidMount() {
    this.loadQuestions();
    this.timer = null;
  }
  
  componentDidUpdate(prevProp) {
    if (this.props.questionId !== prevProp.questionId) {
      this.loadQuestions();
    }
  }

  loadQuestions(data = {}) {
    this.setState({ isLoaded: false });
    API.Question.get(data).then(
      result => {
        this.setState({
          questions: result,
          isLoaded: true
        });
      },
      error => {
        this.setState({
          error: error,
          isLoaded: true
        });
      }
    );
  }

  editQuestion(e) {
    navigate("/questionmanager/1");
  }

  handleChange = (e) => {
    // handle input filter delay
    clearTimeout(this.timer);

    const {name, value} = e.target;
    this.setState({
      [name]:value
    }, (e) => {this.timer = setTimeout(() => {
      this.loadQuestions({'filter' : this.state.filter})
      }, 300)
  });
    
  }

  handleSubmit = (e) => {
    const data = {
      "filter": this.state.searchText
    }
    this.loadQuestions(data);
  }

  composeQuestionComponent() {
    let questions = null;
    if(this.state.questions) {
      let group = null;
      let parent_count = 0;

      questions = this.state.questions.map((question) => {
        question.parent_answer_id ? parent_count++ : parent_count = 0; 

        let groupHeader = null;
        if(group !== question.group.name) {
          group = question.group.name;
          groupHeader = <Segment inverted><Header size="small">{question.group.name}</Header></Segment>;
        }
        return (
          <React.Fragment key={question.id}>
            {groupHeader}
            <Segment style={{"marginLeft": parent_count * 50}} onClick={(e) => this.editQuestion(e)} >
              <Question  question={question} hide_group={true}/>
            </Segment>
          </React.Fragment>
          );
        });
    }
    return questions;
  }

  render() {
    // conditional rendering
    const questions = this.composeQuestionComponent();

    return (
      <React.Fragment>
        <Header textAlign="center">Questions</Header>
        <Form>
          <Form.Input name="filter" icon='search'  placeholder='Search...' value={this.state.search} onChange={this.handleChange} />
        </Form>

              {this.state.isLoaded  ? (
                questions
              ) : (
                <Segment style={{ minHeight: 125 }}>
                  <Dimmer active inverted>
                    <Loader inverted />
                  </Dimmer>
                </Segment>
              )}
      </React.Fragment>
    );
  }
}

export default Questions;