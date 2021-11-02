import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom'
import './App.css'
import Home from './Components/Home/Home';
import NavBar from './Components/NavBar/NavBar';
import GameList from './Components/GameList/Gamelist';
class App extends React.Component {

  constructor(props){
    super(props)
    this.state={

    }
  }
  
  render(){
    return (
      <BrowserRouter>
        <Route path='/' exact >
          <Home/>
        </Route>
        <Route path = '/home' > 
          <NavBar/> 
        </Route>
        <Route path = '/home/GamesList'>
          <GameList/>
        </Route>
      </BrowserRouter>
    );
}
}
export default App;
