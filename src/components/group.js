import React from "react";
import { Segment, Header, Icon, Popup } from "semantic-ui-react";
import { API } from "../service/api.js";

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovering: false
    };
  }

  getStatusColor(statusId) {
    switch (statusId) {
      case API.Status.IN_PROGRESS:
        return "yellow";
      case API.Status.COMPLETE:
        return "green";
      default:
        return "black";
    }
  }

  render() {
    const disabled = this.props.group.question_count < 1;
    return (
      <Segment
        style={{ cursor: "pointer" }}
        color={this.getStatusColor(this.props.group.status_id)}
        onClick={() => {
          this.props.onGroupSelect(this.props.group);
        }}
        disabled={disabled}
        onMouseEnter={() => {
          this.setState({
            isHovering: true
          });
        }}
        onMouseLeave={() => {
          this.setState({
            isHovering: false
          });
        }}
      >
        <Popup
          className='popup'
          inverted
          content={disabled ? 'no valid questions for this group' : 'go to group questions'}
          trigger={
            <Header>
              {this.props.group.name}
              {this.state.isHovering ? <Icon name="angle right" style={{ float: "right" }} /> : ""}
            </Header>
          }
        />
      </Segment>
    );
  }
}

export default Group;
