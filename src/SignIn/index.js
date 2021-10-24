import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import './index.css';

export default function SignIn(props) {
  const { auth } = props
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }

  return (
    <div className="sign-in text-center">
      <div className='box'>
        <img className='logo mb-3' src='/chat-app-firebase/firechat2.jpeg' alt='FyreChat' />
        <button className="btn btn-secondary" onClick={googleSignIn}>
          Sign In With Google
        </button>
      </div>
    </div>
  )
}