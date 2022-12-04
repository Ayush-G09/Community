import styles from '../styles/JoinCommunity.module.css'
import { faPlus, faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useEffect, useState } from 'react';

function JoinCommunity(props) {

    var headers = {
        'Authorization': `Bearer ${sessionStorage.getItem("access")}`
    }

    const [apreq, setApreq] = useState([]);
    var sarr = [];

    useEffect(() => {
        async function fetchCommunity() {
            const request = await axios.get('https://web-production-b59e.up.railway.app/community/')
            sarr = [];
            for(var a = 0; a < request.data.length; a++) {
                if(request.data[a].approved === true) {
                    if(!request.data[a].users.includes(sessionStorage.getItem("email")))
                    {
                        sarr.push(request.data[a]);
                    }
                }
            }
            setApreq(sarr);
        }
        fetchCommunity();
    })

    const truncate = (str, len) => {
        if (str.length > len) {
           if (len <= 3) {
              return str.slice(0, len - 3) + "...";
           }
           else {
              return str.slice(0, len) + "...";
           };
        }
        else {
           return str;
        };
    };

    async function join(id) {
        var data = {users: sessionStorage.getItem('email')};
        console.log(data);
        const request = await axios.post(`https://web-production-b59e.up.railway.app/community/users/${id}`, data, {headers: headers});
        if(request.status === 200)
        {
            alert("Channel joined succesfully.");
            props.close();
        }
    }

    const Search = () => {
        var sdata = document.getElementById('sdata').value.toUpperCase();
        var cname = document.getElementsByName('Jccondata21');
        var box = document.getElementsByName('Jccondata');
        for(var a = 0; a < cname.length; a++)
        {
            if(cname[a].innerHTML.toUpperCase().indexOf(sdata) > -1) {
                box[a].style.display = "flex";
            }
            else
            {
                box[a].style.display = "none";
            }
        }
    }

  return (
    <div className={styles.Jccon}>
        <div className={styles.Jcconh}>
            <div className={styles.Jcconhi}>
                <div>
                    <FontAwesomeIcon icon={faPlus}/>
                </div>
            </div>
            <span>Join Community</span>
            <div className={styles.Jcconhx}>
                <FontAwesomeIcon icon={faXmark} onClick={() => props.close()}/>
            </div>
        </div>
        <div className={styles.Jcconscon}>
            <div className={styles.Jcconsbox}>
                <input placeholder='Search your favourite community' onChange={Search} id='sdata'></input>
                <div>
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </div>
            </div>
        </div>
        <div className={styles.Jccondcon}>
            {apreq.map((item, index) => {
                return(
                    <div className={styles.Jccondata} key={index} name='Jccondata'>
                        <div className={styles.Jccondata1}>
                            <div></div>
                        </div>
                        <div className={styles.Jccondata2}>
                            <div className={styles.Jccondata21} name='Jccondata21'>{item.community_name}</div>
                            <div className={styles.Jccondata22}>{truncate(item.description, 90)}</div>
                        </div>
                        <div className={styles.Jccondata3}>
                            <div onClick={() => join(item.community_id)}>Join</div>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default JoinCommunity