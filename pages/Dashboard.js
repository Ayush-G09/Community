import styles from '../styles/Dashboard.module.css'
import Chat from './Chat'
import Sidebar from './Sidebar'
import Game from './Game'
import ApprovlReq from './ApprovlReq'
import CommunityProfile from './CommunityProfile'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Blank from './Blank'
import CreateCommunity from './CreateCommunity'
import CreateChannel from './CreateChannel'
import JoinCommunity from './JoinCommunity'

function Dashboard() {

  const router = useRouter();
  const [game, setGame] = useState(false);
  const [chat, setChat] = useState(false);
  const [ar, setAr] = useState(false);
  const [cp, setCp] = useState(false);
  const [blank, setBlank] = useState(false);
  const [crcom, setcrcom] = useState(false);
  const [crch, setcrch] = useState(false);
  const [jc, setJc] = useState(false);
  const [canmsg, setCanmsg] = useState(false);
  const [sb, setSb] = useState(true);
  const [role, setRole] = useState(null);

  const Crcom = () => {
    setChat(false);
    setAr(false);
    setGame(false);
    setCp(false);
    setSb(true);
    setBlank(false);
    setcrcom(true);
    setcrch(false);
    setJc(false);
  }

  const CloseCrcom = () => {
    setChat(false);
    setAr(false);
    setGame(false);
    setCp(false);
    setSb(true);
    setBlank(true);
    setcrcom(false);
    setcrch(false);
    setJc(false);
  }

  const SelChat = () => {
    setChat(true);
    setAr(false);
    setGame(false);
    setCp(true);
    setSb(false);
    setBlank(false);
    setcrcom(false);
    setcrch(false);
    setJc(false);
  }

  const SelAr = () => {
    setChat(false);
    setAr(true);
    setGame(false);
    setCp(false);
    setSb(true);
    setBlank(false);
    setcrcom(false);
    setcrch(false);
    setJc(false);
  }

  const SelGame = () => {
    setChat(false);
    setAr(false);
    setGame(true);
    setCp(false);
    setSb(true);
    setBlank(false);
    setcrcom(false);
    setcrch(false);
    setJc(false);
  }

  const SelCom = () => {
    setChat(false);
    setAr(false);
    setGame(false);
    setCp(true);
    setSb(false); 
    setBlank(true);
    setcrcom(false);
    setcrch(false);
    setJc(false);
  }

  const SelBack = () => {
    setChat(false);
    setAr(false);
    setGame(false);
    setCp(false);
    setSb(true); 
    setBlank(true);
    setcrcom(false);
    setcrch(false);
    setJc(false);
  }

  const CloseChat = () => {
    setChat(false);
    setAr(false);
    setGame(false);
    setCp(true);
    setSb(false); 
    setBlank(true);
    setcrcom(false);
    setcrch(false);
    setJc(false);
  }

  const Cchcon = () => {
    setChat(false);
    setAr(false);
    setGame(false);
    setCp(true);
    setSb(false);
    setBlank(false);
    setcrcom(false);
    setcrch(true);
    setJc(false);
  } 

  const CloseCchcon = () => {
    setChat(false);
    setAr(false);
    setGame(false);
    setCp(true);
    setSb(false);
    setBlank(true);
    setcrcom(false);
    setcrch(false);
    setJc(false);
  } 

  const Jc = () => {
    setChat(false);
    setAr(false);
    setGame(false);
    setCp(false);
    setSb(true);
    setBlank(false);
    setcrcom(false);
    setcrch(false);
    setJc(true);
  }

  const CloseJc = () => {
    setChat(false);
    setAr(false);
    setGame(false);
    setCp(false);
    setSb(true);
    setBlank(true);
    setcrcom(false);
    setcrch(false);
    setJc(false);
  }

  function handleMsg(v) {
    if(v) {
      setCanmsg(true);
    }
    else
    {
      setCanmsg(false);
    }
  }

  useEffect(() => {
    if(sessionStorage.getItem("relo") === "true"){
      sessionStorage.setItem("relo", "false");
      router.reload();
    }
    else{
      if(role === null)
      {
      setRole(sessionStorage.getItem("role"));
      if(sessionStorage.getItem("role") === "true")
      {
        setChat(false);
        setAr(true);
        setGame(false);
        setCp(false);
      }
      else
      {
        setChat(false);
        setAr(false);
        setGame(true);
        setCp(false);
      }
      }
    }
    if(sessionStorage.getItem("name") === null || undefined)
    {
      router.push('/');
    }
  })

  return (
    <div className={styles.maincon}>
      {sb ? <Sidebar r={role} selectAr={SelAr} selectGame={SelGame} selectCom={SelCom} crcom={Crcom} jc={Jc}/> : null}
      {cp ? <CommunityProfile selectBack={SelBack} selectChat={SelChat} crch={Cchcon} msg={handleMsg}/> : null}
      {game ? <Game/> : null}
      {chat ? <Chat close={CloseChat} active={canmsg}/> : null}
      {ar ? <ApprovlReq/> : null}
      {blank ? <Blank/> : null}
      {crcom ? <CreateCommunity close={CloseCrcom}/> : null}
      {crch ? <CreateChannel close={CloseCchcon}/> : null}
      {jc ? <JoinCommunity close={CloseJc}/> : null}
    </div>
  )
}

export default Dashboard