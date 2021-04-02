import React from 'react';




export default class ProduitLigne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            id_produit: "",
            nom: "",
            quantite: "",
            description: "",
            url_image: "",
            id_categorie: "",
            prix_actuel: "",
        }

<<<<<<< HEAD
    } showForm = (produit) => {
=======
    }showForm = (produit) => {
>>>>>>> master
        this.setState({ startEditing: true, produit: produit });

    }

    render() {
        let produit = this.props.produit;
        return (
<<<<<<< HEAD
            (this.state.networkError ?
                <p>Problème de connexion</p> :
                <React.Fragment>


                    <section id="produits">
                        <img src={this.props.produit.url_image} alt="" width="50" height="50" />
                        <div>{this.props.produit.nom}</div>
                        <div>{this.props.produit.quantite + " exemplaires"}</div>
                        <div>{this.props.produit.description}</div>
                        <div>{this.props.produit.prix_actuel + " \u20AC"} </div>
                        <div>{this.props.produit.categorie.libelle}</div>
                       {/*  <div>
                            <button onClick={() => this.state.showForm(produit.id_produit)} > modifier</button>
                            <button onClick={() => this.props.deleteCallback(produit.id_produit)}>supprimer</button>
                        </div> */}
                    </section>

                </React.Fragment>
            )
=======
            (this.state.networkError ? 
                <p>Problème de connexion</p> :
                <React.Fragment>
                  

            <tr>
                <td><img src={this.props.produit.url_image} alt="" width="50" height="50" /></td>
                <td>{this.props.produit.nom}</td>
                <td>{this.props.produit.quantite}</td>
                <td>{this.props.produit.description}</td>
                <td>{this.props.produit.prix_actuel}</td>
                <td>{this.props.produit.categorie.libelle}</td>
                <td>
                    <button onClick={()=>this.state.showForm(produit.id_produit)} > modifier</button>
                    <button onClick={()=>this.props.deleteCallback(produit.id_produit)}>supprimer</button>
                </td>
            </tr>
           
                </React.Fragment>
              )
>>>>>>> master
        );
    }
}