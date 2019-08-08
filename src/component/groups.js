import React from "react";
import { Segment } from "semantic-ui-react";
import Group from "./group";

function Groups(props) {
  return (
    <Segment.Group>
      {props.groups.map(function(group, index) {
        return <Group group={group} key={index} onGroupSelect={props.onGroupSelect} />;
      })}
    </Segment.Group>
  );
}

export default Groups;
