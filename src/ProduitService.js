import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:8080/api';

class ProduitService {
  getProduits(numeroPage, parPage, motCle) {
    return axios.get(API_URL + `/public/produits?numeroPage=${numeroPage}&parPage=${parPage}&motCle=${motCle}`);
  }

  createProduit(produit) {
    return axios.post(API_URL + '/employe/produits/create', 
                produit, { headers: authHeader() });
  }
  getAllProduitsByPrix(numeroPage, parPage, min, max) {
    return axios.get(API_URL + `/public/produits/recherchePrix?numeroPage=${numeroPage}&parPage=${parPage}&min=${min}&max=${max}`);
  }
  /* getAdminBoard() {
    return axios.get(API_URL + 'gerant', { headers: authHeader() });
  } */
}

export default new ProduitService();
