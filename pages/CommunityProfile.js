import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../styles/CommunityProfile.module.css'
import { faNetworkWired, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CommunityProfile(props) {

  const [chdata, setChdata] = useState([]);
  const name = sessionStorage.getItem('cname');

  useEffect(() => {
    async function GetData() {
      const n = sessionStorage.getItem('cid');
      const request = await axios.get(`https://web-production-b59e.up.railway.app/community/channels/community/${n}`)
      setChdata(request.data);
    }
    GetData();
  })

  function Check(i) {
    if(chdata[i].users.includes(sessionStorage.getItem('email'))) {
      return true;
    }
    else
    {
      return false;
    }
  }

  return (
    <div className={styles.Cpcon}>
      <div className={styles.Cpconh}>
        <div>
          <FontAwesomeIcon icon={faArrowLeftLong} onClick={() => props.selectBack()}/>
        </div>
        <span>{name}</span>
      </div>
      <div className={styles.Cpconc}>
        {chdata.map((item, index) => {
          return(
            <div className={styles.Cpconcd} key={index} onClick={() => {props.selectChat(); props.msg(Check(index)); sessionStorage.setItem('chanid', item.channel_id); sessionStorage.setItem('channame', item.channel_name)}}>
              <div><FontAwesomeIcon icon={faNetworkWired}/></div>
               <span>{item.channel_name}</span>
            </div>
          )
        })}
        {sessionStorage.getItem('email') === sessionStorage.getItem('cadmin') ? 
        <div className={styles.Cpconcchbt}>
          <div onClick={() => props.crch()}>Create Channel</div>
        </div>
        : null }
      </div>
    </div>
  )
}

export default CommunityProfile;