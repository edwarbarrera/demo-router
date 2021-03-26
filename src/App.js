import './App.css';
import {Link,Route} from 'react-router-dom';
import Produits from './Produits';
import Categories from './Categories';
import ProduitForm from './ProduitForm';


function App() {
  return (
    <div className="App">
      <header className="App-header">
       <Link to="/produits" > Produits</Link> {/* cree un lien vet l url */}
       <Link to="/categories">Categories</Link>
       <Link to="/formulaireProduit">Formulaire produit</Link>
     

      </header>
      <main>
        <Route  path="/produits" component={Produits}/>
        <Route  path="/categories" component={Categories}/>
        <Route  path="/formulaireProduit" component={ProduitForm}/>
      </main>
    </div>
  );
}

export default App;
