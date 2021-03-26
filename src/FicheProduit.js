import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';



export default class FicheProduit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message:"",
            produitNul:false,
            id_incorrect:false,
            produit: {
                id_produit : "",
                nom: "",
                categorie: {
                    id_categorie: "",
                    linelle: "",
                }
            }
        }
    }
    
        render() {
            if (this.state.produitNul) {return <p>le produit n existe pas !</p>}
            if(this.state.id_incorrect){return <p>le id du produit n existe pas !</p>}
            else {
               
                return(
                    <React.Fragment>
                        <div >

                            <div id="p.id_produit">
                                {this.state.produit.id_produit}
                            </div>
                            <div>
                                {this.state.produit.nom}
                            </div>
                            <div>
                                {this.state.produit.quantite}
                            </div>
                            <div>
                                {this.state.produit.description}
                            </div>
                            <div>
                                {this.state.produit.categorie.id_categorie}
                            </div>
                            <div>
                                {this.state.produit.categorie.libelle}
                            </div>
                            <td><img src={this.state.produit.url_image} width="50" height="50" /></td>
                        </div>
                        <div id="message_produit">
                            {this.state.message}
                        </div>

                    </React.Fragment>)
                    }
        }
                    
                    

    
    componentDidMount() {
        const id = this.props.match.params.id;
        fetch("http://localhost:8080/produits/" + id, {
            method: "GET"
        })
            .then((response) =>{
                if(response.ok){
                    response.json().then(data=> this.setState({ produit: data }))
                }
                else{
                    if(response.status==400)
                    {this.setState({ id_incorrect: true })}
                    else if(response.status==404){
                    this.setState({ produitNul: true })
                      console.log(response.status);}
                }
            });
    }

}
