import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import axios from 'axios';
import Message, { MessageType } from './Message';
import Icon from './Icon';

interface Response {
  message: string;
  type: MessageType;
}

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [response, setResponse] = useState<Response>();
  const [sending, setSending] = useState(false);

  const onInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'message':
        setMessage(value);
        break;
      default:
        break;
    }
  };

  const onSubmit = (e: Event) => {
    e.preventDefault();
    // No need to send the form if the honeypot is filled
    if (honeypot) return;
    const payload = {
      Name: name,
      Email: email,
      Message: message,
    };
    setSending(true);
    axios.post('http://localhost:9090/api/messages', {
      data: payload,
    })
      .then((res) => {
        console.log(res);
        setName('');
        setEmail('');
        setMessage('');
        setResponse({
          message: "Thank you! Your message has been sent.",
          type: 'success',
        });
        setSending(false);
      })
      .catch((err) => {
        console.log(err);
        setResponse({
          message: "Something went wrong while sending your message. Please try again later.",
          type: 'error',
        });
        setSending(false);
      });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <label for="name">Name</label>
        <input type="text" name="name" id="name" value={name} onInput={onInput} required />
        <label for="email">Email</label>
        <input type="email" name="email" id="email" value={email} onInput={onInput} required />
        <label for="message">Message</label>
        <textarea name="message" id="message" value={message} onInput={onInput} />
        <input
          type="text"
          name="password"
          style="display:none !important"
          tabindex="-1"
          autocomplete="off"
          value={honeypot}
          onInput={(e) => setHoneypot((e.target as HTMLInputElement).value)}
        ></input>
        {response && <Message content={response.message} type={response.type} />}
        <button type="submit" disabled={sending}>
          Send{' '}
          {sending ? <Icon name="circle-notch" weight="solid" spin/> : ''}
        </button>
      </form>
    </>
  );
}

