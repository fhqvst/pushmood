import React, { Component } from 'react';
import {
  Field,
  Label,
  Input,
  Button,
  Table,
  Block,
  Heading,
  Group,
  Backdrop,
  Portal,
  Overlay,
  Paragraph,
  Flex,
  styled,
  Card
} from 'reakit';
import { Edit2, Trash2, Check, X, Zap } from 'react-feather';

import {
 Grid
} from 'react-styled-flexboxgrid';

import withAuthorization from '../withAuthorization';
import { db } from '../../firebase';

const randomQuestions = [
  ["How many cups of coffee have you had today?", "number"],
  ["How many hours of sleep did you get last night?", "number"],
  ["How happy are you right now, on a scale from 1 to 5?", "number"],
  ["Are you feeling productive?", "boolean"],
  ["Is this valuable work?", "boolean"],
  ["Are you firm that this code works as expected?", "boolean"],
  ["What did you learn today?", "string"],
  ["What do you hope to achieve with this code?", "string"],
  ["What is the answer to the meaning of life, the universe and everything?", "number"],
];

const IconButton = styled(Button)`
  width: 2.5em;
  padding-left: 0;
  padding-right: 0;

  svg {
    margin-right: 0;
  }
`;

class QuestionsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      loading: false,
      text: '',
      type: 'string'
    }
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  getRandomQuestion = () => {
    const [text, type] = randomQuestions[Math.floor(Math.random() * randomQuestions.length)];

    this.setState({
      text,
      type
    })
  }

  render() {
    const { questions} = this.state;

    return (
      <div>
        <Grid container>
          <Heading as="h1">Questions</Heading>
          <Block marginTop="2em">
            <Heading as="h2">Add New Question</Heading>
            <Card gutter="1em" palette="grayscale" tone={6} width="100%">
              <Field>
                <Label>What do you want to ask?</Label>
                <Group>
                  <Input
                    id="question-text"
                    placeholder=""
                    value={this.state.text}
                    onChange={this.handleChangeText}
                    borderRight="0"
                    autoFocus
                    opaque
                  />
                  <IconButton onClick={this.getRandomQuestion}><Zap /></IconButton>
                </Group>
              </Field>
              <Field>
                <Label>What type of question is this?</Label>
                <Input as="select"
                  id="question-type"
                  value={this.state.type}
                  onChange={this.handleChangeType}
                  opaque
                >
                  <option value="string">String</option>
                  <option value="number">Number</option>
                  <option value="boolean">Boolean</option>
                </Input>
              </Field>
              <Field display="block">
                <Button onClick={this.handleSubmit}>Add</Button>
              </Field>
            </Card>
          </Block>
          <Block marginTop="2em">
            <Heading as="h2">All Questions</Heading>
            { (questions.length > 1) && (<QuestionList questions={questions} onEdit={this.handleEdit} onDelete={this.handleDelete} />) }
            { (!questions.length) && (<Paragraph>You have not created any questions yet.</Paragraph>) }
          </Block>
        </Grid>
      </div>
    );
  }

  fetchQuestions = () => {
    db.getQuestions().then(snapshot => {
      this.setState({
        questions: snapshot.docs.map(d => ({
          id: d.id,
          ...(d.data())
        }))
      });
    });
  }

  handleDelete = (id) => db.deleteQuestion(id).then(this.fetchQuestions);
  handleEdit = (id, fields) => db.updateQuestion(id, fields).then(this.fetchQuestions);
  handleChangeText = (e) => this.setState({ text: e.target.value });
  handleChangeType = (e) => this.setState({ type: e.target.value });

  handleSubmit = (e) => db.createQuestion({
      text: this.state.text,
      type: this.state.type,
    }).then(this.fetchQuestions);
}

const QuestionList = ({ questions, onEdit, onDelete }) =>
    <Table width="100%">
      <thead>
        <tr>
          <th width="40%">
            Question
          </th>
          <th>
            Type
          </th>
          <th>
            Created
          </th>
          <th>
            Answers
          </th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {questions.map(question => <QuestionRow key={question.id} question={question} onEdit={onEdit} onDelete={onDelete} />)}
      </tbody>
    </Table>

class QuestionRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: props.question.text,
      editing: false
    };
  }

  render() {
    const { question } = this.props;
    return (
      <tr height="48px">
        <td style={{ lineHeight: 1 }}>
          {!this.state.editing && question.text}
          {this.state.editing && (
            <Input
              placeholder={question.text}
              value={this.state.text}
              onChange={this.handleChangeText}
              marginLeft="-10px"
            />
          )}
        </td>
        <td style={{ textTransform: 'capitalize' }}>{question.type}</td>
        <td></td>
        <td></td>
        <td>
          {!this.state.editing && <IconButton onClick={this.handleEdit}><Edit2 /></IconButton>}
          {this.state.editing && (
            <Group display="inline-flex" width="100%">
              <IconButton onClick={this.handleSave} flex="1" palette="success"><Check /></IconButton>
              <IconButton onClick={this.handleCancel} flex="1" palette="danger"><X /></IconButton>
            </Group>
          )}
        </td>
        <td>
          <Overlay.Container>
            {overlay => (
              <Block>
                <IconButton as={Overlay.Show} {...overlay} palette="danger"><Trash2 /></IconButton>
                <Backdrop as={[Portal, Overlay.Hide]} {...overlay}  animate={true} fade={true}/>
                <Overlay as={Portal} {...overlay} width="100%" maxWidth="500px" animate={true} fade={true}>
                  <Heading as="h3" fontSize="1.25em">Delete Question</Heading>
                  <Paragraph>
                    This will delete all your recorded answers to this question. This action cannot be undone.
                  </Paragraph>
                  <Paragraph>
                    Are you sure you want to remove it?
                  </Paragraph>
                  <Flex marginTop="2em">
                    <Button palette="danger" flex="1" marginRight="0.5em" onClick={() => this.handleDelete(overlay.hide)}>Yes, away with it!</Button>
                    <Button flex="1" marginLeft="0.5em" onClick={overlay.hide}>No, take me back!</Button>
                  </Flex>
                </Overlay>
              </Block>
            )}
          </Overlay.Container>
        </td>
      </tr>
    );
  }

  handleEdit = () => this.setState({ editing: true });

  handleCancel = () => {
    this.setState({ editing: false });
  };

  handleSave = () => 
    this.props.onEdit(this.props.question.id, { text: this.state.text })
      .then(() => this.setState({ editing: false }));

  handleChangeText = (e) => this.setState({ text: e.target.value });

  handleDelete = (cb) => this.props.onDelete(this.props.question.id)
    .then(cb)
    .catch(cb);
  
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(QuestionsPage);
