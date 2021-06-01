import React from 'react';

import {Link, Route} from 'react-router-dom';
import Produits from './Produits';
import Categories from './Categories';
import Login from './Login';
import AuthService from './AuthService';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentUser : undefined,
      
    }
  }
  
  setCurrentUser = (user)=>{
    console.log(user);
    this.setState({currentUser: user})
  }

  logOut = () =>{
    AuthService.logout();
  }

  render(){
    return (
      <nav className="App">
        <header className="App-header">
          <nav>
          <Link to="/produits?currentPage=0"><button className="liens">Produits</button></Link>
          <Link to="/categories"><button className="liens">Categories</button></Link>
          
          {(this.state.currentUser) && <div>
                                        <span>Vous êtes connecté entant que : {this.state.currentUser.username} | </span>
                                        <a href="/login" className="nav-link" onClick={this.logOut}>
                                        <button className="connexion">Se déconnecter</button>
                                        </a>
                                      </div>}
          {(!this.state.currentUser) && <Link to="/login">Se connecter</Link>}
          </nav>
        </header>
        <main>
          <Route path="/produits" render={(props)=> <Produits {...props} currentUser={this.state.currentUser} />}/>
          <Route path="/categories" component={Categories}/>
          <Route  path="/login" render={(props)=> <Login {...props} setCurrentUser={this.setCurrentUser} />}/>
          
        </main>
              </nav>
    );
  }
  componentDidMount(){
    this.setState({currentUser : AuthService.getCurrentUser()})
  }
  
}

export default App;
