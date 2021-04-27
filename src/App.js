import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft, faCircle, faDotCircle, faHome } from '@fortawesome/free-solid-svg-icons'
import './App.css';
import Doublet from './Doublet'

function debounce(fn, ms) {
  let timer
  return _ => {
    clearTimeout(timer)
    timer = setTimeout(_ => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  };
}

function Page({id, zIndex, vw, vh, content, background}) {
  return (
    <div id={id} style={{zIndex: zIndex || 0, position: "relative", width: vw, height: vh - 60, overflow:"hidden", backgroundColor: background.color}}>
      <div style={{zIndex: -1, width: vw, height: vh - 60, position: "absolute", top: 0, left: 0, overflow:"hidden", display:"flex", justifyContent:"space-around"}}>
        {/* <img style={{objectFit: "cover", height: "100%"}} src="https://cdn.discordapp.com/attachments/456670054147293185/832401262912733254/TD17.gif"/> */}
        {(background.img) ? <img style={{objectFit: "cover", width:"100%"}} src="/zenkoLandscape.png"/> : <></>}
      </div>
      {content}
    </div>
  );
}

function Bio({setIndex}) {
  return (
    <div style={{position: "relative", height: "100%"}}>
      <div onClick={() => setIndex(1)} style={{ cursor: "pointer", position: "absolute", bottom: "80px", left: "30px", width: "300px", backgroundColor: "rgba(0,0,0,0.3)", fontWeight: "bolder", color: "white", padding: "10px  "}}>
        A Landscape From
        <img style={{width: "100%"}} src="/zenkoLogoTransparent.png"/>
        <span style={{position: "absolute", right: "65px", bottom: "25px", fontSize: "20px"}}>
          A Fox's Tale
        </span>
      </div>
      <div style={{position: "absolute", right: "0", height: "100%", width: "50%", backgroundColor: "rgba(0,0,0,0.5)"}}>
        <div style={{height: "100%", display:"flex", flexDirection:"column", alignItems:"center", padding: "10%", backgroundColor: "rgba(0,0,0,0.2)"}}>
          <div style={{width: "200px"}}>
            <img style={{borderRadius: "50%", border: "3px solid white", width: "100%", height: "100%"}} alt="#" src="https://media-exp1.licdn.com/dms/image/C4D03AQEdRXe2FK6u-g/profile-displayphoto-shrink_800_800/0/1607029086697?e=1624492800&v=beta&t=P8HGRFutZWMdY5Sr7S3FSAH8ZGzfhtAQ10Pa8JI_JdM" />
          </div>
          <div style={{marginTop: 10, fontSize: "30px", fontWeight: "bold", color: "white", fontFamily: "Ubuntu"}}>
            Hi! I’m Keira Taylor
          </div>
          <div style={{marginTop: 10, fontSize: "20px", fontWeight: "bold", color: "white", fontFamily: "Ubuntu"}}>
            I'm a passionate gamer, game programmer, and huge nerd.
            <br /><br />Ever since I played my first game, I’ve been entranced. I knew, starting in the fourth grade, that I wanted to be a game developer, and boy has it been a wild ride getting there! I graduated in 2019 from UCF with a Bachelor’s in Computer Science.
            <br /><br />From there I transitioned right across the city to their master’s program for game design, Florida Interactive Entertainment Academy. Throughout the last few years, I’ve made a variety of games of all different types, though my heart will always belong to strategy games.
            <br /><br />I’ve also created my own game engine, and gotten a little too close and personal to the computer through assembly x86. Working on games — especially UI, strategic mechanics, and level generation — is my favorite thing to do, and I can’t wait to make the next one!
          </div>
          <button onClick={() => setIndex(1)} style={{cursor: "pointer", position:"absolute", bottom: "50px", right:"50px", borderRadius: 0, border: "1px solid white", fontSize: 24, backgroundColor: "black", color: "white", padding: "5px", fontFamily: "Ubuntu"}}>
            Explore My Work
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [index, setIndex] = useState(0);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  })
  let zindex = 0;
  const pages = [
    { 
      zIndex: zindex++,
      vw: dimensions.width,
      vh: dimensions.height,
      content: (<Bio setIndex={setIndex} />),
      background: {
        color: null,
        img: "/zenkoLogoTransparent.png"
      }
    }, {
      zIndex: zindex++,
      vw: dimensions.width,
      vh: dimensions.height,
      content: (<Doublet text="I am not groot" url="testimage.png" imageleft={false} />),
      background: {
        color: "green",
        img: null
      }
    }, {
      zIndex: zindex++,
      vw: dimensions.width,
      vh: dimensions.height,
      content: null,
      background: {
        color: "purple",
        img: null
      }
    }, {
      zIndex: zindex++,
      vw: dimensions.width,
      vh: dimensions.height,
      content: null,
      background: {
        color: "red",
        img: null
      }
    }
  ].map((val, ind) => (<Page id={ind} zIndex={val.zIndex} vw={val.vw} vh={val.vh} content={val.content} background={val.background} />))

  const scrool = (i) => {
    document.getElementById(i).scrollIntoView({behavior: "smooth"});
  };

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }, 250)
    window.addEventListener('resize', debouncedHandleResize)
    return _ => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  })

  useEffect(() => {
    scrool(index);
  }, [index])

  return (
    <div class="wrapper" style={{width: dimensions.width}}>
      <div class="pageContainer" style={{width: pages.length*dimensions.width}}>
        {pages}
        {/* <Bio /> */}
      </div>
      <div class="controlsContainer">
        <div>
          <a href="#" class="controlIcon" onClick={() => setIndex((pages.length + index - 1) % pages.length)}>
            <FontAwesomeIcon icon={faArrowLeft} color={"black"}/>
          </a>
          {pages.map((val, ind) => (<a href="#" class="controlIcon" onClick={() => setIndex(ind)}>
            <FontAwesomeIcon icon={(ind === 0) ? faHome : (ind === index) ? faDotCircle : faCircle} color={(ind === index ? "white" : "black")}/>
          </a>))}
          <a href="#" class="controlIcon" onClick={() => setIndex((pages.length + index + 1) % pages.length)}>
            <FontAwesomeIcon icon={faArrowRight} color={"black"}/>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
