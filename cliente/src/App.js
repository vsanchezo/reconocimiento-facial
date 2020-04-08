import React, { Component } from 'react';
import Navigation from './componentes/Navigation/Navigation'
import Logo from './componentes/Logo/Logo'
import ImageLinkForm from './componentes/ImageLinkForm/ImageLinkForm'
import Rank from './componentes/Rank/Rank'
import Registro from './componentes/Registro/Registro'
import Nuevo from './componentes/Nuevo/Nuevo'
import FaceRecognition from './componentes/FaceRecognition/FaceRecognition'
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

// initialize with your api key. This will also work in your browser via http://browserify.org/

const app = new Clarifai.App({
  apiKey: '2966704806bd49a29662d18fd86a4998'
});

const particlesOpt = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800
        }
      }
    }
}

class App extends Component{
  constructor(){
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: 'registro',
      estaActivo: false
    }
  }

  //para checar si funciona la conexion
  /*
  componentDidMount(){
    fetch('http://localhost:3000/')
    .then(response => response.json())
    .then(console.log());
  }*/

  calculateFaceLocation = (response) => {
    const cara = response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(cara);
    console.log(width, height);
    return{
      leftCol: cara.left_col * width,
      topRow: cara.top_row * height,
      rightCol: width - (cara.right_col * width),
      bottomRow: height - (cara.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});
    console.log('clic');
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
      (response) => {
        // do something with response
        console.log(response);
        this.displayFaceBox(
          this.calculateFaceLocation(response)
        );
      },
      (err) => {
        // there was an error
      }
    );
  }
//https://image.freepik.com/free-photo/hair-style-street-fashion-beautiful-girl_1139-844.jpg
  
onRouteChange = (route) => {
  if(route === 'afuera'){
    this.setState({estaActivo: false});
  }else if(route === 'home'){
    this.setState({estaActivo: true});
  }
  this.setState({route: route});
}

render(){
    return (
      <div className="App">
        <Particles className='particles' params={particlesOpt} />
        <Navigation estaActivo={this.state.estaActivo} onRouteChange={this.onRouteChange} />
        {this.state.route === 'home' 
        ?
        <div>
          <Logo />
          <Rank />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
          <FaceRecognition box={this.state.box} imageURL={this.state.imageURL} />
        </div>
        :
        (
          this.state.route === 'registro'
          ? <Registro onRouteChange={this.onRouteChange} />
          : <Nuevo onRouteChange={this.onRouteChange} />
        )
        }
      </div>
    );
  }
}

export default App;