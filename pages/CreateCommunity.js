import styles from '../styles/CreateCommunity.module.css'
import { faCodePullRequest, faXmark, faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import axios from 'axios';

function CreateCommunity(props) {

    var headers = {
        'Authorization': `Bearer ${sessionStorage.getItem("access")}`
    }

    const [iconf, setIconf] = useState(null);
    const [posterf, setPosterf] = useState(null);

    function handleIconFile(e) {
        const previewImage = document.getElementById('icon');
        let file = e.target.files[0];
        setIconf(file);
        if(file) {
            const reader = new FileReader();
            previewImage.style.display = "flex";
            reader.addEventListener("load", function() {
                previewImage.setAttribute("src", this.result);
            });

            reader.readAsDataURL(file);
        }
        
    }

    function handlePosterFile(e) {
        const previewImage = document.getElementById('poster');
        let file = e.target.files[0];
        setPosterf(file);
        if(file) {
            const reader = new FileReader();
            previewImage.style.display = "flex";
            reader.addEventListener("load", function() {
                previewImage.setAttribute("src", this.result);
            });

            reader.readAsDataURL(file);
        }
    }

    async function OnRegister() {
        var name = document.getElementById('comname');
        var desc = document.getElementById('comdesc');
        if(name.value === "")
        {
            alert("Enter community name");
        }
        else
        {
            if(desc.value === "")
            {
                alert("Enter community description");
            }
            else
            {
                if(iconf === null)
                {
                    alert("Select a community icon");
                }
                else
                {
                    if(posterf === null)
                    {
                        alert("Select a community poster");
                    }
                    else
                    {
                        const formdata = new FormData();
                        formdata.append('icon', iconf);
                        formdata.append('poster', posterf);
                        formdata.append('community_name', name.value);
                        formdata.append('description', desc.value);
                        formdata.append('community_admin', sessionStorage.getItem('email'));
                        const request = await axios.post('https://web-production-b59e.up.railway.app/community/', formdata, {headers: headers});
                        console.log(request);
                        if(request.status === 200)
                        {
                            alert("Community requested succesfully.");
                            props.close();
                        }
                    }
                }
            }
        }
    }

  return (
    <div className={styles.Cccon}>
        <div className={styles.Ccconh}>
            <div className={styles.Ccconhi}>
                <div>
                    <FontAwesomeIcon icon={faCodePullRequest}/>
                </div>
            </div>
            <span>Create Community</span>
            <div className={styles.Ccconhx}>
                <FontAwesomeIcon icon={faXmark} onClick={() => props.close()}/>
            </div>
        </div>
        <div className={styles.Ccconf}>
            <div className={styles.Ccconf1}>
                <label>Community Name</label>
                <input placeholder='Your Awesome Community' id='comname'></input>
            </div>
            <div className={styles.Ccconf2}>
                <label>Community Description</label>
                <textarea placeholder='An Attractive Description' id='comdesc'></textarea>
            </div>
            <div className={styles.Ccconf3}>
                <div className={styles.Ccconf31}>
                    <div className={styles.Ccconf313}>Community Icon</div>
                    <div className={styles.Ccconf311}>
                        <FontAwesomeIcon icon={faCloudArrowUp}/>
                        <img src='' id='icon' className={styles.imagepreviewimage}></img>
                    </div>
                    <div className={styles.Ccconf312}>
                        <input type='file' name='ifile' onChange={(e) => handleIconFile(e)}></input>
                    </div>
                </div>
                <div className={styles.Ccconf31}>
                    <div className={styles.Ccconf313}>Community Poster</div>
                    <div className={styles.Ccconf311p}>
                        <FontAwesomeIcon icon={faCloudArrowUp}/>
                        <img src='' id='poster' className={styles.imagepreviewimage}></img>
                    </div>
                    <div className={styles.Ccconf312}>
                        <input type='file' name='pfile' onChange={(e) => handlePosterFile(e)}></input>
                    </div>
                </div>
            </div>
            <div className={styles.Ccconf4}>
                <div onClick={() => OnRegister()}>Create Community</div>
            </div>
        </div>
    </div>
  )
}

export default CreateCommunity