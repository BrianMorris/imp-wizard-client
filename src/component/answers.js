import React from "react";
import AnswerButton from "./answer-button";

function Answers(props) {
  return (
    <React.Fragment>
      {props.answers.map(function(answer, index) {
        return <AnswerButton answer={answer} question={props.question} key={index} onAnswerSubmit={props.onAnswerSubmit} />;
      })}
    </React.Fragment>
  );
}

export default Answers;
