import React from "react";
import { Segment, Header, Icon } from "semantic-ui-react";
import Group from "./group";

class ImportGroup extends Group {
  render() {
    const ready_to_download = this.props.group.ready_to_download;
    return (
      <Segment
        style={ready_to_download ? { cursor: "pointer" } : null}
        color={this.getStatusColor(ready_to_download)}
        className={ready_to_download  ? "" : "disabled"}
        onClick={() => {
          if(ready_to_download) {
            this.props.onGroupSelect(this.props.group);
          }
        }}
        onMouseEnter={() => {
          if(ready_to_download) {
            this.setState({
              isHovering: true
            });
          }
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

export default ImportGroup;
