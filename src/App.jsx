// Importing necessary modules
import { useNavigate } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useEffect, useRef, useState } from "react";

// Importing Material UI Icons
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import LogoutIcon from "@mui/icons-material/Logout";
import SendIcon from "@mui/icons-material/Send";

// Importing firebase and related config module
import firebase from "firebase/compat/app";
import { auth, provider, firestore, msgReference } from "./firebase";

// App function
function App() {
  let [msg, setMsg] = useState("");
  const username = localStorage.getItem("username");
  const photoURL = localStorage.getItem("photoURL");
  const navigate = useNavigate();

  // Const Functions
  const acha = useRef();
  useEffect(() => {
    acha.current.scrollIntoView({ behaviour: "smooth" }, [msgs]);
  });

  const logOutBtn = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleInput = (event) => {
    setMsg(event.target.value);
  };

  const sendMsg = async (e) => {
    e.preventDefault();
    await msgReference.add({
      username: username,
      msg: msg,
      photoURL: photoURL,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMsg("");
  };

  // Message components
  const sendMsgComponent = (_photoURL, _username, _msg) => {
    return (
      <div className="msg sender">
        <p>
        {_msg} <img src={_photoURL} alt={_username} />
        </p>
      </div>
    );
  };

  const receiverMsgComponent = (_photoURL, _username, _msg) => {
    return (
      <div className="msg receiver">
        <p>
          <img src={_photoURL} alt={_username} /> {_msg}
        </p>
      </div>
    );
  };

  const query = msgReference.orderBy("createdAt");
  const [msgs] = useCollectionData(query);

  return (
    <>
      <div className="container">
        <div className="bar">
          <div className="title">
            <h1>React + Firebase Chat App {<ChatBubbleIcon />}</h1>
          </div>
          <div className="logout">
            <button onClick={logOutBtn}>Log Out {<LogoutIcon />}</button>
          </div>
        </div>
        <hr></hr>
        <div className="chat-box">
          {msgs?.map((msgData) =>
            username == msgData.username
              ? sendMsgComponent(msgData.photoURL, msgData.username, msgData.msg)
              : receiverMsgComponent(msgData.photoURL, msgData.username, msgData.msg)
          )}
          <span ref={acha}></span>
        </div>
        <div className="chat-input">
          <form className="form">
            <input
              className="homeCss-input"
              onChange={handleInput}
              placeholder="Enter your message"
              type="text"
              value={msg}
            />
            <input
              className="homeCss-button"
              type="submit"
              onClick={sendMsg}
              value={"Send"}
            />
          </form>
        </div>
        <hr />
      </div>
    </>
  );
}

export default App;
