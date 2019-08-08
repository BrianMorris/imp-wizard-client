import React from "react";
import { Header, Segment, Dimmer, Loader } from "semantic-ui-react";
import { navigate } from "@reach/router";
import Groups from "../component/groups";
import API from "../service/api";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      groups: []
    };
  }

  routeToQuestion(groupId) {
    API.Group.getNextQuestion(groupId).then(
      result => {
        if (result) {
          navigate(`/group/${groupId}/question/${result.id}`);
        }
      },
      error => {
        this.setState({
          error: error
        });
      }
    );
  }

  componentDidMount() {
    API.Group.get().then(
      result => {
        this.setState({
          isLoaded: true,
          groups: result
        });
      },
      error => {
        this.setState({
          isLoaded: true,
          error: error
        });
      }
    );
  }

  render() {
    return (
      <React.Fragment>
        <Header>Select a category below:</Header>
        {this.state.isLoaded ? (
          <Groups
            groups={this.state.groups}
            onGroupSelect={group => {
              this.routeToQuestion(group.id);
            }}
          />
        ) : (
          <Segment style={{ minHeight: 200 }}>
            <Dimmer active inverted>
              <Loader inverted />
            </Dimmer>
          </Segment>
        )}
      </React.Fragment>
    );
  }
}

export default Home;
