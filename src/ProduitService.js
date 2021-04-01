import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:8080/api/';

class ProduitService {
  getProduits(numeroPage, parPage, motCle) {
    return axios.get(API_URL + `/public/produits?numeroPage=${numeroPage}&parPage=${parPage}&motCle=${motCle}`);
  }

  createProduit(produit) {
    return axios.post(API_URL + 'employe/produits/create', 
                produit, { headers: authHeader() });
  }

  /* getAdminBoard() {
    return axios.get(API_URL + 'gerant', { headers: authHeader() });
  } */
}

export default new ProduitService();
