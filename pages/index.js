import Head from 'next/head'
import styles from '../styles/Home.module.css'
import bg from '../public/logo.png'
import g from '../public/web.png'
import query from '../public/ques.gif'
import bored from '../public/bored.gif'
import correct from '../public/correct.gif'
import help from '../public/help.gif'
import interest from '../public/interest.gif'
import organization from '../public/organization.gif'
import devices from '../public/dev.jpg'
import { faXmark, faLock, faEnvelope, faUser, faCakeCandles, faMobile} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Home() {

  const router = useRouter();

  function OpenDashboard() {
    router.push("/Dashboard");
  }

  function CloseForm()
  {
    if(process.browser){
      document.getElementById("form").style.display = "none";
      LoginForm();
    }
  }

  function OpenForm()
  {
    if(process.browser){
      document.getElementById("form").style.display = "flex";
    }
  }

  function SignupForm(){
    if(process.browser){
      document.getElementById("loginform").style.display = "none";
      document.getElementById("signupform").style.display = "flex";
      document.getElementById("loginhead").innerText = "Signup";
    }
  }

  function LoginForm(){
    if(process.browser){
      document.getElementById("loginform").style.display = "flex";
      document.getElementById("signupform").style.display = "none";
      document.getElementById("loginhead").innerText = "Login";
    }
  }

  async function OnRegistrationClick(){
    var Name = document.getElementById("nameid").value;
    var D = document.getElementById("dateid").value;
    var year = D.slice(0, 4);
    var month = D.slice(5, 7);
    var day = D.slice(8, 10);
    var Dob = day.concat("-", month, "-", year);
    var Email = document.getElementById("emailid").value;
    var Mobile = document.getElementById("mobileid").value;
    var Password = document.getElementById("passwordid").value;
    var ConfirmPassword = document.getElementById("confirmpasswordid").value;
    var data = {name: Name, email: Email, DOB: Dob, mobile: Mobile, password: Password};
    var validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var validMobileRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if(Email.match(validEmailRegex))
    {
      if(Mobile.match(validMobileRegex))
      {
        if(Password === ConfirmPassword)
        {
          const request = await axios.post("https://web-production-b59e.up.railway.app/register/", data);
          if(request.data.errors === undefined)
          {
            alert("Succesfully Registered");
            LoginForm();
          }
          else
          {
            alert("Email id is already registered");
          }
        }
        else
        {
          alert("Password does't match.")
        }
      } 
      else
      {
        alert("Invalid Mobile Number.")
      }
    }
    else
    {
      alert("Invalid email address.")
    }
  }

  async function loginclick() {
    var Email = document.getElementById("loginemailid").value;
    var Password = document.getElementById("loginpassid").value;
    var data = {email: Email, password: Password};
    var rd = true;
    const request = await axios.post("https://web-production-b59e.up.railway.app/login/", data)
    .catch((e) => {
      if(e.message === "Request failed with status code 401")
      {
        alert("Invalid Credentials.");
        rd = false;
      }
    })
    if(rd)
    {
      sessionStorage.setItem("name", request.data.name);
      sessionStorage.setItem("access", request.data.access);
      sessionStorage.setItem("email", request.data.email);
      sessionStorage.setItem("mobile", request.data.mobile);
      sessionStorage.setItem("role", request.data.superuser);
      sessionStorage.setItem("relo", "true");
      alert("Succesfully Logedin.")
      OpenDashboard();
      console.log(request)
    }
    console.log(request);
  }

  return (
    <>
    <div className={styles.loginsignup} id="form">
      <div className={styles.loginsignupcon} id="formcon">
        <div className={styles.loginheader}>
          <div className={styles.loginhead} id="loginhead">Login</div>
          <div className={styles.formclose}>
            <div onClick={() => CloseForm()}>
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>
        </div>
        <div className={styles.loginsignupconborder}></div>
        <div className={styles.loginform} id="loginform">
          <form className={styles.form}>
            <div className={styles.formcontent}>
              <div><FontAwesomeIcon icon={faEnvelope} /></div>
              <input type="email" placeholder="Email" id="loginemailid"></input>
            </div>
            <div className={styles.formcontent}>
              <div><FontAwesomeIcon icon={faLock}/></div>
              <input type="password" placeholder="Password" id="loginpassid"></input>
            </div>
            <div className={styles.loginbtn} onClick={() => loginclick()}><h2>Login</h2></div>
            <div className={styles.notaccount} onClick={() => SignupForm()}>Did't have an account / Signup</div>
          </form>
        </div>
        <div className={styles.signupform} id="signupform">
          <form className={styles.form2}>
            <div className={styles.signupformcon1}>
              <div className={styles.signupformcon11}>
                <div><FontAwesomeIcon icon={faUser}/></div>
                <input type="text" placeholder="Name" className={styles.input} id="nameid"></input>
              </div>
              <div className={styles.signupformcon11}>
                <div><FontAwesomeIcon icon={faCakeCandles}/></div>
                <input type="date" className={styles.date} id="dateid"></input>
              </div>
            </div>
            <div className={styles.signupformcon1}>
              <div className={styles.signupformcon11}>
                <div><FontAwesomeIcon icon={faEnvelope}/></div>
                <input type="email" placeholder="Email" className={styles.input} id="emailid"></input>
              </div>
              <div className={styles.signupformcon11}>
                <div><FontAwesomeIcon icon={faMobile}/></div>
                <input type="text" placeholder="Mobile Number" className={styles.input} id="mobileid"></input>
              </div>
            </div>
            <div className={styles.signupformcon1}>
              <div className={styles.signupformcon11}>
                <div><FontAwesomeIcon icon={faLock}/></div>
                <input type="password" placeholder="Password" className={styles.input} id="passwordid"></input>
              </div>
              <div className={styles.signupformcon11}>
                <div><FontAwesomeIcon icon={faLock}/></div>
                <input type="password" placeholder="Confirm Password" className={styles.input} id="confirmpasswordid"></input>
              </div>
            </div>
            <div className={styles.signupbtn} onClick={() => OnRegistrationClick()}><h2>Register</h2></div>
            <div className={styles.notaccount} onClick={() => LoginForm()}>Already have an account / Login</div>
          </form>
        </div>
        <div className={styles.square4}></div>
        <div className={styles.square3}></div>
        <div className={styles.square}></div>
        <div className={styles.square2}></div>
      </div>
    </div>
    <div className={styles.maincontainer}>
      <Head>
        <title>Community</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <div className={styles.header}>
        <div className={styles.logo}>Community</div>
        <div className={styles.loginbt} onClick={() => OpenForm()}>
          <h2>Login</h2>
        </div>
      </div>

      <div className={styles.con1}>
        <div className={styles.con11}>
          <div style={{backgroundImage: `url(${bg.src})`}} className={styles.con111}></div>
        </div>
        <div className={styles.con12}>One platform for all your</div>
        <div className={styles.con13}>community needs</div>
      </div>

      <div className={styles.con2}>
        <div className={styles.con21}>
          <div className={styles.con211}>
            <div style={{backgroundImage: `url(${g.src})`}} className={styles.con211gif}></div>
          </div>
        </div>
        <div className={styles.con22}>
          <div className={styles.con221}>Designed for all usecases</div>
          <div className={styles.con222}>From open discussion to gated content. Create different groups for all kind of use case, like coaching, mentoring, courses, forums etc</div>
          <div className={styles.con223}>Replaces</div>
          <div className={styles.con224}>Slack OR Discord OR Forum</div>
        </div>
      </div>

      <div className={styles.con3}>
        <span>The Whole Package</span>
      </div>

      <div className={styles.con4}>
        <div className={styles.card}>
          <div style={{backgroundImage: `url(${query.src})`}} className={styles.cardimg}></div>
          <div className={styles.cardcontent}>
            <h2>Have a query ?</h2>
            <span>Find the answer with the intellectual community members.</span>
          </div>
        </div>

        <div className={styles.card2}>
          <div style={{backgroundImage: `url(${help.src})`}} className={styles.cardimg}></div>
          <div className={styles.cardcontent}>
            <h2>Learn from anywhere | Get help here !</h2>
            <span>Connect with the community based on your interest to discuss about it based on your current knowledge.</span>
          </div>
        </div>

        <div className={styles.card}>
          <div style={{backgroundImage: `url(${correct.src})`}} className={styles.cardimg}></div>
          <div className={styles.cardcontent}>
            <h2>Answers from community !</h2>
            <span>Get answers from the community members joined with the same interest.</span>
          </div>
        </div>
      </div>

      <div className={styles.con4}>
        <div className={styles.card2}>
          <div style={{backgroundImage: `url(${organization.src})`}} className={styles.cardimg}></div>
          <div className={styles.cardcontent}>
            <h2>Organization community !</h2>
            <span>Oorganization communities to make organization's people connect.</span>
          </div>
        </div>

        <div className={styles.card}>
          <div style={{backgroundImage: `url(${bored.src})`}} className={styles.cardimg}></div>
          <div className={styles.cardcontent}>
            <h2>Bored ?</h2>
            <span>Play bite sized fun games.</span>
          </div>
        </div>

        <div className={styles.card2}>
          <div style={{backgroundImage: `url(${interest.src})`}} className={styles.cardimg}></div>
          <div className={styles.cardcontent}>
            <h2>Interest based communities !</h2>
            <span>Join the community made over your interest and talk with the peoples having same interest.</span>
          </div>
        </div>
      </div>

      <div className={styles.con5}>
        <div className={styles.con51}>
          <h2>Get it on your device</h2>
          <span>Easily accessible on every devices install Progressive Web App in our computers or install mobile application through google play store.</span>
        </div>
        <div className={styles.con52}>
          <div className={styles.con521}>
            <div style={{backgroundImage: `url(${devices.src})`}} className={styles.con522}></div>
          </div>
        </div>
      </div>

      <div className={styles.con6}>
        <div className={styles.con61}></div>
        <div className={styles.con62}>
          <div style={{backgroundImage: `url(${bg.src})`}} className={styles.con621}></div>
          <div className={styles.con622}>Community</div>
          <div className={styles.con623}>Made with ❤️ in India</div>
        </div>
      </div>

    </div>
    </>
  )
}
