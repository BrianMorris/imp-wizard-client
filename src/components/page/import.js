import React from "react";
import {Container, Header, Segment, Dimmer, Loader } from "semantic-ui-react";
import { navigate } from "@reach/router";
import ImportGroup from "../import-group";
import API from "../../service/api";

class Import extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      groups: []
    };
  }

  componentDidMount() {
    API.Import.get().then(
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
    const importGroupElement = this.state.isLoaded 
    ? 
      (<Segment.Group>
        {this.state.groups.map((group, index) => {
          return <ImportGroup group={group} key={index} onGroupSelect={() => navigate(`/import/${group.id}/activefields`, { state : {importtype: group.name}})} />
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
        <Container>
          <Header>Select a category below:</Header>
          {importGroupElement}
        </Container>
      </React.Fragment>
    );
  }
}

export default Import;
