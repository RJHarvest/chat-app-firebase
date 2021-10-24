import ChatRoom from './ChatRoom';
import SignIn from './SignIn';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { useAuthState } from 'react-firebase-hooks/auth';

const app = initializeApp({
  apiKey: "AIzaSyAEBVkCPzvl2-H3ElkVLLUEklgl1f-STm8",
  authDomain: "chat-app-4c8df.firebaseapp.com",
  projectId: "chat-app-4c8df",
  storageBucket: "chat-app-4c8df.appspot.com",
  messagingSenderId: "220779545878",
  appId: "1:220779545878:web:fa6a6b2a9e2057857ebc37"
});

const auth = getAuth(app);
const db = getFirestore(app);

function App() {
  const [user] = useAuthState(auth)
  const props = {
    auth,
    db,
  }

  return (
    <Router>
      <div className="App">
        <Route exact path='/chat-app-firebase'>
          {user ? <Redirect to='/chat-app-firebase/chat-room' /> : <SignIn {...props} />}
        </Route>
        <Route exact path='/chat-app-firebase/chat-room'>
          {user ? <ChatRoom {...props} /> : <Redirect to='/chat-app-firebase' />}
        </Route>
      </div>
    </Router>
  );
}

export default App;
