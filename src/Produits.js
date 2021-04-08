import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import FicheProduit from './FicheProduit';
import ProduitForm from './ProduitForm';
import ProduitListe from './ProduitListe';
import SearchBar from './SearchBar';
import ProduitService from './ProduitService'
import AuthService from './AuthService';
export default class Produits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            produits: [],
            produitsCount: 0,
            produitsCountParPrix: 0,
            currentPage : 0,
            parPage: 10,
            pageCount: 1,
            motCle: "",
            min:0,
            max:50,
            categorie:0


        }
    }
    setCurrentPage = (currentPage)=>{
        console.log(currentPage);
        this.setState({currentPage: currentPage});
        this.getProduits(currentPage, this.state.parPage, this.state.motCle);
      }

      getProduits=(numeroPage=this.state.currentPage, parPage=this.state.parPage, motCle="", categorie=this.state.categorie, min=this.state.min, max=this.state.max)=>{ 
        ProduitService.getProduits(numeroPage, parPage, motCle, categorie, min, max).then((response)=>{
            console.log(response.data);
            this.setState({produits: response.data})
          }, (error)=>{
            console.log(error);
          })
        }
        findAllProduitsByPrix=(numeroPage=this.state.currentPage, parPage=this.state.parPage, min=this.state.min, max=this.state.max)=>{ 
          ProduitService.findAllProduitsByPrix(numeroPage, parPage, min,max).then((response)=>{
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
          getProduitsCountParPrix = (min={},max={})=>{
            fetch(`http://localhost:8080/api/public/countParPrix?min=${min}&max=${max}`, {
                  method: "GET"
                })
                .then((data)=>{
                    console.log(data);
                    return data.json()
                  })
                .then((res)=> {
                  console.log(res);
                  this.setState({
                    produitsCountParPrix: res.produitsCompteurParPrix,
                    pageCount: Math.ceil(res.produitsCompteurParPrix/ this.state.parPage)
                    }
                  )
                })
          }
    
    
    
        save = (produit)=>{
        //ajout d'un nouveau produit
        console.log(produit);
        if (!produit.id_produit) {
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
            }else{
              alert(error.message)}
          })
        }
        }

      //  delete = (produitId)=>{//productId = 2 => products=[1,3]
          delete = (id_produit)=>{
            ProduitService.deleteProduit(id_produit).then((response)=>{
              console.log("Produits/deleteProduit -> response : "+response.data);
              this.getProduitsCount();
              this.props.history.push(`/produits?currentPage=${this.state.pageCount-1}&motCle=${this.state.motCle}`)
              this.setCurrentPage(this.state.pageCount-1)
            }, (error)=>{
              console.log("Produits/createProduit -> error : " +error);
              if (error.response) {
                if (error.response.status === 403) {
                  alert("Accès refusé : Connectez-vous en tant qu'Employé pour supprimer un produit")
                  this.props.history.push(`/login`)
                }
              }
            })
            }
          
    search = (motCle, categorie, min, max)=>{
        this.getProduits(0, this.state.parPage, motCle, categorie, min, max);
        this.getProduitsCount(motCle);
        this.setState({motCle: motCle, categorie: categorie, min: min, max: max, currentPage: 0});
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
      const isEmploye = AuthService.isEmploye(this.props.currentUser);
        return (
            <React.Fragment>
              <section>
                <div className="App-header">
                    {(isEmploye && <Link to={this.props.match.url + '/create'}><button className ="Add-Button">Créer un produit</button></Link>)}
                    
                    <SearchBar searchCallback={this.search} searchParPrixCallback={this.searchParPrix} annulerSearchCallback={this.clearSearchWord}annulerSearchParPrixCallback={this.clearSearchParPrix}/>
                </div>
                <Switch>
                    <Route path={this.props.match.path + '/create'} render={
                        (props)=> <ProduitForm {...props}  saveCallback={this.save} />
                    } />
                   < Route path={this.props.match.path + '/edit/:id'} render={
                        (props)=> <ProduitForm {...props}  saveCallback={this.save} />
                    } />
                    <Route path={this.props.match.path + '/:id'} component={FicheProduit} />
                    <Route path={this.props.match.path + '/:id'} render={
                        (props)=> <ProduitForm {...props}  saveCallback={this.save} />
                    } />
                    <Route path={this.props.match.path + '/'} render={
                        (props)=> <ProduitListe {...props} 
                                        currentUser={this.props.currentUser}
                                        motCle={this.state.motCle}
                                        search={this.search}
                                        searchParPrix={this.searchParPrix}
                                        clearSearchWord={this.clearSearchWord}
                                        clearSearchParPrix ={this.clearSearchParPrix}
                                        produits={this.state.produits}
                                        produitsCount={this.state.produitsCount}
                                        produitsCountParPrix={this.state.produitsCountParPrix}
                                        currentPage={this.state.currentPage} 
                                        parPage={this.state.parPage} 
                                        pageCount={this.state.pageCount} 
                                        setCurrentPage={this.setCurrentPage} 
                                        deleteCallback={this.delete}  
                                        addToCart={this.props.addToCart}  />
                    } />
                </Switch>
                </section>
                
            </React.Fragment>
        )
    }
    componentDidMount(){ this.getProduitsCount();
       
        
    }
} 
