import React from 'react';
import ProduitLigne from './ProduitLigne';


export default  class ProduitListe extends React.Component {
   
    render() {
        return (
            <React.Fragment>
            {/* <Link to={this.props.match.url +'/create'} > Creer un produit</Link>  */}
           
            <table className="table">
                    <caption> Produits </caption>
                    <tr>
                        <th>id</th>
                       
                    </tr>
                    {this.props.produits.map( (produit)=> {
                        return (
                           <ProduitLigne  key ={produit.id_produit.toString()} produit={produit} showForm={this.props.showForm} deleteCallback={this.props.deleteCallback}/>
                        );
                    })}
                </table>
                <button onClick={()=>this.props.showForm({})}> creer produit</button>
            
            </React.Fragment>
        )
        
    }
}