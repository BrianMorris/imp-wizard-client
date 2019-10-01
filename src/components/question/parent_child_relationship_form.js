import React from 'react';
import { Dropdown, Segment, Header, Form } from 'semantic-ui-react';

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
      });
      if(data.name === 'activeAnswer') {
        this.props.updateParentAnswer(this.state.activeAnswer);
      }
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
  render() {
    let questionDropdownOptions = null
    let answerDropdownOptions = null

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
      if(questionIndex) {
        answerDropdownOptions = this.mapDropdownOptions(this.props.questions[questionIndex].answers);
      }
    }
    // console.log('props', this.props);
    // console.log('questions', this.props.questions);
    // step 1 control, then pass through
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
                onChange={this.onDropdownChange} 
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