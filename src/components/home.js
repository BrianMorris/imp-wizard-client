import React from "react";
import { Header, Segment, Button, Item } from "semantic-ui-react";
import { navigate } from "@reach/router";
import adminCategories from "../helpers/admin-categories";

export class Home extends React.Component {
  render() {
    const categories = adminCategories.map((item) => {
      return (
        <Segment key={item.id}>
          <Item>
            <Item.Content>
              <Button className="categoryButton" secondary onClick={() => navigate("./" + item.route)}> {item.title} </Button>
              <Item.Description>
                {item.description}
              </Item.Description>
            </Item.Content>
          </Item>
        </Segment>);
    });

    return (
      <React.Fragment>
          <Header textAlign="center">LOCATE Admin</Header>
          <Item.Group >
            {categories}
          </Item.Group>
      </React.Fragment>
    );
  }
}
