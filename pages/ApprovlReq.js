import { useEffect, useState } from 'react'
import styles from '../styles/ApprovalReq.module.css'
import axios from 'axios'
import { faCircleXmark, faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faXmark, faCodePullRequest } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ApprovlReq() {

  const [apreq, setApreq] = useState([]);
  const [poster, setPoster] = useState('');
  const [icon, setIcon] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [Id, setId] = useState('');

  var headers = {
    'Authorization': `Bearer ${sessionStorage.getItem("access")}`
  }

  useEffect(() => {
    async function fetchCommunity() {
      const request = await axios.get('https://web-production-b59e.up.railway.app/community/')
      var sarr = [];
      for(var a = 0; a < request.data.length; a++){
        if(request.data[a].approved === false)
        {
          sarr.push(request.data[a]);
        }
      }
      setApreq(sarr);
    }
    fetchCommunity();
  })

  async function ApproveCommunity1(id) {
    var data = {approved: true}
    console.log(headers)
    const req = await axios.post(`https://web-production-b59e.up.railway.app/community/approve/${id}`, data, {headers: headers})
    console.log(req)
  }

  async function ApproveCommunity2() {
    var data = {approved: true}
    var id = Id;
    console.log(headers)
    const req = await axios.post(`https://web-production-b59e.up.railway.app/community/approve/${id}`, data, {headers: headers})
    console.log(req)
  }

  async function DeleteCommunity1(id) {
    const req = await axios.delete(`https://web-production-b59e.up.railway.app/community/${id}`, {headers: headers})
    console.log(req)
  }

  async function DeleteCommunity2() {
    var id = Id;
    const req = await axios.delete(`https://web-production-b59e.up.railway.app/community/${id}`, {headers: headers})
    console.log(req)
  }

  function SetProfileData(i) {
    setPoster(apreq[i].poster);
    setIcon(apreq[i].icon);
    setName(apreq[i].community_name);
    setDescription(apreq[i].description);
    setId(apreq[i].community_id);
    OpenPro(i);
  }

  function OpenPro() {
    var Arcon = document.getElementById('Arcon');
    var Arcon0 = document.getElementById('Arcon0');
    Arcon.style.width = '49%';
    Arcon0.style.display = 'flex';
  }

  function ClosePro() {
    var Arcon = document.getElementById('Arcon');
    var Arcon0 = document.getElementById('Arcon0');
    Arcon.style.width = '79%';
    Arcon0.style.display = 'none';
  }

  return (
    <>
    <div className={styles.Arcon} id='Arcon'>
      <div className={styles.Gcon1}>
        <div className={styles.Gcon11}>
          <div>
            <FontAwesomeIcon icon={faCodePullRequest}/>
          </div>
        </div>
        <div className={styles.Gcon12}>Community Requests</div>
      </div>
      {apreq.map((item, index) => {
        return(
          <div className={styles.Arcon1} key={index}>
            <div className={styles.Arcon10} onClick={() => SetProfileData(index)}>
              <div className={styles.Arcon10i}>
                <img src={`https://communitywebapp.herokuapp.com${item.icon}`} className={styles.Image}></img>
              </div>
            </div>
            <div className={styles.Arcon11} onClick={() => SetProfileData(index)}>
              <div className={styles.Arcon111}>{item.community_name}</div>
              <div className={styles.Arcon112}>
                <span>{item.description}</span>
              </div>
            </div>
            <div className={styles.Arcon12}>
              <div className={styles.Arcon121}><FontAwesomeIcon icon={faCircleXmark} onClick={() => DeleteCommunity1(item.community_id)}/></div>
              <div className={styles.Arcon122}><FontAwesomeIcon icon={faCircleCheck} onClick={() => ApproveCommunity1(item.community_id)}/></div>
            </div>
          </div>
        )
      })}
    </div>
    <div className={styles.Arcon0} id='Arcon0'>
      <div className={styles.Arcon01}>
        <img src={`https://communitywebapp.herokuapp.com${poster}`} className={styles.Image}></img>
        <div className={styles.Arcon011}>
          <img src={`https://communitywebapp.herokuapp.com${icon}`} className={styles.Image}></img>
        </div>
        <div className={styles.Arcon012} onClick={() => ClosePro()}><FontAwesomeIcon icon={faXmark}/></div>
      </div>
      <div className={styles.Arcon02}></div>
      <div className={styles.Arcon03}>{name}</div>
      <div className={styles.Arcon04}>
        <span>{description}</span>
      </div>
      <div className={styles.Arcon05}>
        <div className={styles.Arcon051}><FontAwesomeIcon icon={faCircleXmark} onClick={() => DeleteCommunity2()}/></div>
        <div className={styles.Arcon052}><FontAwesomeIcon icon={faCircleCheck} onClick={() => ApproveCommunity2()}/></div>
      </div>
    </div>
    </>
  )
}

export default ApprovlReq