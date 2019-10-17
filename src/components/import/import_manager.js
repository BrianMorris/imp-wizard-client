import React from "react";
import { Header, Segment, List } from "semantic-ui-react";
import { API } from '../../service/api';
import { errorHandler } from '../../service/errorHandler';
import ImporttypeItem from './importtype/importtype_item';
import ImportfieldForm from './importfield/importfield_form';
import ImporttypeForm from './importtype/importtype_form';

export class ImportManager extends React.Component {

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
    API.Importtype.get().then(
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
        console.log('ya', error)
        errorHandler(error);
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
    API.Importfield.get(importtype_id).then(
      result => {
        this.setState({
          importfields: result,
          activeImporttype_id: importtype_id,
        })
      },
      error => {
        errorHandler(error);
      }
    )
  }
  
  resetForms() {
    this.setState({
      typeName:'',
      typeDescription:'',
      fieldName:'',
      fieldDescription:''
    })
  }
  
  createImporttype = () => {
    API.Importtype.create({
      name: this.state.typeName,
      description: this.state.typeDescription, 
      active:true
    }).then(
      result => {
        this.getImporttypes();
        this.resetForms();
      },
      error => {
        errorHandler(error);
      }
    )
  }

  createImportfield = () => {
    API.Importfield.create({
      importtype_id: this.state.activeImporttype_id,
      name: this.state.fieldName,
      description: this.state.fieldDescription}).then(
      result => {
        this.getImporttypeImportfields(this.state.activeImporttype_id);
        this.resetForms();
      },
      error => {
        errorHandler(error);
      }
    )
  }

  handleCheckboxToggle(importtype_id, active) {
    API.Importtype.update(importtype_id, {active: !active}).then(
      result => {
        this.getImporttypes();
      },
      error => {
        errorHandler(error);
      }
    )
  }

  render() {
    
    const AddImportfieldForm = (
      <ImportfieldForm 
        onChange={this.onChange}
        onSubmit={this.createImportfield}
        fieldName={this.state.fieldName}
        fieldDescription={this.state.fieldDescription}
      />
    );

    const AddImporttypeForm = (
      <ImporttypeForm 
        onChange={this.onChange}
        onSubmit={this.createImporttype}
        typeName={this.state.typeName}
        typeDescription={this.state.typeDescription}
      />
    // <Segment raised color='black'>
    //   <Form name='importtype' onClick={this.handleClick} onSubmit={this.createImporttype}>
    //     <Header size="tiny" textAlign='center'>Add Import Type</Header>
    //     <Form.Group width='16'>
    //       <Form.Input width='4' placeholder='Name' onChange={this.onChange} name='typeName' value={this.state.typeName} />
    //       <Form.Input width='10' placeholder='Description' onChange={this.onChange} name='typeDescription' value={this.state.typeDescription} />
    //       <Form.Button  disabled={!this.state.typeName && !this.state.typeDescription} primary> Submit</Form.Button>
    //     </Form.Group>
    //   </Form>
    // </Segment>
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
        <ImporttypeItem 
          key={importtype.id}
          importtype={importtype} 
          activeImporttype_id={this.state.activeImporttype_id}
          expandImporttype={this.expandImporttype}
          handleClick={this.handleClick}
          handleCheckboxToggle={(importtype_id, active) => this.handleCheckboxToggle(importtype_id, active)}
        >
          {this.state.activeImporttype_id === importtype.id && AddImportfieldForm}
          <List.List as='ul' relaxed='true'>
            {this.state.activeImporttype_id === importtype.id && importfields}
          </List.List>
        </ImporttypeItem>
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
