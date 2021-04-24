import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft, faCircle, faDotCircle, faHome } from '@fortawesome/free-solid-svg-icons'
import './App.css';

import Doublet from './Doublet'

function Page({id, color, vw, vh}) {
  return (
    <div id={id} style={{backgroundColor: color, width: vw, height: vh}}>
      text
      <Doublet text="I am not groot" url="testimage.png" imageleft={false} />
    </div>
  );
}

function App() {
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  const [index, setIndex] = useState(0);
  const pages = [
    {
      color: "green",
      vw: vw,
      vh: vh,
    }, {
      color: "purple",
      vw: vw,
      vh: vh,
    }, {
      color: "red",
      vw: vw,
      vh: vh,
    }, {
      color: "cyan",
      vw: vw,
      vh: vh,
    }
  ].map((val, ind) => (<Page id={ind} color={val.color} vw={val.vw} vh={val.vh}/>))

  const scrool = (i) => {
    document.getElementById(i).scrollIntoView({behavior: "smooth"});
  };

  useEffect(() => {
    scrool(index);
  }, [index])

  return (
    <div style={{width: vw, padding: 0, margin: 0, overflowX: "hidden"}}>
      <div id="viewer" style={{display: "flex", width: pages.length*vw, padding: 0, margin: 0}}>
        {pages}
      </div>
      <div style={{width: "100%", position: "absolute", bottom: 40, display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
        <div>
          <a class="controlIcon" onClick={() => setIndex((pages.length + index - 1) % pages.length)}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </a>
          {pages.map((val, ind) => (<a class="controlIcon" onClick={() => setIndex(ind)}>
            <FontAwesomeIcon icon={(ind == 0) ? faHome : (ind == index) ? faDotCircle : faCircle} color={(ind == index ? "white" : "black")}/>
          </a>))}
          <a class="controlIcon" onClick={() => setIndex((pages.length + index + 1) % pages.length)}>
            <FontAwesomeIcon icon={faArrowRight} onMouse />
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
