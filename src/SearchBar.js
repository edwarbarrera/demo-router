import React from 'react';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            motCle: "",
            id_categorie:0
        }
    }
    handleChange = (evt)=>{
      console.log(evt.target.name);
      console.log(evt.target.value);
      this.setState((state)=>state[evt.target.name] = evt.target.value)
    }
    search = (evt)=>{
      let motCle = this.state.motCle.trim();
      let categorie = this.state.id_categorie;
      console.log(categorie);
      // if(motCle.length > 0){
        this.props.searchCallback(motCle.toLowerCase(), categorie);
      // }
    }

    annuler = ()=>{
      this.setState((state)=>state.motCle = "")
      this.props.annulerSearch();
    }

    render(){
      return (
        <React.Fragment>
        <div>
          <input type="text" name="motCle" onChange={this.handleChange} value={this.state.motCle}/>
          <select name="id_categorie" value={this.state.id_categorie} onChange={this.handleChange}>
            <option value="0">Catégorie</option>
            <option value="1">roman</option>
            <option value="2">informatique</option>
            <option value="3">manga</option>
          </select>
          <button onClick={this.search}>Rechercher</button>
          <button onClick={this.annuler}>Annuler</button>
        </div>
        </React.Fragment>
        )
    }
  }

    