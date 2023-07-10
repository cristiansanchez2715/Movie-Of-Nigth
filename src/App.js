import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import Window1 from './Window1';
import Window2 from './Window2';
import Window3 from './Window3';
import Funcionalidad from './Funcionalidad.js';
import { useState, React } from 'react';
import imagenFooter from './assets/maxresdefault.jpg'
import imagenFooterS from './assets/sin fondo/descarga__1_-removebg-preview.png'

//Clave API : 962d31215e50e4f741a0c6b45d2f62af

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <nav className='nav'>
          <ul className='windows'>
            <li>
              <Link className='window' to="" onClick={function(){
                window.location.assign('/window3');
              }}>Inicio</Link>
            </li>
            <li>
              <Link className='window' to="/window2" onClick={function(){
                window.location.assign('/window2');
              }}>Info</Link>
            </li>
            <li>
              <Link className='window' to="/funcionalidad" onClick={function(){
                window.location.assign('/funcionalidad');
              }}>Buscar</Link>
            </li>
          </ul>
        </nav>
        <Route exact path="/funcionalidad" component={Funcionalidad} />
        <Route exact path="/window2" component={Window2} />
        <Route exact path="/window3" component={Window3} />
      
      </BrowserRouter>
      <div className='footer-top-container'>
      <p className='int'>Welcome to --- in this web page with the use of TMDB Api will you can doing search the movie that you want.</p>
            
                <img className="footer-top" src={imagenFooterS}></img>
            </div>
        </div>

    
    
  );
}

export default App;