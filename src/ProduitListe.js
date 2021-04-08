import React from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { button } from 'react-validation/build/button';

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
        const isEmploye = this.props.currentUser && this.props.currentUser.roles.includes("ROLE_EMPLOYE" &&  "ROLE_USER");
        return (
            <React.Fragment>
                {!!this.props.motCle && (<div>{this.props.produitsCount} produit(s) trouvés. Voici les résultats pour le mot-clé "{this.props.motCle}"</div>)}
                <ReactPaginate
                    previousLabel={<button> {"← Previous"}</button>}
                    nextLabel={<button>{"Next →"}</button>}
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
                <table>
                    <thead>
                        <tr> 
                             <th>image</th>
                            <th>id</th>
                            <th>nom</th>
                            <th>prix</th>
                            <th>cat nom</th>
                            <th>cat id</th>
                            
                            
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.produits.map((p) => {
                            return (<tr key={p.id_produit}> 
                            <img src={p.url_image} alt="" width="50" height="50" />
                                <td>{p.id_produit}</td>
                                <td>{p.nom}</td>
                                <td>{p.prix_actuel}</td>
                                <td>{p.categorie.libelle}</td>
                                <td>{p.categorie.id_categorie}</td>
                                
                                <td>
                                    <Link to={this.props.match.url + '/'+p.id_produit}>Afficher</Link>
                                    <button onClick={()=>this.props.addToCart(p)}>Ajouter au panier</button>
                                    <Link style={isEmploye ? {}: {display:'none'}} to={this.props.match.url + '/edit/'+p.id_produit}>Modifier</Link>
                                    <button style={isEmploye ? {}: {display:'none'}}  onClick={() => this.props.deleteCallback(p.id_produit)}>Supprimer</button>
                                    
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </table>
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