import React from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './index.css';

export default class ProduitListe extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    handlePageClick = ({selected}) =>{
        console.log(selected+ "prev ou next");
        this.props.setCurrentPage(selected);
        this.props.history.push(this.props.match.url + "?currentPage="+selected+"&motCle="+this.props.motCle)
    }
    render() {
        console.log(this.props);
        let size = this.props.produits.length;
        const isEmploye = this.props.currentUser && this.props.currentUser.roles.includes("ROLE_EMPLOYE" &&  "ROLE_USER");
        return (
            <React.Fragment>
                {!!this.props.motCle && (<div>{size} produit(s) trouvés. Voici les résultats pour le mot-clé "{this.props.motCle}"</div>)}
                <ReactPaginate
                    previousLabel={"← Previous"}
                    nextLabel={"Next →"}
                    initialSelected={this.props.currentPage}
                    forcePage={this.props.currentPage}
                    pageCount={this.props.pageCount}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"pagination__link"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"pagination__link--active"}
                    
                />

                        {this.props.produits.map((produit) => {
                            return ( 
                            <section id="produits">
                            <section>
                            <img className="image" src={produit.url_image}></img>
                                <div><ul className="produits">
                                    <li>
                                    <div><h2>{produit.nom} - {produit.prix_actuel}€</h2></div>
                                    </li>
                                    </ul>
                                    <div>
                                    {produit.description}
                                    </div>
                                    <div>
                                    <div>
                                        <button className="Ajouter-Button" onClick={()=>this.props.addToCart(produit)}>Ajouter au panier</button>
                                    </div>
                                        <Link to={this.props.match.url + '/'+produit.id_produit}><button  className="Afficher-Button">Afficher</button></Link>
                                        <Link style={isEmploye ? {}: {display: "none" }} to={this.props.match.url + '/edit/'+produit.id_produit}><button className="Modifier-Button">Modifier</button></Link>
                                    <button className="Delete-Button" style={isEmploye ? {}: {display: "none" }}  onClick={() => this.props.deleteCallback(produit.id_produit)}>Supprimer</button>
                                    </div>
                                </div>
                            </section>
                            </section>)
                        })}
            </React.Fragment>

        )
    }
    componentDidMount(){
        console.log("ProduitList Componentdidmount called");
        let search = this.props.location.search;
        search = search.trim();
        search = search.split("&");
        let currPage = 0;
        let motCle = "";
        let min=0;
        let max=0;
        for (let index = 0; index < search.length; index++) {
            let temp = search[index].split("=");
            if (index === 0) {
                if(temp.length === 2){
                    currPage = temp[0].indexOf("currentPage") >= 0 ? temp[1] : 0;
                }
            }
            else if(index === 1){
                if(temp.length === 2){
                    motCle = temp[0].indexOf("motCle") >= 0 ? temp[1] : "";
                }
            }
        }
        if (motCle !== "") {
            this.props.search(motCle);
            this.props.history.push(this.props.match.url + "?currentPage="+currPage + "&motCle="+ motCle);
        }
       else if (this.props.prix_actuel>= min && this.props.prix_actuel<=max){
        this.props.searchParPrix(min, max);
        this.props.history.push(this.props.match.url +"?currentPage="+currPage + "&min="+ min+ "&max="+max);
       }

        else{
            this.props.setCurrentPage(parseInt(currPage));
            this.props.history.push(this.props.match.url + "?currentPage="+currPage)
        }
    }
}