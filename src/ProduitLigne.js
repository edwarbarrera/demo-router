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

    }showForm = (produit) => {
        this.setState({ startEditing: true, produit: produit });

    }

    render() {
        let produit = this.props.produit;
        return (
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
        );
    }
}