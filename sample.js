import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import { ChatbotAPI } from 'kore-chatbot-api';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  chatWindow: {
    width: '100%',
    height: '400px',
    border: '1px solid #ccc',
    padding: theme.spacing(2),
    overflowY: 'scroll',
  },
  inputField: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  sendButton: {
    marginTop: theme.spacing(2),
  },
}));

const App = () => {
  const classes = useStyles();
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState('');

  const handleChange = event => {
    setInput(event.target.value);
  };

  const handleSend = () => {
    setMessages([...messages, { type: 'user', text: input }]);
    ChatbotAPI.sendMessage(input).then(response => {
      setMessages([...messages, { type: 'bot', text: response }]);
    });
    setInput('');
  };

  return (
    <div className={classes.root}>
      <div className={classes.chatWindow}>
        {messages.map((message, index) => (
          <div key={index}>
            {message.type === 'user' && <p><strong>You:</strong> {message.text}</p>}
            {message.type === 'bot' && <p><strong>Bot:</strong> {message.text}</p>}
          </div>
        ))}
      </div>
      <TextField
        label="Type your message"
        className={classes.inputField}
        value={input}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.sendButton}
        onClick={handleSend}
      >
        Send
      </Button>
    </div>
  );
};

export default App;