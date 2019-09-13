import React from "react";
import { List, Header, Segment, Button } from "semantic-ui-react";

class ImportfieldForm extends React.Component {

  render() {
    let importfields = <List.Item><List.Content>No linked import fields</List.Content></List.Item>;

    if(this.props.arrImportfields) {
      let arrImportfields = this.props.arrImportfields.answerimportfields;
      importfields = arrImportfields.map((field) => {
          return (
            <List.Item>
              <List.Content>
                <Button secondary compact size='small'>{field.importfield.name}</Button>
              </List.Content>
              <List.Description>
                {field.importfield.description}
              </List.Description>
            </List.Item>
          );

      });
    }

    return(
      <Segment onClick={(e) => e.stopPropagation()}>
        <Header>
          Form
        </Header>
        <List horizontal>
          {importfields}
        </List>
      </Segment>
    );
  }
}

export default ImportfieldForm;