import React from "react";
import Question from "../question";
import { Grid, Segment, Loader, Dimmer } from "semantic-ui-react";
import { navigate } from "@reach/router";
import API from "../../service/api";

class GroupQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      question: {}
    };
  }

  componentDidMount() {
    this.loadQuestion();
  }

  componentDidUpdate(prevProp) {
    if (this.props.questionId !== prevProp.questionId) {
      this.loadQuestion();
    }
  }

  loadQuestion() {
    this.setState({ isLoaded: false });
    API.Question.get(this.props.questionId).then(
      result => {
        this.setState({
          question: result,
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
  routeToQuestion() {
    API.Group.getNextQuestion(this.props.groupId).then(
      result => {
        navigate(result ? `./${result.id}` : "/");
      },
      error => {
        this.setState({
          error: error
        });
      }
    );
  }

  render() {
    return (
      <React.Fragment>
        <Grid textAlign="center" style={{ height: "calc(100vh - 40px)" }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 600 }}>
            <Segment style={{ minHeight: 125 }}>
              {this.state.isLoaded ? (
                <Question
                  question={this.state.question}
                  onAnswerSubmit={() => {
                    this.routeToQuestion();
                  }}
                />
              ) : (
                <Dimmer active inverted>
                  <Loader inverted />
                </Dimmer>
              )}
            </Segment>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    );
  }
}

export default GroupQuestion;
