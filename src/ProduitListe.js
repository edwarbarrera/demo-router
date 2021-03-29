import React from 'react';
import { Link } from 'react-router-dom';
import ProduitLigne from './ProduitLigne';


export default class ProduitListe extends React.Component {

    render() {
        return (
            <React.Fragment>
                {/* <Link to={this.props.match.url +'/create'} > Creer un produit</Link>  */}

                <table className="table">
                    <caption> Produits </caption>
                    <tr>
                        <th>id</th>

                    </tr>
                    {this.props.produits.map((produit) => {
                        return (
                            <React.Fragment>
                                <ProduitLigne key={produit.id_produit.toString()} produit={produit} />
                                <Link to={this.props.url + '/' + (produit.id_produit)} > <button className="afficherBoutton" type="button">Afficher</button></Link>
                                <Link to={this.props.url + '/edit/' + (produit.id_produit)} > <button className="modifierBoutton" type="button">Modifier</button></Link>
                            <button onClick={()=>this.props.deleteCallback(produit.id_produit)}>supprimer</button>
                            </React.Fragment>
                        );
                    })}
                </table>


            </React.Fragment>
        )

    }
}