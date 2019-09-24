import React from "react";
import { List, Header, Segment, Button } from "semantic-ui-react";
import * as Constants from "../../helpers/constants";

class Importfield extends React.Component {

  handleClick = (e) => {
    e.stopPropagation();
    const item_id = this.props.answer_id;
    this.props.handleClick(Constants.IMPORTFIELD, item_id);
  }

  render() {
    let importfields = <List.Item><List.Content>No linked import fields</List.Content></List.Item>;

    if(this.props.answerimportfields) {
      // let answerimportfields = this.props.answerimportfields.answerimportfields;
      importfields = this.props.answerimportfields.map((field) => {
          return (
            <List.Item key={field.id}>
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
      <Segment onClick={(e) => {
        this.handleClick(e);
        }}>
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

export default Importfield;