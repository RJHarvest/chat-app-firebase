import React, { Component } from 'react';
import ChatMessage from '../ChatMessage';
import { signOut } from 'firebase/auth';
import { collection, getDocs, addDoc, query, orderBy, limit, Timestamp } from 'firebase/firestore';
import './index.css';

export default class ChatRoom extends Component {

  constructor(props) {
    super(props)
    this.auth = props.auth
    this.db = props.db
    this.logout = this.logout.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.handleMessageInputOnChange = this.handleMessageInputOnChange.bind(this)
    this.ref = {
      message: null,
      chatbox: null,
    }
    this.state = {
      messageInput: '',
      messages: []
    }
  }

  componentDidMount() {
    this.getMessages()
    this.scrollDown()
  }

  async getMessages() {
    const messagesCol = collection(this.db, 'messages')
    const q = query(messagesCol, orderBy('createdAt', 'asc'), limit(25))
    const snapshot = await getDocs(q)
    const messages = snapshot.docs.map(doc => doc.data())
    this.setState({ messages })
  }

  async sendMessage(e) {
    e.preventDefault()
    const messagesCol = collection(this.db, 'messages');
    const data = {
      userId: this.auth.currentUser.uid,
      text: this.ref.message.value,
      name: this.auth.currentUser.displayName,
      profilePhoto: this.auth.currentUser.photoURL,
      createdAt: Timestamp.now(),
    }
    await addDoc(messagesCol, data)
    await this.getMessages()
    this.scrollDown()
    this.setState({ messageInput: '' })
  }

  scrollDown() {
    this.ref.chatbox.addEventListener('DOMNodeInserted', (event) => {
      const { currentTarget: target } = event
      target.scroll({ top: target.scrollHeight, behavior: 'smooth' })
    })
  }

  handleMessageInputOnChange(messageInput) {
    const { value } = messageInput.target
    this.setState({ messageInput: value })
  }

  logout() {
    signOut(this.auth)
  }

  render() {
    const { messages, messageInput } = this.state
    const messageLists = messages && messages.map((message, index) => (<ChatMessage key={index} message={message} auth={this.auth} />))
    return (
      <section className="p-4 h-100">
        <div className="container">
          <div className="row">
            <div className="col-12 header">
              <h1 className="float-start">Chat Room</h1>
              <button className="float-end btn btn-secondary" onClick={this.logout}>Sign Out</button>
            </div>
            <div className="col-12 chat" ref={node => (this.ref.chatbox = node)}>
              {messageLists}
            </div>
            <div className="col-12 message-input">
              <form className="row g-2" onSubmit={this.sendMessage}>
                <div className="col-11">
                  <label htmlFor="message" className="visually-hidden">Message</label>
                  <input
                    type="text"
                    className="form-control"
                    id="message"
                    placeholder="Enter you message..."
                    value={messageInput}
                    onChange={this.handleMessageInputOnChange}
                    ref={node => (this.ref.message = node)}
                  />
                </div>
                <div className="col-1">
                  <button type="submit" className="btn btn-primary w-100">Send</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  }
}