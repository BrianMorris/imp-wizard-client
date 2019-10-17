import React from 'react';
import { Dropdown, Segment, Header, Form } from 'semantic-ui-react';
import { API } from '../../service/api';
import { errorHandler } from '../../service/errorHandler';

class ParentChildLinkForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeQuestion: null,
      activeAnswer: null
    }
  }

  onDropdownChange = (e, data) => {
      this.setState({
        [data.name]:data.value
      }, () => {
      if(data.name === 'activeAnswer') {
        this.props.updateParentAnswer(this.state.activeAnswer);
      }
    });
  }

  mapDropdownOptions(items) {
    if(items) {
      let questionDropdownOptions = items.map(item => {
        item.text = item.name;
        item.key = item.id;
        item.value = item.id;
        item.active = null;
        return item;
      });
      return questionDropdownOptions;
    }
  }

  componentDidMount() {
    if(this.props.question && this.props.question.parent_answer_id) {
      API.Answer.get(this.props.question.parent_answer_id).then(
        result => {
          this.setState({
            activeQuestion: result.question_id,
            activeAnswer: result.id
          });
        },
        error => {
          errorHandler(error);
        }
      );
      // lookup seed the dropdown
    }
  }

  render() {
    let questionDropdownOptions = null;
    let answerDropdownOptions = null;

    if(this.props.questions) {
      let questionIndex  = null;
      questionDropdownOptions = this.mapDropdownOptions(this.props.questions);
      this.props.questions.find((question, index) => {
        if(question.id === this.state.activeQuestion) {
          questionIndex = index;
          return true;
        }

        return false;
      });
      if(questionIndex !== null) {
        answerDropdownOptions = this.mapDropdownOptions(this.props.questions[questionIndex].answers);
      }
    }

    return (
      <Segment>
        <Header size='small'>
          Link to parent question
        </Header>
        <Form >
          <Form.Group widths='equal'>
            <Form.Field>
              <Dropdown 
                onChange={this.onDropdownChange} 
                placeholder='Select a question' 
                name='activeQuestion'
                fluid 
                selection 
                search
                value={this.state.activeQuestion}
                options={questionDropdownOptions}
              />
            </Form.Field>
            <Form.Field>
              <Dropdown 
                onChange={(e, data) => {
                  this.onDropdownChange(e, data);
                  this.props.onChange();
                }} 
                placeholder='Select an answer' 
                name='activeAnswer'
                fluid 
                selection 
                search
                value={this.state.activeAnswer}
                options={answerDropdownOptions}
              />
            </Form.Field>
          </Form.Group>
        </Form>
      </Segment>
    );
  }
}

export default ParentChildLinkForm;