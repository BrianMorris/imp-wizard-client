import React from "react";
import { Popup, Icon, Form, Dropdown, List, Header, Segment, Button } from "semantic-ui-react";
import { API } from '../../../service/api';
import { errorHandler } from "../../../service/errorHandler";

class ImportfieldLinkForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      importtypeDropdownOptions: [],
      importtype: null,
      importfieldDropdownOptions: [],
      importfield: null
    };
  }

  componentDidMount() {
    API.Importtype.get(API.Status.ACTIVE).then(
      result => {
          // TODO: make the importtype field default value link to a grouop by adding a group column
          let importtypeDropdownOptions = result.map((field, index) => {
          field.text = field.name;
          field.key = field.id;
          field.active = null;
          field.value = field.id
          return field;
        });
        
        this.setState({
          importtypeDropdownOptions: importtypeDropdownOptions
        });
      },
      error => {
        errorHandler(error);
      }
    );
  }

  populateImporttypeDropdown = (e, data) => {
    this.setState({
      importtype: data.value
    });

    this.populateImportfieldDropdown(data.value);
  }

  populateImportfieldDropdown = (importtype_id) => {
    API.Importfield.get(importtype_id).then(
      result => {
        const importtypeDropdownOptions = result.map((field) => {
          field.text = field.name;
          field.key = field.id;
          field.value = field.id;
          return field;
        });

        this.setState({
          importfieldDropdownOptions: importtypeDropdownOptions
        });
      },
      error => {
        errorHandler(error);
      }
    )
  }

  handleLinkingImportfield = () => {
    this.props.handleImportfieldLink(this.state.importfield); 

    this.setState({
      importtype: null,
      importfield: null
    })
  }

  handleImportfieldChange = (e, data) => {
      this.setState({
        importfield:data.value
      })
  }

  render() {
    let importfields = <List.Item><List.Content>No linked import fields</List.Content></List.Item>;
    
    if(this.props.answerimportfields) {
      importfields = this.props.answerimportfields.map((field, index) => {
        let importfieldButton = <Button secondary compact className='noClick' size='small'>{field.importfield.name}<Icon onClick={() => this.props.handleImportfieldUnlink(field.importfield_id)} className='cancelIcon' size='small' corner='top right' name='cancel'/></Button>;
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

    const importButton = <Button disabled={!(this.state.importtype && this.state.importfield)}
    onClick={this.handleLinkingImportfield}>Add new field</Button>;

    // const defaultDropdown = this.props ? this.props.importtype : null;

    return(
      <Segment className='noClick' onClick={(e) => e.stopPropagation()}>
        <Header>
          Form
        </Header>
        <List horizontal>
          {importfields}
        </List>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field>
              <Dropdown 
                placeholder='select an Import type' 
                fluid 
                search={true}
                onChange={this.populateImporttypeDropdown} 
                selection 
                value={this.state.importtype}
                // defaultValue={defaultDropdown}
                options={this.state.importtypeDropdownOptions} />
            </Form.Field>
            <Form.Field>
              <Dropdown 
                onChange={this.handleImportfieldChange} 
                placeholder='Select an importfield' 
                fluid 
                search 
                selection 
                value={this.state.importfield}
                options={this.state.importfieldDropdownOptions} />
            </Form.Field>
            <Form.Field>
              {importButton}
            </Form.Field>

          </Form.Group>
        </Form>
      </Segment>
    );
  }
}

export default ImportfieldLinkForm;