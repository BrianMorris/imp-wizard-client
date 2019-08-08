import React from "react";
import { Segment, Header, Icon } from "semantic-ui-react";
import API from "../service/api";

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
        return "grey";
    }
  }

  render() {
    return (
      <Segment
        style={{ cursor: "pointer" }}
        color={this.getStatusColor(this.props.group.status_id)}
        onClick={() => {
          this.props.onGroupSelect(this.props.group);
        }}
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
        <Header>
          {this.props.group.name}
          {this.state.isHovering ? <Icon name="angle right" style={{ float: "right" }} /> : ""}
        </Header>
      </Segment>
    );
  }
}

export default Group;
