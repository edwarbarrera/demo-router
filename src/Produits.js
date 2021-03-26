import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FicheProduit from './FicheProduit';
import ProduitAffiche from './ProduitAffiche';
import ProduitForm from './ProduitForm';


export default class Produits extends React.Component {
    

    render() {
        console.log(this.props.match);

        return (
            <React.Fragment>
                
                <Switch>{/*affiche la premiere des routes qui match l ordre des routes a une importance capitale 
                mettre les specifiques  premier,  et les generiaques a la fin*/}
                  <Route path={this.props.match.path + '/create'} component={ProduitForm} />
                    <Route path={this.props.match.path + '/edit/:id_produit'} component={ProduitForm} />
                    <Route path={this.props.match.path + '/:id'} component={FicheProduit} />
                    <Route path={this.props.match.path + '/'} component={ProduitAffiche} />{/** affiche la liste par defaut si url vide  sauf si mot clef exact avant le path*/}
                </Switch>
            </React.Fragment>
        )
    }
}