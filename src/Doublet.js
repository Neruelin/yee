import React from 'react';
import './Doublet.css';

class Doublet extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      text: this.props.text ? this.props.text : "info info info info",
      url: this.props.url,
      imageleft: this.props.imageleft? this.props.imageleft : false,
    }
  }

  render(){
    return (
      <div>
        { this.state.imageleft? (
            <div className="DoubletContainer">
              <div className="DoubletImageLeft">
                <img src={this.state.url} alt="PlaceURLHere"/>
              </div>
              <div className="DoubletTextRight">
                {this.state.text}
              </div>
            </div>
          ):
          (
            <div className="DoubletContainer">
              <div className="DoubletTextLeft">
                {this.state.text}
              </div>
              <div className="DoubletImageRight">
                <img src={this.state.url} alt="PlaceURLHere"/>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

export default Doublet;
