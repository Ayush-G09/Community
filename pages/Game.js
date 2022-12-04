import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../styles/Game.module.css'
import { faGamepad, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

function Game() {
    const [gameurl, setGameurl] = useState('');
    const [gamename, setGamename] = useState('');

    function OpenGame(url, name) {
        var gbox = document.getElementById('gbox');
        var pbox = document.getElementById('pbox');
        var gboxh = document.getElementsByName('gboxh');
        setGameurl(url);
        setGamename(name);
        gbox.style.width = '53%';
        pbox.style.display = 'flex';
        for(var i = 0; i < gboxh.length; i++)
        {
            gboxh[i].style.height = '70%';
        }
    }

    function CloseGame() {
        var gbox = document.getElementById('gbox');
        var pbox = document.getElementById('pbox');
        var gboxh = document.getElementsByName('gboxh');
        gbox.style.width = '79%';
        pbox.style.display = 'none';
        for(var i = 0; i < gboxh.length; i++)
        {
            gboxh[i].style.height = '90%';
        }
    }

  return (
    <>
    <div className={styles.Gcon} id='gbox'>
        <div className={styles.Gcon1}>
          <div className={styles.Gcon11}>
            <div>
              <FontAwesomeIcon icon={faGamepad}/>
            </div>
          </div>
          <div className={styles.Gcon12}>Play Games</div>
        </div>
        <div className={styles.Gcon2}>
            <div className={styles.Gcon21} name='gboxh'>
                <div className={styles.Gcon211} onClick={() => OpenGame('https://zv1y2i8p.play.gamezop.com/g/HkTQJhTXqRS', 'Boulder Blast')}>
                    <img className={styles.Image} src='https://static.gamezop.com/HkTQJhTXqRS/cover.jpg'></img>
                </div>
                <div className={styles.Gcon212}>Boulder Blast</div>
            </div>
            <div className={styles.Gcon21} name='gboxh'>
                <div className={styles.Gcon211} onClick={() => OpenGame('https://zv1y2i8p.play.gamezop.com/g/H1WmafkP9JQ', 'Tic Tac Toe')}>
                    <img className={styles.Image} src='https://static.gamezop.com/H1WmafkP9JQ/cover.jpg'></img>
                </div>
                <div className={styles.Gcon212}>Tic Tac Toe</div>
            </div>
            <div className={styles.Gcon21} name='gboxh'>
                <div className={styles.Gcon211} onClick={() => OpenGame('https://zv1y2i8p.play.gamezop.com/g/HJT46GkPcy7', 'Tower Twist')}>
                    <img className={styles.Image} src='https://static.gamezop.com/HJT46GkPcy7/cover.jpg'></img>
                </div>
                <div className={styles.Gcon212}>Tower Twist</div>
            </div>
            <div className={styles.Gcon21} name='gboxh'>
                <div className={styles.Gcon211} onClick={() => OpenGame('https://zv1y2i8p.play.gamezop.com/g/SyfxJ3a75Cr', 'Kingdom Fight')}>
                    <img className={styles.Image} src='https://static.gamezop.com/SyfxJ3a75Cr/cover.jpg'></img>
                </div>
                <div className={styles.Gcon212}>Kingdom Fight</div>
            </div>
        </div>
        <div className={styles.Gcon2}>
            <div className={styles.Gcon21} name='gboxh'>
                <div className={styles.Gcon211} onClick={() => OpenGame('https://zv1y2i8p.play.gamezop.com/g/rJJMVIa8p-x', 'Sticky Goo')}>
                    <img className={styles.Image} src='https://static.gamezop.com/rJJMVIa8p-x/cover.jpg'></img>
                </div>
                <div className={styles.Gcon212}>Sticky Goo</div>
            </div>
            <div className={styles.Gcon21} name='gboxh'>
                <div className={styles.Gcon211} onClick={() => OpenGame('https://zv1y2i8p.play.gamezop.com/g/r1K-J3TQ5Ar', 'Word Finder')}>
                    <img className={styles.Image} src='https://static.gamezop.com/r1K-J3TQ5Ar/cover.jpg'></img>
                </div>
                <div className={styles.Gcon212}>Word Finder</div>
            </div>
            <div className={styles.Gcon21} name='gboxh'>
                <div className={styles.Gcon211} onClick={() => OpenGame('https://zv1y2i8p.play.gamezop.com/g/rkWfy2pXq0r', 'Fruit Chop')}>
                    <img className={styles.Image} src='https://static.gamezop.com/rkWfy2pXq0r/cover.jpg'></img>
                </div>
                <div className={styles.Gcon212}>Fruit Chop</div>
            </div>
            <div className={styles.Gcon21} name='gboxh'>
                <div className={styles.Gcon211} onClick={() => OpenGame('https://zv1y2i8p.play.gamezop.com/g/B1gBpzJwqJQ', 'Pirate Hunt')}>
                    <img className={styles.Image} src='https://static.gamezop.com/B1gBpzJwqJQ/cover.jpg'></img>
                </div>
                <div className={styles.Gcon212}>Pirate Hunt</div>
            </div>
        </div>
    </div>
    <div className={styles.Gcon0} id='pbox'>
        <div className={styles.Gcon01}>
            <h1>{gamename}</h1>
            <span onClick={() => CloseGame()}><FontAwesomeIcon icon={faCircleXmark}/></span>
        </div>
        <div className={styles.Gcon02}>
            <iframe src={gameurl}> </iframe>
        </div>
    </div>
    </>
  )
}

export default Game