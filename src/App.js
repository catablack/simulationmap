import React from 'react';
import GoogleMapReact from 'google-map-react';
import './App.css';
import { data } from "./data";

class App extends React.Component {

  static defaultProps = {
    center: {
      lat: 45.6580,
      lng: 25.6012
    },
    zoom: 7
  };


  constructor(props) {
    super(props);

    this.state = { startSimulation: false, index: 0, list: null, currentCity: data[0].data[0], showInfo: 'none', };
  }

  handleMouseOver(param) {

    this.setState({ showInfo: 'block', currentCity: param });
  }

  render() {

    let point = [];
    let total = 0;

    if (this.state.list) {
      for (var i = 0; i < this.state.list.data.length; i++) {

        let dat = this.state.list.data[i];
        total += dat.population;

        point.push(
          (
            <div key={i} className="circle"
              style={{ height: this.state.list.data[i].population, width: this.state.list.data[i].population }}
              lat={this.state.list.data[i].lat}
              lng={this.state.list.data[i].long}
              onMouseOver={this.handleMouseOver.bind(this, dat)}
              onMouseLeave={() => {
                this.setState({ showInfo: 'none' });
              }}
            >
            </div>
          )
        );
      }
    }

    return (

      <div style={{ height: '100vh', width: '100%' }}>


        {this.state.list != null ? (<div className="title" style={{ display: this.state.startSimulation ? 'block' : 'none' }}>
          <p className="year">Year: {this.state.list.year}</p>
          <p className="year">Total: {total}</p>
        </div>) : null}

        <div className="info" style={{ display: this.state.showInfo }}>
          <p className="infoTitle">{this.state.currentCity.city}</p>
          <p className="infoData">{this.state.currentCity.population}</p>
        </div>

        <button className="btn" type="button" style={{ display: this.state.startSimulation ? 'none' : 'block' }}
          onClick={() => {
            this.setState({ startSimulation: true, list: data[0] });

            var interval = window.setInterval(() => {
              if (this.state.index < data.length - 1)
                this.setState(
                  {
                    index: this.state.index + 1,
                    list: data[this.state.index + 1],
                  }
                );
              else {
                alert("Simulation Over");
                this.setState({ startSimulation: false, list: null, showInfo: 'none'});
                window.clearInterval(interval);
               
              }
            }, 5000);
          }}
        >

          <span>Play Simulation</span>
        </button>

        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyC1WfPEGUW8PXJxAI6mXaeUKafK6pgQtPE" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={{fullscreenControl: false}}
        >

          {point}

        </GoogleMapReact>
      </div>
    );
  }
}

export default App;
