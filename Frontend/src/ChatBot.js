import logo from './css/img/Logo.png';
import './css/ChatBot.css';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import LogoutSVG from './css/logout.svg'
import HomeSVG from './css/home.svg'
import SearchSVG from './css/search.svg'
import ChatSVG from './css/bot.svg'
import SentSVG from './css/sent.svg'

import _, { random, set } from 'lodash'

let environment = "null";
let subEnv = "null";
let intuitionTitle = null;
let intuitionDesc = null;
let intuitionTags = null;

function ChatBot() {


  if (window.location.href === "http://localhost:3000/Employee/ChatBot") {
    window.location.href = "http://localhost:3000/Employee/Dashboard";
  }

  const [chatBotOpen, setChatBotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    let chatBody = document.getElementsByClassName("chatbot-body");
    if (chatBody.length > 0) {

      if (chatBody[0].classList.contains("chatbot-body-open")) {
        chatBody[0].classList.remove("chatbot-body-open")
        setChatMessages([]);
      }
      else {
        chatBody[0].classList.add("chatbot-body-open")
        setChatMessages([]);
        setTimeout(() => {
          setChatMessages([{
            Position: "left",
            Message: "Welcome to IntuitionStack, You can ask me to post Intuition, Navigate around, Search for Intuition",
          }])
        }, 400);
      }
    }
  }, [chatBotOpen])

  useEffect(() => {
    if (!localStorage.getItem("Initial")) {
      setChatBotOpen(true);
      setTimeout(() => {
        setChatBotOpen(false);
      }, 2000);

      localStorage.setItem("Initial", "true");
    }
  }, [])

  function addMessage(e) {

    if (document.getElementById("chatMsg").value.toLowerCase() === "exit" || document.getElementById("chatMsg").value.toLowerCase() === "quit") {
      pushUserMessage(document.getElementById("chatMsg").value);
      pushRobotMessage("Exited..");
      environment = "null"; subEnv = "null"; intuitionTitle = null; intuitionDesc = null; intuitionTags = null;
      return null;
    }

    if (environment.includes("A")) {
      subEnv = PostIntuition(document.getElementById("chatMsg").value);
    } else {
      let newmsg = document.getElementById("chatMsg").value;
      pushUserMessage(newmsg)
      subEnv = environment = getEnv(newmsg)
    }

  }

  function pushUserMessage(postmsg) {
    let chatMsgCpy = chatMessages;
    chatMsgCpy.push({
      Position: "right",
      Message: postmsg,
    })
    setChatMessages([...chatMsgCpy])
    document.getElementById("chatMsg").value = "";
  }

  function pushRobotMessage(getmsg) {
    setTimeout(() => {
      let chatMsgCpy = chatMessages;
      chatMsgCpy.push({
        Position: "left",
        Message: getmsg,
      })
      setChatMessages([...chatMsgCpy])
    }, 500);
  }

  function getEnv(newmsg) {

    // All For POST INTUITION - we use KEY for environment "A"
    if (newmsg.toLowerCase().includes("post intuition".toLowerCase()) || newmsg.toLowerCase().includes("add intuition".toLowerCase()) || newmsg.toLowerCase().includes("send intuition".toLowerCase())) {
      pushRobotMessage("Okay, Please give me Intuition title ")
      return "A";
    }

    else if (newmsg.toLowerCase().includes("navigate".toLowerCase()) || newmsg.toLowerCase().includes("move".toLowerCase()) || newmsg.toLowerCase().includes("take me".toLowerCase())) {

      let trimNavigation = newmsg.toLowerCase().replace("navigate to ", "")
      trimNavigation = trimNavigation.toLowerCase().replace("move to ", "")
      trimNavigation = trimNavigation.toLowerCase().replace("take me to ", "")
      pushRobotMessage("Okay, Navigating to " + trimNavigation)

      if (trimNavigation.toLowerCase().includes("my approved intuition".toLowerCase()) || trimNavigation.toLowerCase().includes("approved intuition".toLowerCase()) || trimNavigation.toLowerCase().includes("approved".toLowerCase())) {
        window.location.href = "http://localhost:3000/Employee/ApprovedIntuitions";
      } else if (trimNavigation.toLowerCase().includes("my rewarded".toLowerCase()) || trimNavigation.toLowerCase().includes("rewarded intuition".toLowerCase()) || trimNavigation.toLowerCase().includes("rewarded".toLowerCase())) {
        window.location.href = "http://localhost:3000/Employee/Rewarded";
      } else if (trimNavigation.toLowerCase().includes("intuition".toLowerCase())) {
        window.location.href = "http://localhost:3000/Employee/MyIntuition";
      } else if (trimNavigation.toLowerCase().includes("password".toLowerCase()) || trimNavigation.toLowerCase().includes("pwd".toLowerCase()) || trimNavigation.toLowerCase().includes("reset".toLowerCase())) {
        window.location.href = "http://localhost:3000/Employee/Authentication/ResetPassword";
      }
      else {
        pushRobotMessage("Feature not found!")
      }
      return "null";
    }
    else if (newmsg.toLowerCase().includes("what this system do".toLowerCase())) {
      pushRobotMessage("You can post your intuition and get your creativity implemented! With this system you can chat with me you can perform global search to search the data/record, My Smart algorithm shows you the best intuitions")
      return "null";
    }

    else if (newmsg.toLowerCase().includes("Thanks".toLowerCase()) || newmsg.toLowerCase().includes("Thank you".toLowerCase()) || newmsg.toLowerCase().includes("Thx".toLowerCase())) {
      let reply = ["My Pleasure, Happy to help :) .", "Aww.., Happy to help :) .", "You're welcome! Let me know if there's anything I can help you with.", "You're welcome! Don't hesitate to ask if you have any questions or need any assistance."]
      pushRobotMessage(reply[Math.floor(Math.random() * 5)])
      return "null";
    }

    else if (newmsg.toLowerCase().includes("hi".toLowerCase()) || newmsg.toLowerCase().includes("hello".toLowerCase())) {
      pushRobotMessage("Hey, How may i help you?")
      return "null";
    }

    else if (newmsg.toLowerCase().includes("what you can do".toLowerCase()) || newmsg.toLowerCase().includes("help".toLowerCase())) {
      pushRobotMessage("I can post intuition for you, I can help you with the navigation of this application")
      return "null";
    }

    else if (newmsg.toLowerCase().includes("log out".toLowerCase()) || newmsg.toLowerCase().includes("signout".toLowerCase()) || newmsg.toLowerCase().includes("logout".toLowerCase()) || newmsg.toLowerCase().includes("sign out".toLowerCase())) {

      setTimeout(() => {
        // pushRobotMessage("Logging out...")
        let chatMsgCpy = chatMessages;
        chatMsgCpy.push({
          Position: "left",
          Message: "Have a good day, Logging out...",
        })
        setChatMessages([...chatMsgCpy])

        setTimeout(() => {
          localStorage.clear();
          sessionStorage.clear();
          document.getElementById("sendMsg").click();
        }, 1000);

      }, 1000);
      return "null";
    } else {
      //Default action
      pushRobotMessage("Hmm... Didn't get you, Please contact to help desk!")
      return "null";
    }
  }

  function PostIntuition(passMsg) {

    switch (subEnv) {
      case "A":
        pushUserMessage(passMsg)
        intuitionTitle = passMsg;
        pushRobotMessage("Got it, Please share Description for your intuition")
        return "A1";
        break;

      case "A1":
        pushUserMessage(passMsg)
        intuitionDesc = passMsg
        pushRobotMessage("Got it, Please share tags for your intuition")
        return "A2";
        break;

      case "A2":
        pushUserMessage(passMsg.toUpperCase())
        intuitionTags = passMsg.toUpperCase()
        pushRobotMessage("Got it, Want to submit Yes to submit")
        return "A3";
        break;

      case "A3":
        pushUserMessage(passMsg)
        if (passMsg.toLowerCase().includes("yes".toLowerCase()) || passMsg.toLowerCase().includes("submit".toLowerCase())) {
          fetch("http://localhost:3001/PostIntuition", {
            method: "POST",
            body: JSON.stringify({
              "intBrief": intuitionTitle,
              "intTags": intuitionTags,
              "intDesc": intuitionDesc,
              "intByEmpId": sessionStorage.getItem('sessionid'),
              "intStatusId": "New Post",
              "intRecognized": "false",
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }).then((response) => response.json()).then((data) => {
            if (data.affectedRows === 1) {
              pushRobotMessage("Intuition Submitted successfully!")
            } else {
              pushUserMessage("Something went wrong! intuition not submitted")
            }
          })
        }
        return "A4";
        break;
    }
  }

  if (!(sessionStorage.getItem("sessionkey") === null)) {
    return (
      <>
        <div className="chatbot">
          <div className="chatbot-body">
            <div className='chatbot-body-sheet'>
              {
                chatMessages.map((chat, key) => {
                  return <div key={key} className={`chatbot-body-sheet-message-${chat.Position} chatbot-body-sheet-message`}>
                    {chat.Message}
                  </div>
                })
              }
            </div>

            <div className="chatbot-body-input">
              <input type="text" className="chatbot-body-input-input" id="chatMsg" onKeyDown={e => {
                if (e.keyCode == 13) {
                  addMessage(e);
                }
              }} />
              <button className="chatbot-body-input-btn" id="sendMsg" onClick={addMessage} ><img src={SentSVG} alt="sent Loading.." className="chatbot-body-input-btn-img" /></button>
            </div>
          </div>

          <button className="chatbot-button-open" id="chatBot" onClick={() => {
            setChatBotOpen(!chatBotOpen);
            environment = "null";
            subEnv = "null";
            intuitionTitle = null;
            intuitionDesc = null;
            intuitionTags = null;
          }}> <img src={ChatSVG} alt="chatBot Loading.." className='chatBot-icon' />  </button>

        </div>
      </>
    );
  }
  else {
    window.location.href = "http://localhost:3000/Login";
  }
}

export default ChatBot;
