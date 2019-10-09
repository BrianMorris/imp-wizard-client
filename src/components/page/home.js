import React from "react";
import { Header, Segment, Dimmer, Loader } from "semantic-ui-react";
import { navigate } from "@reach/router";
import Group from "../group";
import API from "../../service/api";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      groups: []
    };
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

    // when fetching groups also check for completed imports to show a green label for import nav item
    API.Import.get().then(
      result => {
        let activeImports = result.filter((item) => {
          return item.ready_to_download;
        });

        if(activeImports && activeImports.length) {
          this.props.completeImport();
        }
      }
    );

  }

  routeToQuestion(groupId) {
    console.log('routing', groupId);
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

  render() {
    console.log('this.state.groups', this.state.groups);
    const groupElement = this.state.isLoaded 
    ? 
      (<Segment.Group>
        {this.state.groups.map((group, index) => {
          return <Group group={group} key={index} onGroupSelect={() => this.routeToQuestion(group.id)} />
        })}
      </Segment.Group>)
    :
      (<Segment style={{ minHeight: 200 }}>
        <Dimmer active inverted>
          <Loader inverted />
        </Dimmer>
      </Segment>);

    return (
      <React.Fragment>
        <Header>Select a category below:</Header>
          {groupElement}
      </React.Fragment>
    );
  }
}

export default Home;
