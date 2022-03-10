import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import './App.css';
import Authenticate from './components/Authenticate';
import CreatePlasticCards from './components/CreatePlasticCards';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       
      {/* <div className='header'>
      <NavLink exact activeClassName='active' to='/home'>Home <small></small> </NavLink>  
        <NavLink activeClassName='active' to='/login'>Login</NavLink>  
        <NavLink activeClassName='active' to='/dashboard'>Dashboard</NavLink>  
      </div> */}
      <div className='content'>
        <Switch>
          <Route exact path='/' component={Authenticate} />  
          <Route path='/login' component={Login} />  
          <Route path='/register' component={Register} />  
          <Route path='/home' component={Home} />  
          <Route path='/plasticcards' component={CreatePlasticCards} />  
          <Route path='/dashboard' component={Dashboard} />  
        </Switch>  
      </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
