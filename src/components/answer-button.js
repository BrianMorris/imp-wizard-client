import React from "react";
import { Button, Popup, Dimmer, Loader } from "semantic-ui-react";
import { API } from "../service/api.js";
import { errorHandler } from "../service/errorHandler.js";

class AnswerButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postingAnswer: false
    };
  }

  postAnswer() {
    this.setState({ postingAnswer: true });
    API.Question.postAnswer(this.props.question.id, this.props.answer.id).then(
      response => {
        this.props.onAnswerSubmit(this.props.answer);
      },
      error => {
        errorHandler(error);
      }
    );
  }

  isSelectedAnswer() {
    for (var x = 0; x < this.props.answer.implementation_answers.length; x++) {
      if (this.props.answer.implementation_answers[x].answer_id === this.props.answer.id) {
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <React.Fragment>
        <Dimmer active={this.state.postingAnswer} inverted>
          <Loader />
        </Dimmer>
        <Popup
          position="bottom center"
          content={this.props.answer.description}
          disabled={!this.props.answer.description}
          trigger={
            <Button basic color={this.isSelectedAnswer() ? "green" : "grey"} onClick={() => this.postAnswer()}>
              {this.props.answer.name}
            </Button>
          }
        />
      </React.Fragment>
    );
  }
}

export default AnswerButton;
