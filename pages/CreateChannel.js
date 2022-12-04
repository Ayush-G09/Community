import styles from '../styles/CreateChannel.module.css'
import { faNetworkWired, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'

function CreateChannel(props) {

    var headers = {
        'Authorization': `Bearer ${sessionStorage.getItem("access")}`
    }

    async function CreCh() {
        var Chname = document.getElementById('Chname');
        if(Chname.value === '')
        {
            alert("Enter channel name.")
        }
        else
        {
            var data = {channel_name: Chname.value, community: sessionStorage.getItem('cname'), channel_admin: sessionStorage.getItem('cadmin')};
            console.log(data);
            const request = await axios.post('https://web-production-b59e.up.railway.app/community/channels/', data, {headers: headers});
            console.log(request);
            if(request.status === 200)
            {
                alert("Channel created succesfully.");
                props.close();
            }
        }
    }

  return (
    <div className={styles.Chcon}>
        <div className={styles.Chconh}>
            <div className={styles.Chconhi}>
                <div>
                    <FontAwesomeIcon icon={faNetworkWired}/>
                </div>
            </div>
            <span>Create Channel</span>
            <div className={styles.Chconhx}>
                <FontAwesomeIcon icon={faXmark} onClick={() => props.close()}/>
            </div>
        </div>
        <div className={styles.Chconc}>
            <label>Channel Name</label>
            <input placeholder='Your Awesome Channel Name' id='Chname'></input>
            <div onClick={() => CreCh()}>Create Channel</div>
        </div>
    </div>
  )
}

export default CreateChannel