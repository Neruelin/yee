import { useState, useRef, useEffect } from 'react';
import './App.css';

function Page({id, color, vw, vh}) {
  return (
    <div id={id} style={{backgroundColor: color, width: vw, height: vh}}>
      text
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
      <div id="viewer" style={{display: "flex", width: 2*vw, padding: 0, margin: 0}}>
        {pages}
      </div>
      <div style={{width: "100%", position: "absolute", bottom: 20, display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
        <div>
          <a style={{padding: "0 10px", cursor: "pointer"}} onClick={() => setIndex(pages.length + index - 1 % pages.length)}>&lt;</a>
          {
            pages.map((val, ind) => (<a style={{padding: "0 10px", cursor: "pointer"}} onClick={() => setIndex(ind)}>O</a>))
          }
          <a style={{padding: "0 10px", cursor: "pointer"}} onClick={() => setIndex(pages.length + index + 1 % pages.length)}>&gt;</a>
        </div>
      </div>
    </div>
  );
}

export default App;
