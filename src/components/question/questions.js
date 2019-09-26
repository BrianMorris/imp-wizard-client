import React from "react";
import Question from "./question";
import QuestionCreateForm from "./question-createform";
import { Accordion, Form, Icon, Popup, Button, Header, Segment, Loader, Dimmer } from "semantic-ui-react";
import { navigate } from "@reach/router";
import API from "../../service/api";

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      questions: null,
      hiddenGroups: [],
      showNewQuestionForm: false,
      filter: null
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

  editQuestion(question_id) {
    navigate("/questionmanager/" + question_id);
  }

  handleClick = () => {
    this.setState({
      showNewQuestionForm:false
    })
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

  reset = () => {
    // reset question list
    this.loadQuestions();
    // return to question list
    this.setState({
      showNewQuestionForm: false
    }); 
  }

  composeQuestionComponent() {
    let questions = null;
    if(this.state.questions) {
      let group = null;
      let parent_count = 0;

      questions = this.state.questions.map((question) => {
        question.parent_answer_id ? parent_count++ : parent_count = 0; 
        const groupHidden = this.state.hiddenGroups.find((x) => x === question.group.id);

        let groupHeader = null;
        if(group !== question.group.name) {
          group = question.group.name;
          groupHeader = <Segment inverted onClick={() => this.toggleGroup(question.group.id, groupHidden)}><Header size="small">{question.group.name}
          <Icon name={ groupHidden ? 'angle right' : 'angle down'} />
          </Header>
          </Segment>;
        }
        return (
          <React.Fragment key={question.id}>
            {groupHeader}

            {groupHidden ? null 
            :
            <Segment style={{"marginLeft": parent_count * 50}} onClick={() => this.editQuestion(question.id)} >
              <Question  question={question} hide_group={true}/>
            </Segment>
            }
          </React.Fragment>
          );
        });
    }
    return questions;
  }

  toggleGroup(group_id, groupHidden) {
    let newHiddenGroups= this.state.hiddenGroups;

    if(groupHidden) {
      let index = newHiddenGroups.indexOf(group_id);       
      newHiddenGroups.splice(index, 1);
    }
    else {
      newHiddenGroups.push(group_id);
    }

    this.setState({
      hiddenGroups:newHiddenGroups
    });
  }

  showNewQuestionForm = () => {
    this.setState({
      showNewQuestionForm:true
    })
  }

  render() {
    const questions = this.composeQuestionComponent();
   
   
    const questionList =   
      this.state.isLoaded  ?
        <React.Fragment>
          {questions}
        </React.Fragment>
      :
        <Segment style={{ minHeight: 125 }}>
          <Dimmer active inverted>
            <Loader inverted />
          </Dimmer>
        </Segment>
      ;

    const newQuestionButton =
    <Icon inverted id='plusIconButton' onClick={this.showNewQuestionForm} circular size='large' name='plus'/>

    return (
      <React.Fragment>
        <Header textAlign="center">Questions  
         
        {!this.state.showNewQuestionForm && <Popup className='popup' inverted content='New Question' trigger={newQuestionButton} />}
        </Header>
        {this.state.showNewQuestionForm ?
          <React.Fragment>
            <Popup 
              className='popup'
              inverted
              content='back'
              trigger={<Icon id='backButton' onClick={this.handleClick} style={{cursor:'pointer'}} size='large' name='arrow circle left' />}
            />
            <QuestionCreateForm
              reset={this.reset}
            />
          </React.Fragment>
          :
          <React.Fragment>

          <Form>
            <Form.Input name="filter" icon='search'  placeholder='Search...' value={this.state.search} onChange={this.handleChange} />
          </Form>
          {questionList}
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}

export default Questions;