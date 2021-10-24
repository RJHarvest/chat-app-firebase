import React, { Component } from 'react';
import './index.css';

export default class ChatMessage extends Component {

  constructor(props) {
    super(props)
    this.auth = props.auth
  }

  render() {
    const { text, userId, name, profilePhoto } = this.props.message;

    const messageClass = userId === this.auth.currentUser.uid ? 'sent' : 'recieved';

    return (
      <div className={`message-box my-3 ${messageClass}`}>
        <img src={profilePhoto} className='profile-photo mx-3' alt={name} />
        <div className='text-message'>
          <p className='name'>{name}</p>
          <p className='text'>{text}</p>
        </div>
        {/*<div className="card mb-3" style={{maxWidth: "540px", float: 'right', borderRadius:'5rem', background:'#1a1a1d'}}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={profilePhoto} className="img-fluid rounded-start" style={{ borderRadius: '5rem' }}/>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{text}</p>
              </div>
            </div>
          </div>
        </div>*/}
      </div>
    )
  }
}