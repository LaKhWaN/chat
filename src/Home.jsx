import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import GoogleIcon from "@mui/icons-material/Google";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

function Home() {
  let [username, setUsername] = useState("User");
  const navigate = useNavigate();


  const handleSignInBtn = () => {
    signInWithPopup(auth, provider).then((data) => {
      console.log(data);
      localStorage.setItem("username", data.user.displayName);
      localStorage.setItem("accessToken", data.user.accessToken);
      localStorage.setItem("photoURL", data.user.photoURL);
      
      if (data.user.accessToken != null) navigate("/chat");
    });
  };

  return (
    <>
      <div className="container">
        <div className="title">
          <h1>React + Firebase Chat App {<ChatBubbleIcon />}</h1>
        </div>
        <div className="homeCss">
          <button onClick={handleSignInBtn}>
            {<GoogleIcon />} Sign in with Google
          </button>
        </div>
        <br />
        <div className="terms-policy">
          <h2>Terms and Policies:</h2>
          <ul>
            <li>Be respectful to other users.</li>
            <li>Avoid using any abusive or offensive language.</li>
            <li>Do not share inappropriate content.</li>
          </ul>
          <p>
            Failure to comply with these terms may result in account suspension.
            <span className="emoji" role="img" aria-label="terms-emoji">
              📚✨
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
