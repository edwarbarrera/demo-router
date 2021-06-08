import React from 'react';
import AuthService from'./AuthService';




export default class ProduitForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            produit: {
                id_produit: null,
                nom: "",
                quantite: 0,
                description: "",
                url_image: "",
                prix_actuel: 0,
                categorie: {
                    id_categorie: 1,
                    libelle: ""
                }
            },
            categories: []
        }
        console.log(this.props.match.url);
    }
    
    cancel = (evt) => {
        evt.preventDefault();
        this.props.history.push("/produits");
    }
    save = (evt) => {
        evt.preventDefault();
        this.props.saveCallback(this.state.produit);
        console.log(this.state.produit);
       
    }
    handleChange = (event) => {
        if (event.target.name === "categorie") {
            this.setState((state) => {
                state.produit.categorie.id_categorie = event.target.value;
                let index = event.nativeEvent.target.selectedIndex;
                state.produit.categorie.libelle = event.nativeEvent.target[index].text;

            })
        }
        else { this.setState((state) => state.produit[event.target.name] = event.target.value) }
    }




    render() {

        const edit = !!this.props.match.params.id;
        const produit = this.state.produit || {};
        return (
            <React.Fragment>
                <section>
                <div className="add-box">
                    <h2>Ajouter un produit</h2>
                    <form>
                        <div className="champ" style={edit ? {} : { display: 'none' }}></div>

                        <div> <input name="id_produit" readOnly value={produit.id_produit ? produit.id_produit : 0} /></div>
                        {/*value  avec le statte du this product permet de preremplir le formulaire*/}
                        <div>
                            <input type="text" name="nom" value={produit.nom} placeholder="nom" onChange={this.handleChange} />
                        </div>
                        <div>
                            <input type="number" name="prix_actuel" value={produit.prix_actuel} placeholder="Prix" onChange={this.handleChange} />
                        </div>
                        <div>
                            <input type="text" name="description" value={produit.description} placeholder="description" onChange={this.handleChange} />
                        </div>
                        <div>
                            <input type="text" name="url_image" value={produit.url_image} placeholder="image" onChange={this.handleChange} />
                        </div>

                        <div>

                            categorie : <select name="categorie" id="" onChange={this.handleChange} defaultValue={produit.categorie.id || ""}>
                                {this.state.categories.map(cat => {
                                   //const selected = cat.id === produit.categorie.id_categorie ? { selected: "selected" } : {};
                                    return <option 
                                    key={cat.id_categorie} 
                                    value={cat.id_categorie}
                                     //{...selected}
                                    >{cat.libelle}</option>
                                })}
                            </select>
                        </div>

                        <div>
                            <button onClick={this.save}> {edit ? "Modifier" : "Créer"}</button>
                            <button onClick={this.cancel}>Annuler</button>
                        </div>

                    </form>
                </div>
                </section>
            </React.Fragment>
        );
    }


    componentDidMount() {
         // vérifier l'autorisation
         const currUser = AuthService.getCurrentUser();
         const isEmploye = AuthService.isEmploye(currUser);
         if (!isEmploye) {
             this.props.history.push("/access_denied")
         }
        const id = this.props.match.params.id;
        if (id) {
            console.log("id componentdidmount",id)
            fetch(`http://localhost:8080/api/public/produits/${id}`, {
                method: "GET"

            })
                .then((data) => {
                    console.log("data jason from produits",data);
                    return data.json()
                })
                .then((res) => {
                    console.log(res);
                    this.setState({
                        produit: res
                    })
                })
        }
//get categories
        fetch(`http://localhost:8080/categories/`, {
            method: "GET"
        })
            .then((data) => {
                console.log(data);
                return data.json()
            })
            .then((res) => {
                console.log(res);
                this.setState({
                    categories: res
                })
            })
    }

}
