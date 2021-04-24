import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft, faCircle, faDotCircle, faHome } from '@fortawesome/free-solid-svg-icons'
import './App.css';

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

function Page({id, color, vw, vh, content}) {
  return (
    <div id={id} style={{position: "relative", backgroundColor: color, width: vw, height: vh}}>
      {content}
    </div>
  );
}

function Bio() {
  return (
    <div style={{display: "flex", justifyContent: "space-around", width: "100vw", position: "absolute", top: "10%"}}>
      <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
        <div style={{width: "200px"}}>
          <img style={{borderRadius: "50%", width: "100%", height: "100%"}} alt="#" src="https://media-exp1.licdn.com/dms/image/C4D03AQEdRXe2FK6u-g/profile-displayphoto-shrink_800_800/0/1607029086697?e=1624492800&v=beta&t=P8HGRFutZWMdY5Sr7S3FSAH8ZGzfhtAQ10Pa8JI_JdM" />
        </div>
        <div style={{fontSize: "40px"}}>
          {/* Hi, I'm Keira! 
          Blah blah blah.*/}
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
    
  const pages = [
    {
      color: "beige",
      vw: dimensions.width,
      vh: dimensions.height,
      content: (<Bio />),
    }, {
      color: "green",
      vw: dimensions.width,
      vh: dimensions.height,
      content: null,
    }, {
      color: "purple",
      vw: dimensions.width,
      vh: dimensions.height,
      content: null,
    }, {
      color: "red",
      vw: dimensions.width,
      vh: dimensions.height,
      content: null,
    }  
  ].map((val, ind) => (<Page id={ind} color={val.color} vw={val.vw} vh={val.vh} content={val.content}/>))
  
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
