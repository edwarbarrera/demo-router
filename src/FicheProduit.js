import React from 'react';




export default class FicheProduit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message:"",
            produitNul:false,
            id_incorrect:false,
            produit: {
                id_produit : "",
                nom : "",
                quantite : "",
                description : "",
                url_image : "",
                id_categorie : "",
                prix_actuel : "",
                categorie:{
                    id_categorie: "",
                    libelle: ""
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
                               <h2>Référence produit :{this.state.produit.id_produit}</h2>
                               <h2>Categorie :{this.state.produit.categorie.libelle} {this.state.produit.categorie.id_categorie}</h2>
                               <div><img src={this.state.produit.url_image} alt="" width="150" height="150" /></div> 
                            </div>
                            <h2>{this.state.produit.nom}</h2>
                            <div>
                                {this.state.produit.nom}
                            </div>
                            <div>
                              Disponibles en stock :  {this.state.produit.quantite + " exemplaires"}
                            </div>
                            <div>
                                {this.state.produit.description}
                            </div>
                            <div>
                            Prix :  {this.state.produit.prix_actuel+" \u20AC"}
                            </div>
                            
                            <button>Ajouter au panier</button>
                          
                        </div>
                        <div id="message_produit">
                            {this.state.message}
                        </div>

                    </React.Fragment>)
                    }
        }
                    
                    

    
    componentDidMount() {
        const id = this.props.match.params.id;
        fetch("http://localhost:8080/produits/"+id, {
            method: "GET",
                headers: { "Content-type": "application/json" ,"Access-Control-Allow-Origin" :"*"},
            
        })
            .then((response) =>{
                if(response.ok){
                    response.json().then(data=> this.setState({ produit: data }))
                }
                else{
                    if(response.status===400)
                    {this.setState({ id_incorrect: true })}
                    else if(response.status===404){
                    this.setState({ produitNul: true })
                      console.log("response.status :" +response.status);}
                }
            });
    }

}
