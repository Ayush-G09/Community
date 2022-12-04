import styles from '../styles/Chat.module.css'
import { faXmark, faPlay, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import { useEffect, useState } from 'react';

function Chat(props) {

  const [chats, setChats] = useState([]);

  var headers = {
    'Authorization': `Bearer ${sessionStorage.getItem("access")}`
  }

  function ShowSendBt() {
    var bt = document.getElementById('sendbt');
    bt.style.display = 'flex';
  }

  function HideSendBt() {
    var tid = document.getElementById('tid').value;
    if(tid === '')
    {
      var bt = document.getElementById('sendbt');
      bt.style.display = 'none';
    }
  }

  async function join() {
    var data = {users: sessionStorage.getItem('email')};
    var id = sessionStorage.getItem('chanid');
    const request = await axios.post(`https://web-production-b59e.up.railway.app/community/channels/users/${id}`, data, {headers: headers})
    if(request.status === 200)
    {
      alert("Channel joined succesfully.");
    }
  }

  async function SendMsg() {
    const n = sessionStorage.getItem('chanid');
    var tid = document.getElementById('tid');
    var data = {message: tid.value, channel: sessionStorage.getItem('chanid'), user_email: sessionStorage.getItem('email')};
    await axios.post(`https://web-production-b59e.up.railway.app/community/channels/chats/${n}`, data, {headers: headers});
    tid.value = "";
  }

  useEffect(() => {
    async function GetChatData() {
      const n = sessionStorage.getItem('chanid');
      const request = await axios.get(`https://web-production-b59e.up.railway.app/community/channels/chats/${n}`);
      setChats(request.data);
      var Racon2 = document.getElementById('Racon2');
      Racon2.scrollTop = Racon2.scrollHeight;
    }
      
    GetChatData();
  })

  return (
    <>
    <div className={styles.Racon} id='chat'>
        <div className={styles.Racon1}>
          <div className={styles.Racon11}>
            <div>
              <img className={styles.Image} src='https://i.pinimg.com/736x/e4/3e/4c/e43e4cd41ddffc21d2e6600dfca20306--logo-software-logotype.jpg'></img>
            </div>
          </div>
          <div className={styles.Racon12}>CSS</div>
          <div className={styles.Racon13}>
            <FontAwesomeIcon icon={faXmark} onClick={() => props.close()}/>
          </div>
        </div>
        <div className={styles.Racon2} id="Racon2">
          {chats.map((item, index) => {
            return(
              <>
              {item.user_email === sessionStorage.getItem('email') ? 
              <>
              <div className={styles.MsgBr} key={index}>{item.message}</div>
              <div className={styles.MsgCr}>
                {item.user_name}<div className={styles.MsgUIr}><FontAwesomeIcon icon={faUser}/></div>
              </div>
              </>
              : 
              <>
              <div className={styles.MsgBl} key={index}>{item.message}</div>
              <div className={styles.MsgCl}>
                <div className={styles.MsgUIl}><FontAwesomeIcon icon={faUser}/></div>{item.user_name}
              </div>
              </>
              }
              </>
            )
          })}
        </div>
        <div className={styles.Racon3}>
          {props.active ? 
          <>
          <textarea placeholder='Type a message...' id="tid" onSelect={() => ShowSendBt()} onPointerLeave={() => HideSendBt()} onChangeCapture={() => HideSendBt()}></textarea>
          <div id='sendbt' onClick={() => SendMsg()}><FontAwesomeIcon icon={faPlay}/></div>
          </>
          :
          <span onClick={() => join()}>Join Channel</span>
          }
        </div>
    </div>
    </>
  )
}

export default Chat