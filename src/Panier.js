import React from 'react';

export default class Panier extends React.Component {
    constructor(props) {
        super(props);
    }
    handleChange=(event, id_produit)=>{
      this.props.editCartItem(id_produit, event.target.value);
    }
    render() {
        console.log("dans le panier",this.props.panier)
        return (
           
            <React.Fragment>
                <section id="produits">
                    
                    {this.props.panier.map((p) => {
                        
                        
                        return (
                            <section key={p.id_produit}>
                                <div><img src={p.product.url_image} height="150"/></div>
                                <section id="NamePriceQuantity">
                                    <div id="ProductName">{p.product.nom}</div>
                                    <div id="Price">Prix à l'unité : {p.product. prix_actuel}&euro;<br/>
                                                    Prix total : {p.product.prix_actuel*p.quantite}&euro;
                                    </div>
                                    <div id="Quantity">Quantite <input type="number" value={p.quantite} onChange={(e) => {(p.quantite<=0) ? this.props.deleteFromCart(p.id_produit) : this.handleChange(e, p.id_produit)}} /></div>
                                </section>
                                <div key={p.id_produit}><button id="DeleteProductCart" onClick={() => this.props.deleteFromCart(p.id_produit)}>Supprimer</button></div>
                            </section>)
                    }
                    )}
                </section>
                <button onClick={this.props.deleteAllFromCart}>Vider le panier</button>
                <button onClick={() => this.props.passerCommande(this.props.panier)}>Passer la commande</button>
            </React.Fragment>

        )
    }
    componentDidMount(){
    }   
    }
