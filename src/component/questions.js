import React from "react";
import Question from "./question";
import { Header, Grid, Segment, Loader, Dimmer } from "semantic-ui-react";
import { navigate } from "@reach/router";
import API from "../service/api";

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      questions: null
    };
  }
  
  componentDidMount() {
    this.loadQuestions();
  }
  
  componentDidUpdate(prevProp) {
    console.log('some p', this.props);
    if (this.props.questionId !== prevProp.questionId) {
      this.loadQuestions();
    }
  }

  loadQuestions() {
    this.setState({ isLoaded: false });
    API.Question.get().then(
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
    console.log('ev', e);
    navigate("/questionmanager/1");
  }

  render() {
    let questions = null;
    if(this.state.questions) {
      questions = this.state.questions.map((q) => {
        return (
          <Segment style={{ minHeight: 125 }} onClick={(e) => this.editQuestion(e)} >
            <Question question={q} />
          </Segment>
          );
        });
        console.log('more', questions);
        console.log('cur questions', this.state.questions);
    }

    return (
      <React.Fragment>
        <Header textAlign="center">Questions</Header>
        {/* <Grid textAlign="center" verticalAlign="top"> */}
          {/* <Grid.Column style={{ maxWidth: 600 }}> */}
              {this.state.isLoaded  ? (
                questions
              ) : (
                <Segment style={{ minHeight: 125 }}>
                  <Dimmer active inverted>
                    <Loader inverted />
                  </Dimmer>
                </Segment>
              )}
          {/* </Grid.Column> */}
        {/* </Grid> */}
      </React.Fragment>
    );
  }
}

export default Questions;