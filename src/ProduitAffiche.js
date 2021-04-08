// import React from 'react';
// import { Link } from 'react-router-dom';
// import ProduitListe from './ProduitListe';




// export default class ProduitAffiche extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             netWorkError:false,
//             startEditing: false,
//             produit: {},
//             id_produit: 100,
//             produits: []

//         }
//     }
//     deleteProduit = (produitId => {
//         fetch(`http://localhost:8080/api/employe/delete/produits/${produitId}`, {
//             method: "DELETE", /*requete pour SUPPRIMER*/

//         }).then((data) => data.json)
//             .then((res) => this.setState(
//                 {
//                     produits:
//                         this.state.produits.filter((produit) => produit.id_produit !== produitId)
//                 }
//             ))
//     }
//     )

//     // showForm = (produit) => {
//     //     this.setState({ startEditing: true, produit: produit });

//     // }



//     // save = (produit) => {// ajoute d un nouveau produit
//     //     if (!produit.id_produit) {
//     //         //product.id = this.state.productId;
//     //         fetch("http://localhost:8080/produits", {
//     //             method: "POST", /*requete pour ajouter*/
//     //             headers: { "Content-type": "application/json" },
//     //             body: JSON.stringify(produit)/* resource a ajouter*/

//     //         })
//     //             .then((data) => data.json())
//     //             .then(
//     //                 (res) => {
//     //                     this.props.setState({
//     //                         produits: this.props.state.produits.concat(res),
//     //                         //productId: this.state.productId + 1, valable pour les versions avnt le serveur sera traité directement par le serveur 
//     //                         startEditing: false
//     //                     }
//     //                     );
//     //                     console.log(res)
//     //                 }
//     //             )
//     //             console.log("saved");
//     //     }
//     //     else {
//     //         fetch(`http://localhost:8080/produits/${produit.id_produit}`, {
//     //             method: "PUT", /*requete pour modfier*/
//     //             headers: { "Content-type": "application/json" },
//     //             body: JSON.stringify(produit)/* resource a ajouter*/
//     //         })
//     //             .then((data) => data.json())
//     //             .then((res) => this.setState(
//     //                 {
//     //                     produits: this.state.produits.map((p) => p.id === produit.id_produit ? res : p),
//     //                     startEditing: false
//     //                 }
//     //             ))
//     //     } /** si le product est modifie on garde product sinon on garde p */
//     // }

//     render() {
//         return (
//           (this.state.networkError ? 
//             <p>Problème de connexion</p> :
//             <React.Fragment>
              
//                 <Link to={this.props.match.url + '/create'} produits={this.state.produits} >creer un nouveau Produit Affiche</Link> 
                
//                 <ProduitListe url={this.props.match.url} produits={this.state.produits}  deleteCallback={this.deleteProduit} />
//             </React.Fragment>
//           )
//         );
//       }

//     componentDidMount = () => {
//         let promesse = fetch("http://localhost:8080/api/public/produits/");
//         promesse.then((data) => {
//             console.log(data);
//             return data.json()
//         }).then((res) => {
//             console.log(res);
//             this.setState({ produits: res })
//         })
//             .catch((err) => {
//                 console.log(err)
//                 this.setState({ netWorkError: true })
//             })
//     }
// }

