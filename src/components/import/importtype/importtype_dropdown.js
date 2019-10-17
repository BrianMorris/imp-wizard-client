import React from "react";
import { Form, Dropdown } from "semantic-ui-react";
import { API } from '../../../service/api';
import { errorHandler } from "../../../service/errorHandler";

class ImporttypeDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      importDropdownOptions: [],
      importtype: null,
    };
  }

  onDropdownChange = (e, data) => {
    const {name, value} = data;
    this.setState({
      [name]: value,
      changed: true
    })
  }

  componentDidMount() {
    API.Importtype.get(API.Status.ACTIVE).then(
      result => {
          let importDropdownOptions = result.map((field, index) => {
            field.text = field.name;
            field.key = field.id;
            field.active = null;
            field.value = field.id
            return field;
        });
        
        this.setState({
          importDropdownOptions: importDropdownOptions
        });
      },
      error => {
        errorHandler(error);
      }
    );
  }

  render() {
    return(
        <Form.Field>
          <Dropdown 
            onChange={this.onDropdownChange} 
            placeholder='Select an Import type' 
            name='importtype'
            fluid 
            selection 
            search
            value={this.state.importtype}
            options={this.state.importDropdownOptions}
          />
        </Form.Field>
    );
  }
}

export default ImporttypeDropdown;