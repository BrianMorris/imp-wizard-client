import React from "react";
import { Question } from "./question";
import QuestionCreateForm from "./question_create_form";
import { Form, Icon, Popup, Header, Segment, Loader, Dimmer } from "semantic-ui-react";
import { navigate } from "@reach/router";
import { API }  from "../../service/api";
import { errorHandler } from '../../service/errorHandler';
import { DeleteButton } from '../../helpers/delete_button.js';

export class Questions extends React.Component {
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
        errorHandler(error);
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

  delete = (e, question_id) => {
    e.stopPropagation();
    API.Question.delete(question_id).then(
      result => {
        this.reset();
      },
      error => {
        errorHandler(error);
      }
    )
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
      let group_id = null;
      questions = this.state.questions.map((question) => {
        const groupHidden = this.state.hiddenGroups.find((x) => x === question.group_id);
        let groupHeader = null;
        if(group_id !== question.group_id) {
          group_id = question.group_id;
          groupHeader = 
          <Segment inverted onClick={() => this.toggleGroup(question.group_id, groupHidden)}>
            <Header size="small">{question.group.name}
              <Icon name={ groupHidden ? 'angle right' : 'angle down'} /> 
            </Header>
          </Segment>;
        }
        return (
          <React.Fragment key={question.id}>
            {groupHeader}

            {groupHidden ? null 
            :
            <Segment style={{"marginLeft": question.depth * 50}} onClick={() => this.editQuestion(question.id)} >
              <Question question={question} hide_group={true}>
                <DeleteButton 
                  id={question.id}
                  hasChildren={question.has_children}
                  delete={this.delete}
                />
              </Question>
            </Segment>
            }
          </React.Fragment>
          );
        });
    }
    return questions;
  }
  
  recurseQuestionSegment(questionArray = [], question, depth = 0) {
      question.child_questions.forEach((child_question) => {
        this.recurseQuestionSegment(questionArray, child_question, depth + 1)
      });
      question.depth = depth;
      questionArray.push(question);

      return questionArray;
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
              questions={this.state.questions}
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
