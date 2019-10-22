import React from "react";
import {Container, Header, List, Button, Segment} from "semantic-ui-react";
import { API } from "../../service/api.js";
import { errorHandler } from "../../service/errorHandler.js";

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

        errorHandler(error);
      }
    );
  }

  render() {
    const downloadLink = API.Import.downloadTemplate(this.props.group_id);

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
          <Header text-align="center">{this.importtype} import fields</Header>
          <Segment>
            <List divided relaxed bulleted>
              {importFields}
            </List>
          </Segment>
          <Button primary as="a" href={downloadLink} >Download CSV</Button>
        </Container>
      </React.Fragment>
      );
  }
}

export default ImportFields;
