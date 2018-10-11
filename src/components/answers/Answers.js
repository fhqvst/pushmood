import React from 'react';
import {
  Heading,
  Flex,
  Group,
  Card,
  Hidden,
  Table,
  Paragraph,
  styled
} from 'reakit';
import { Line } from '@nivo/line';
import { Bar } from '@nivo/bar';
import {
 Grid
} from 'react-styled-flexboxgrid';

import withAuthorization from '../withAuthorization';
import { db } from '../../firebase';

const Section = styled(Card).attrs({
  gutter: '1em',
  palette: 'grayscale',
  tone: 6
})`
  width: 100%;
  & + & {
    margin-top: 1em;
  }
`;

const SectionToggle = styled(Section).attrs({
  tone: 5
})`
  &:hover {
    cursor: pointer;
  }
`;

class AnswersPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      questions: null
    }
  }

  componentDidMount() {
    this.fetchData();
  }
  
  render() {
    const {
      questions
    } = this.state;

    return (
      <div>
        <Grid container>
          <Flex justifyContent="space-between">
            <Heading>Answers</Heading>
            {/*<Button>Export CSV</Button>*/}
          </Flex>
          {questions && questions.map(q => <Question key={q.id} question={q} />)}
          {(!questions || !questions.length) && (<Paragraph>You have not anwered any questions yet.</Paragraph>)}
        </Grid>
      </div>
    );
  }

  fetchData = () => {
    Promise.all([
      db.getQuestions(),
      db.getAnswers()
    ]).then(([qSnapshot, aSnapshot]) => {
      this.setState({
        questions: qSnapshot.docs.map(q => ({
          id: q.id,
          ...(q.data()),
          answers: aSnapshot.docs.map(a => ({
            id: a.id,
            ...(a.data())
          })).filter((a => a.questionId === q.id)),
        }))
      });
    })
  }

}

const AnswerTable = styled(Table)`

  background: transparent;
  width: 100%;

  td, th {
    text-align: left;
  }

  th:first-child,
  td:first-child {
    width: 10%;
  }

  th:not(:first-child),
  td:not(:first-child) {
    width: 90%;
    text-align: left;
  }
`;

const Question = ({ question }) => (
  <Flex marginTop="2em">
    <Hidden.Container>
      {hidden => (
        <Group vertical width="100%">
          <Hidden.Toggle as={SectionToggle} tone={5} {...hidden}>
            <Heading as="h3">{question.text}</Heading>
          </Hidden.Toggle>
          <Hidden {...hidden}>
            <Section>
              {(question.type === 'string') && (
                <Card.Fit>
                  <AnswerTable>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Text</th>
                      </tr>
                    </thead>
                    <tbody>
                      {question.answers.map((a, i) => (
                        <tr key={a.id}>
                          <td>{i + 1}</td>
                          <td>{a.text}</td>
                        </tr>
                      ))}
                    </tbody>
                  </AnswerTable>
                </Card.Fit>
              )}
              {(question.type === 'number') && (
                <Line
                  width={760}
                  height={400}
                  colors="#ffc107"
                  margin={{
                    top: 15,
                    right: 30,
                    bottom: 25,
                    left: 30
                  }}
                  data={[{
                    id: 'anwers',
                    data: question.answers.map((a, x) => ({ x, y: a.text }))
                  }]}
                  curve="monotoneX"
                  axisBottom={{
                    "orient": "bottom",
                    "tickSize": 0,
                    "tickPadding": 5,
                    "tickRotation": 0,
                    "format": () => null, 
                  }}
                />
              )}
              {(question.type === 'boolean') && (
                <Bar
                  width={760}
                  height={400}
                  colors={(d) => console.log(d) || '#00ff00'}
                  margin={{
                    top: 15,
                    right: 30,
                    bottom: 25,
                    left: 30
                  }}
                  data={[
                    {
                      key: 'true',
                      keyColor: '#ffc107',
                      value: question.answers.filter((a) => a.text).length
                    },
                    {
                      key: 'false',
                      keyColor: '#2196f3',
                      value: question.answers.filter((a) => !a.text).length
                    },
                  ]}
                  indexBy="key"
                  colorBy={({ id, data }) => data.keyColor}
                />
              )}
            </Section>
          </Hidden>
        </Group>
      )}
    </Hidden.Container>
  </Flex>
);

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AnswersPage);
