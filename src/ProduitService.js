import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:8080/api';

class ProduitService {
  getProduits(numeroPage, parPage, motCle) {
    return axios.get(API_URL + `/public/produits?numeroPage=${numeroPage}&parPage=${parPage}&motCle=${motCle}`);
  }
  
  createProduit(produit) {
    console.log("ProduitService -> createProduit");
    return axios.post(API_URL + '/employe/produits/create', 
                produit, { headers: authHeader() });
  }

  modifProduit(produit) {
    console.log("ProduitService -> modifProduit");
    return axios.put(API_URL + '/employe/produits/edit/' +produit.id_produit, 
                produit, { headers: authHeader() });
  }

  /* getAdminBoard() {
    return axios.get(API_URL + 'gerant', { headers: authHeader() });
  } */
}

export default new ProduitService();
