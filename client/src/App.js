import React from 'react';
import { Redirect } from 'react-router';
import {Route, BrowserRouter} from 'react-router-dom'
import './App.css'
import Home from './Components/Home/Home';
import NavBar from './Components/NavBar/NavBar';
import GameList from './Components/GameList/Gamelist';
import AddGame from './Components/AddGame/AddGame';
import Falla from './Falla/Falla';

class App extends React.Component {

  constructor(props, context){
    super(props)
    this.state={
      props:props
    }
  }
  
  render(){
    return (
      <BrowserRouter>
        <Route path='/' exact >
          <Redirect to="/home"/>
        </Route>
        <Route path='/home' exact >
          <Home/>
        </Route>
        <Route path = '/home/GamesList/'>
          <NavBar/> 
          <GameList/>
        </Route>
        <Route path ="/home/About_Us">
          <NavBar/> 
        </Route>
        <Route path = '/home/AddGame'>
          <NavBar/> 
          <AddGame/>
        </Route>
        <Route path = '/ErrorPage'>
          <NavBar/> 
          <Falla/>
        </Route>
      </BrowserRouter>
    );
}
}
export default App;
