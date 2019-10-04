import React from "react";
import { Popup, List, Header, Segment, Button } from "semantic-ui-react";
import * as Constants from "../../../helpers/constants";

class Importfield extends React.Component {

  changeFocus = (e) => {
    e.stopPropagation();
    const item_id = this.props.answer_id;
    this.props.changeFocus(Constants.IMPORTFIELD, item_id);
  }

  render() {
    let importfields = <List.Item><List.Content>No linked import fields</List.Content></List.Item>;

    if(this.props.answerimportfields) {
      // let answerimportfields = this.props.answerimportfields.answerimportfields;
      importfields = this.props.answerimportfields.map((field) => {
        let importfieldButton = <Button secondary compact size='small'>{field.importfield.name}</Button>;
          return (
            <List.Item key={field.id}>
              <List.Content>
                {field.importfield.description ? 
                <Popup className='popup' inverted content={field.importfield.description} trigger={importfieldButton} />
                :
                importfieldButton
                }
              </List.Content>
            </List.Item>
          );

      });
    }

    return(
      <Segment onClick={(e) => {
        this.changeFocus(e);
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