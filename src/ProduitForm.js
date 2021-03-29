import React from 'react';




export default class ProduitForm extends React.Component {
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
    }
    // la double negation cree un boolean initié  a true par defaut undefined, nuul, false ou zero donne un boolean false 

    handleChange = (evt) => {
        console.log("evt:"+evt);
        evt.persist();
        let field = evt.target.name;
        let value = evt.target.value;
        this.setState((state) => state[field] = value);
        // this.setState((state)=>state[evt.target.name] = evt.target.value)


    }
    save = (evt) => {
        console.log("Dans save...");
        
        evt.preventDefault();//on desactive l action par defaut du navigateur pour l evenement onclick de bouton de formulaire
        let categorie = {
            id_categorie : this.state.id_categorie
        }
        let produit = {
            id: this.state.id_produit,
            nom: this.state.nom,
            quantite:  this.state.quantite,
            description: this.state.description,
            url_image: this.state.url_image,
            categorie:categorie,
            prix_actuel: this.state.prix_actuel
        }
        console.log("produit : " + produit.nom);
        this.saveBdd(produit);
    }




    saveBdd = (produit) => {
        console.log("saving....");
        if (!produit.id_produit) {
            //product.id = this.state.productId;
            fetch("http://localhost:8080/produits", {
                method: "POST", 
                headers: { "Content-type": "application/json"},
                body: JSON.stringify(produit)
            }).then((data) => data.json())
                    console.log("saved");
                }else {
                    fetch(`http://localhost:8080/produits/${this.props.match.params.id}`, {
                        method: "PUT",
                        headers: {"Content-type": "application/json" },
                        body: JSON.stringify(produit)
                    })
                        .then((data) => data.json())
                        .then((res) => this.setState(
                            {
                                produits: this.state.produits.map((p) => p.id === produit.id_produit ? res : p),
                                startEditing: false
                            }
                        ))
                }
                this.props.history.push('/Produits');
            }


     cancel = () => {
              this.props.history.push('/Produits');
            }


    render() {

        const edit = !!this.props.match.params.id;
        return (
            <div className="add-box">
                <h2>Ajouter un produit</h2>
                <form>
                    <div className="champ" style={edit ? {} : { display: 'none' }}></div>
                    <label>   id :</label>
                    <input name="id_produit" readOnly value={this.props.match.params.id} />
                   {/*value  avec le statte du this product permet de preremplir le formulaire*/}
                    <input type="text" name="nom" value={this.state.nom} placeholder="nom" onChange={this.handleChange} />
                    <input type="text" name="id_categorie" value={this.state.id_categorie} placeholder="catégorie" onChange={this.handleChange} />
                    <input type="number" name="quantite" value={this.state.quantite} placeholder="Prix" onChange={this.handleChange} />
                    <input type="text" name="description" value={this.state.description} placeholder="description" onChange={this.handleChange} />
                    <input type="text" name="url_image" value={this.state.url_image} placeholder="image" onChange={this.handleChange} />

                    <a href onClick={this.save}>
                    <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Valider    
                    </a>
                    <a href className="Annuler" onClick={this.cancel}>  <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                         Annuler
                        </a>
                   {/*  <button onClick={this.props.save}>Enregistrer</button>
                    <button onClick={this.props.cancelCallback}>Annuler</button> */}
                </form>
            </div>
        );
    }

/* 
    componentDidMount() {
        const id = this.props.match.params.id;
        fetch("http://localhost:8080/produits/"+ id, {
                method: "post"
               
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
                      console.log(response.status);}
                }
            });
    } */

}
