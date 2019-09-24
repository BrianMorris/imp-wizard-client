import React from "react";
import { Popup, Checkbox, Button, Header, Form, Segment, List } from "semantic-ui-react";
import API from '../../service/api';

class ImportManager extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      typeName: '',
      typeDescription: '',
      fieldName: '',
      fieldDescription: '',
      importtypes: [],
      importfields: [],
      activeImporttype_id: null,
    }
  }

  handleClick = (e) => {
    e.stopPropagation();

    // const item_id = this.props.answer_id;
    // this.props.handleClick(Constants.IMPORTFIELD, item_id);
  }

  onChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value,
    })
  }

  onDropdownChange = (e, data) => {
    const {name, value} = data;
    this.setState({
      [name]: value,
    })
  }

  componentDidMount() {
    this.getImporttypes();
  }

  getImporttypes() {
    API.Import.getImporttypes().then(
      result => {
        // TODO: make the importtype field default value link to a group by adding a group column
        let importDropdownOptions = result.map((field, index) => {
          field.text = field.name;
          field.key = field.id;
          // field.active = null;
          field.value = field.id
          return field;
        });
        
        this.setState({
          // importDropdownOptions: importDropdownOptions
          importtypes: importDropdownOptions 
        });
      },
      error => {
        console.log('yo err', error);
      }
    );
  }
      
  expandImporttype = (e, data) => {
    const importtype_id = data.id;
    if(importtype_id === this.state.activeImporttype_id) {
      this.setState({activeImporttype_id:null});
    }
    else {
      this.getImporttypeImportfields(importtype_id);
    }
  }

  getImporttypeImportfields(importtype_id) {
    API.Importfield.getImportfields(importtype_id).then(
      result => {
        console.log('res is', result);
        this.setState({
          importfields: result,
          activeImporttype_id: importtype_id,
        })
        this.resetForms();
      },
      error => {

      }
    )
  }
  
  resetForms() {
    this.setState({
      name:'',
      description:''
    })
  }
  
  createImporttype = () => {
    API.Import.createImporttype({
      name: this.state.typeName,
      description: this.state.typeDescription, 
      active:true
    }).then(
      result => {
        console.log('the rese', result)

        // reload importfieldtypes
        this.getImporttypes();
      },
      error => {

      }
    )
  }

  createImportfield = () => {
    API.Importfield.createImportfield({
      importtype_id: this.state.activeImporttype_id,
      name: this.state.fieldName,
      description: this.state.fieldDescription}).then(
      result => {
        console.log('the rese', result)
        // reload importfieldtypes
        this.getImporttypeImportfields(this.state.activeImporttype_id);
      },
      error => {

      }
    )
  }

  handleCheckboxToggle(importtype_id, active) {
    console.log('idaa', importtype_id)
    API.Import.updateImporttype(importtype_id, {active: !active}).then(
      result => {
        console.log('haha', result);
        this.getImporttypes();
      },
      error => {

      }
    )
  }

  render() {
    
    const AddImportfieldForm = (
    <Segment raised color='black'>
      <Form name='importfield' onClick={this.handleClick} onSubmit={this.createImportfield}>
        <Header size="tiny" textAlign='center'>Add Import Field</Header>
        <Form.Group width='16'>
          <Form.Input width='3' placeholder='Name' onChange={this.onChange} name='fieldName' value={this.state.fieldName} />
          <Form.Input width='10' placeholder='Description' onChange={this.onChange} name='fieldDescription' value={this.state.fieldDescription} />
          <Form.Button width='2'  disabled={!this.state.fieldName && !this.state.fieldDescription} primary> Submit</Form.Button>
        </Form.Group>
      </Form>
    </Segment>
    );

    const AddImporttypeForm = (
    <Segment raised color='black'>
      <Form name='importtype' onClick={this.handleClick} onSubmit={this.createImporttype}>
        <Header size="tiny" textAlign='center'>Add Import Type</Header>
        <Form.Group width='16'>
          <Form.Input width='4' placeholder='Name' onChange={this.onChange} name='typeName' value={this.state.typeName} />
          <Form.Input width='10' placeholder='Description' onChange={this.onChange} name='typeDescription' value={this.state.typeDescription} />
          <Form.Button  disabled={!this.state.typeName && !this.state.typeDescription} primary> Submit</Form.Button>
        </Form.Group>
      </Form>
    </Segment>
    );


    const importfields = this.state.importfields.map((importfield) => {
      return(
        <List.Item as='li' key={importfield.id} id={importfield.id} onClick={this.expandImporttype}>
          <List.Content>
            <List.Header>{importfield.name}</List.Header>
          </List.Content>
        </List.Item>
      );
    });

    const importtypes = this.state.importtypes.map((importtype) => {
      return(
      <List.Item key={importtype.id} id={importtype.id} onClick={this.expandImporttype}>
        <List.Icon name={this.state.activeImporttype_id === importtype.id ? 'angle down' : 'angle right'} />
        <List.Content >
          <List.Header className='listHeader'>
          {importtype.name}
          </List.Header>
          <Popup content='activate' trigger={<Checkbox onChange={() => this.handleCheckboxToggle(importtype.id, importtype.active)} onClick={this.handleClick} className='right floated' toggle checked={!!importtype.active} />} />
          <List.Description>{importtype.description}</List.Description>
          {this.state.activeImporttype_id === importtype.id && AddImportfieldForm}
          <List.List as='ul' relaxed='true'>
            {this.state.activeImporttype_id === importtype.id && importfields}
          </List.List>
        </List.Content>
      </List.Item>
      );
    })

    return(
      <Segment onClick={(e) => {
        this.handleClick(e);
        }}>
        <Header textAlign='center'>Manage Imports</Header>
            {AddImporttypeForm}
          <List divided>
            {importtypes}
          </List>
      </Segment>
    );
  }
}

export default ImportManager;