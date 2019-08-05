import React from "react";
import { Header, List } from "semantic-ui-react";
import Question from "../component/question";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [
        {
          name: "Will you be importing any part information?",
          description: "Part data would include any inventoried parts as well as any bundles or services",
          answers: [
            {
              name: "Yes"
            },
            {
              name: "No"
            }
          ],
          questions: [
            {
              name: "Do you have any measurements for your parts?",
              description: "Measurement include any weights or dimensions.",
              questions: [
                {
                  name: "Do you have weights for your parts?",
                  answers: [
                    {
                      name: "Yes"
                    },
                    {
                      name: "No"
                    }
                  ]
                }
              ],
              answers: [
                {
                  name: "Yes"
                },
                {
                  name: "No"
                }
              ]
            },
            {
              name: "Do you have any bundles or kits?",
              description: "A bundle or kit would be a grouping of parts that you sell together or assemble before you send out.",
              answers: [
                {
                  name: "Yes"
                },
                {
                  name: "No"
                }
              ]
            }
          ]
        },
        {
          name: "Will you be import any customer information?",
          description: "Customers can be companies or individuals. This would be anyone who you sell to.",
          answers: [
            {
              name: "Yes"
            },
            {
              name: "No"
            }
          ],
          questions: [
            {
              name: "Which customer types would you like to import?",
              description: "Select one or more of the following customer types",
              multiple: true,
              answers: [
                {
                  name: "Individuals"
                },
                {
                  name: "Companies"
                }
              ]
            }
          ]
        }
      ]
    };
  }

  render() {
    return (
      <React.Fragment>
        <Header>Home Page</Header>
        <List>
          {this.state.questions.map(function(question, index) {
            return <Question question={question} key={index} />;
          })}
        </List>
      </React.Fragment>
    );
  }
}

export default Home;
