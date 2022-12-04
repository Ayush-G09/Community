import styles from '../styles/Sidebar.module.css'
import { faRightFromBracket, faCodePullRequest, faGamepad} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

function Sidebar(props) {

    const router = useRouter();

    const [apreq, setApreq] = useState([]);
    var sarr = [];

    function SelectCom(name, id, admin) {
        sessionStorage.setItem('cname', name);
        sessionStorage.setItem('cid', id);
        sessionStorage.setItem('cadmin', admin);
    }

    function Logout() {
        sessionStorage.clear();
        router.push("/");
    }

    const [name, setName] = useState(null);
    useEffect(() => {
        if(name === null)
        {
            setName(sessionStorage.getItem("name"));
        }
        async function fetchCommunity() {
            const request = await axios.get('https://web-production-b59e.up.railway.app/community/')
            sarr = [];
            for(var a = 0; a < request.data.length; a++){
              if(request.data[a].approved === true)
              {
                if(props.r === "false")
                {
                    if(request.data[a].users.includes(sessionStorage.getItem("email")))
                    {
                        sarr.push(request.data[a]);
                    }
                }
                else
                {
                    sarr.push(request.data[a]);
                }
              }
            }
            setApreq(sarr);
        }
        fetchCommunity();
    })

  return (
    <div className={styles.Sbcon}>
        <div className={styles.Sbmcon}>
            <div className={styles.Sbmcon0}>
                <div className={styles.Sbmcon01}>
                    <img src='/logo.png'></img>
                </div>
                <div className={styles.Sbmcon02}>Community</div>
            </div>
            <div className={styles.Sbmcon1}>
                {props.r === "true" ?
                <div className={styles.Sbmcon10a} onClick={() => props.selectAr()}>
                    <div className={styles.Sbmcon11} id='box'>
                        <div className={styles.Sbmcon111a}>
                            <div>
                                <FontAwesomeIcon icon={faCodePullRequest}/>
                            </div>
                        </div>
                        <div className={styles.Sbmcon112a}>Community Request</div>
                    </div>
                </div> 
                : null }
                <div className={styles.Sbmcon10a} onClick={() => props.selectGame()}>
                    <div className={styles.Sbmcon11} id='boxb'>
                        <div className={styles.Sbmcon111b}>
                            <div>
                                <FontAwesomeIcon icon={faGamepad}/>
                            </div>
                        </div>
                        <div className={styles.Sbmcon112a}>Play Games</div>
                    </div>
                </div>
                {apreq.map((item, index) => {
                    return(
                        <div key={index} className={styles.Sbmcon10} onClick={() => {SelectCom(item.community_name, item.community_id, item.community_admin); props.selectCom()}}>
                            <div className={styles.Sbmcon11}>
                                <div className={styles.Sbmcon111}>
                                    <div>
                                        <img src={`https://communitywebapp.herokuapp.com${item.icon}`} className={styles.Image}></img>
                                    </div>
                                </div>
                                <div className={styles.Sbmcon112}>{item.community_name}</div>
                            </div>
                        </div>
                    )
                })}
                <div className={styles.Sbmcon1ccbtcon}>
                    <div onClick={() => props.crcom()}>Create Community</div>
                </div>
                {props.r === "true" ?
                null
                :
                <div className={styles.Sbmcon1ccbtcon}>
                    <div onClick={() => props.jc()}>Join Community</div>
                </div>
                }
            </div>
            <div className={styles.Sbmcon2}>
                <div className={styles.Sbmcon21}>
                    <div>
                        <img className={styles.Image} src='https://www.pngall.com/wp-content/uploads/12/Avatar-Profile.png' ></img>
                    </div>
                </div>
                <div className={styles.Sbmcon22}>Hi <br/> {name}</div>
                <div className={styles.Sbmcon23} onClick={() => Logout()}><FontAwesomeIcon icon={faRightFromBracket}/></div>
            </div>
        </div>
    </div>
  )
}

export default Sidebar