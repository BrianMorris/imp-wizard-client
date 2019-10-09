import React from "react";
import {Container, Header, List, Button, Segment} from "semantic-ui-react";
import API from "../../service/api";

class ImportFields extends React.Component {
  constructor(props) {
    super(props);
    this.importtype = props.location.state.importtype;
    this.state = {
      isLoaded: false,
      fields: []
    };
  }

  componentDidMount() {
    API.Import.activeFields(this.props.group_id).then(
      result => {
        this.setState({
          isLoaded: true,
          fields: result
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
    const importFields = this.state.fields ? this.state.fields.map((field, index) => {
      return (
        <List.Item key={index}>
          <List.Header> 
            {field.name} 
          </List.Header>
          <List.Description>
            {field.description}
          </List.Description>
        </List.Item>);
        }) 
    : null;

    return ( 
      <React.Fragment>
        <Container>
          <Header text-align>{this.importtype} import fields</Header>
          <Segment>
            <List divided relaxed bulleted>
              {importFields}
            </List>
          </Segment>
          <Button primary as="a" href={`http://fbp.wizard/import/${this.props.group_id}/template`}>Download CSV</Button>
        </Container>
      </React.Fragment>
      );
  }
}

export default ImportFields;
