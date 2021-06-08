import React from 'react';

import './App.css';
import { Link, Route } from 'react-router-dom';
import Produits from './Produits';
import Categories from './Categories';
import Login from './Login';
import AuthService from './AuthService';
import Panier from './Panier';
import AccessDenied from './AccessDenied';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
      panier: [],
      panierCount: 0
    }
  }

  addToCart = (produit) => {
    this.setState({ panierCount: this.state.panierCount + 1 })
    let newProduit = true;

    this.state.panier.forEach(p => {
      console.log(p)
      if (p.product.id_produit === produit.id_produit) {
        newProduit = false;
      }
    })
    this.setState((state) => {
      if (newProduit) {
        const lignePanier = { product: produit, quantite: 1 };
        state.panier = [...state.panier, lignePanier];
      }
      else {

        state.panier = state.panier.map((p) => {
          p.product.quantite = produit.id_produit === p.product.id_produit ? p.quantite + 1 : p.quantite;
          return p;
        })
      }
    })
  }


  deleteFromCart = (produit) => {
    console.log("delete product id_produit", produit)
    const lignePanier = { product: produit, quantite: 0 };
    this.state.panier = [...this.state.panier, lignePanier];
    this.setState((state) => state.panier = state.panier.filter((p) => p.id_produit !== p.product.id_produit))

  }

  editCartItem = (produitId, quantite) => {
    this.setState((state) => state.panier = state.panier.map((p) => {
      p.quantite = p.product.id === produitId ? quantite : p.quantite;
      return p;
    }
    ))
  }

  deleteAllFromCart = () => {
    this.setState((state) => state.panier = [])
  }



  setCurrentUser = (user) => {
    console.log(user);
    this.setState({ currentUser: user })
  }

  logOut = () => {
    AuthService.logout();
  }


  render() {
    return (
      <nav className="App">
        <header className="App-header">
          <nav>
            <Link to="/produits?currentPage=0">Produits</Link>

            <Link to="/categories">Categories</Link>

            <Link to="/panier">Panier ({this.state.panier.length})</Link>
            {(this.state.currentUser) && <div>
              <span>Vous êtes connecté entant que : {this.state.currentUser.username} | </span>
              <a href="/login" className="nav-link" onClick={this.logOut}>
                Se déconnecter
                </a>
            </div>}
            {(!this.state.currentUser) && <Link to="/login">Se connecter</Link>}
          </nav>
        </header>
        <main>
          <Route path="/produits" render={(props) => <Produits {...props} addToCart={this.addToCart} currentUser={this.state.currentUser} />} />
          <Route path="/panier" render={(props) => <Panier {...props} panier={this.state.panier} deleteFromCart={this.deleteFromCart} editCartItem={this.editCartItem} deleteAllFromCart={this.deleteAllFromCart} />} />
          {/* <Route path="/categories" component={Categories}/> */}
          <Route exact path="/login" render={(props) => <Login {...props} setCurrentUser={this.setCurrentUser} />} />
          <Route path="/access_denied" component={AccessDenied} />
        </main>
      </nav>
    );
  }
  componentDidMount() {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    this.setState({ currentUser: AuthService.getCurrentUser(), panier: panier })
  }
  
  componentDidUpdate() {
    console.log("componentDidUpdate");
    localStorage.setItem("panier", JSON.stringify(this.state.panier));
  }
}

export default App;
