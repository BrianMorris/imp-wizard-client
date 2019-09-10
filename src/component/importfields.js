import React from "react";
import { List, Header, Segment, Button } from "semantic-ui-react";

class Importfields extends React.Component {

  handleClick = e => {
    console.log('click');
    e.stopPropagation();
  }

  render() {
    console.log('mprops', this.props);
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
      <Segment onClick={this.handleClick}>
        <Header>
          Linked Import Fields:
        </Header>
        <List horizontal>
          {importfields}
        </List>
      </Segment>
    );
  }
}

export default Importfields ;