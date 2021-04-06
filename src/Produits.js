import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import FicheProduit from './FicheProduit';
import ProduitForm from './ProduitForm';
import ProduitListe from './ProduitListe';
import SearchBar from './SearchBar';
import ProduitService from './ProduitService'
export default class Produits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            produits: [],
            produitsCount: 0,
            currentPage : 0,
            parPage: 10,
            pageCount: 1,
            motCle: ""

        }
    }
    setCurrentPage = (currentPage)=>{
        console.log(currentPage);
        this.setState({currentPage: currentPage});
        this.getProduits(currentPage, this.state.parPage, this.state.motCle);
      }

      getProduits=(numeroPage=this.state.currentPage, parPage=this.state.parPage, motCle="")=>{ 
        ProduitService.getProduits(numeroPage, parPage, motCle).then((response)=>{
            console.log(response.data);
            this.setState({produits: response.data})
          }, (error)=>{
            console.log(error);
          })
        }
        getProduitsCount = (motCle="")=>{
            fetch(`http://localhost:8080/api/public/count?motCle=${motCle}`, {
                  method: "GET"
                })
                .then((data)=>{
                    console.log(data);
                    return data.json()
                  })
                .then((res)=> {
                  console.log(res);
                  this.setState({
                    produitsCount: res.produitsCompteur,
                    pageCount: Math.ceil(res.produitsCompteur / this.state.parPage)
                    }
                  )
                })
          }
    
    
    
    
        save = (produit)=>{
        //ajout d'un nouveau produit
        console.log(produit);
        if (!produit.id_produit) {
        //     fetch("http://localhost:8080/produits/create", {
        //     method: "POST",
        //     headers: {"Content-type": "application/json"},
        //     body: JSON.stringify(produit)
        //   })
        //   .then((data)=>data.json())
        //   .then((res)=>{
        //     this.setState({produits: this.state.produits.concat(res)})
        //     console.log(res)
        //     this.props.history.push("/produits")
        //   })
        // }
        ProduitService.createProduit(produit).then((response)=>{
            console.log("Produits/createProduit -> response : "+response.data);
            this.getProduitsCount();
            this.props.history.push(`/produits?currentPage=${this.state.pageCount-1}&motCle=${this.state.motCle}`)
            this.setCurrentPage(this.state.pageCount-1)
          }, (error)=>{
            console.log("Produits/createProduit -> error : " +error);
            if (error.response) {
              if (error.response.status === 403) {
                alert("Accès refusé : Connectez-vous en tant qu'Employé pour créer un produit")
                this.props.history.push(`/login`)
              }
            }
          })
        }
        else{
          ProduitService.modifProduit(produit).then((response)=>{
            console.log("Produits/modifProduit -> response : "+response.data);
            this.getProduitsCount();
            this.props.history.push(`/produits?currentPage=${this.state.pageCount-1}&motCle=${this.state.motCle}`)
            this.setCurrentPage(this.state.pageCount-1)
          }, (error)=>{
            console.log("Produits/modifProduit -> error : " +error);
            if (error.response) {
              if (error.response.status === 403) {
                alert("Accès refusé : Connectez-vous en tant qu'Employé pour modifier un produit")
                this.props.history.push(`/login`)
              }
            }
          })

            // fetch(`http://localhost:8080/api/employe/produits/edit/`, {//a rajouter id produit
            //   method: "PUT",
            //   headers: {"Content-type": "application/json"},
            //   body: JSON.stringify(produit)
            // })
            // .then((data)=>data.json())
            // .then((res)=> {
            //     this.setState(
            //       {
            //       produits: this.state.produits.map((p)=> p.id === produit.id_produit ? res : p)
            //       }
            //       )
            //       this.props.history.push(`/produits?currentPage=${this.state.currentPage}&motCle=${this.state.motCle}`)}
            //   )


           /*  ProduitService.getProduits().then((response)=>{
                console.log();
                this.setState({produits: res.data})
            }, (error)=>{})**/
          } 
        }

        delete = (produitId)=>{//productId = 2 => products=[1,3]
          
            fetch(`http://localhost:8080/api/employe/delete/produits/${produitId}`, {
              method: "DELETE"
            })
            .then((data)=>{
                console.log(data);
                if (data.status === 200) {
                    this.setState(
                        {produits : 
                          this.state.produits.filter((produit)=> produit.id !== produitId)})
                }
                else{
                    alert("Opération échouée!")
                }
                
            })
          }

          
    search = (motCle)=>{
        this.getProduits(0, this.state.parPage, motCle);
        this.getProduitsCount(motCle);
        this.setState({motCle: motCle, currentPage: 0});
        this.props.history.push(`/produits?currentPage=${this.state.currentPage}&motCle=${motCle}`);    
      }
      clearSearchWord = () =>{
        this.setState({motCle: ""});
        this.props.history.push(`/produits?currentPage=0`);    
        this.getProduits();
        this.getProduitsCount();
      }
    render() {
        console.log(this.props.match);
        console.log(this.state.produits);
        const isEmploye = this.props.currentUser && this.props.currentUser.roles && this.props.currentUser.roles.includes("ROLE_EMPLOYE");
       console.log("Produit -> Boolean isEmploye : "+isEmploye);
        return (
            <React.Fragment>
                <div className="App-header">
                    {(isEmploye && <Link to={this.props.match.url + '/create'}>Créer un produit</Link>)}
                    <SearchBar searchCallback={this.search} annulerSearch={this.clearSearchWord}/>
                </div>
                <Switch>
                    <Route path={this.props.match.path + '/create'} render={
                        (props)=> <ProduitForm {...props}  saveCallback={this.save} />
                    } />
                    <Route path={this.props.match.path + '/edit/:id'} render={
                        (props)=> <ProduitForm {...props}  saveCallback={this.save} />
                    } />
                    <Route path={this.props.match.path + '/:id'} component={FicheProduit} />
                    <Route path={this.props.match.path + '/'} render={
                        (props)=> <ProduitListe {...props} 
                                        currentUser={this.props.currentUser}
                                        motCle={this.state.motCle}
                                        search={this.search}
                                        clearSearchWord={this.clearSearchWord}
                                        produits={this.state.produits}
                                        produitsCount={this.state.produitsCount}
                                        currentPage={this.state.currentPage} 
                                        parPage={this.state.parPage} 
                                        pageCount={this.state.pageCount} 
                                        setCurrentPage={this.setCurrentPage} 
                                        deleteCallback={this.delete}  />
                    } />
                </Switch>
                
            </React.Fragment>
        )
    }
    componentDidMount(){ this.getProduitsCount();
       
        
    }
} 
