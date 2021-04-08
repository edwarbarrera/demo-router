import React from 'react';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            motCle: "",
<<<<<<< HEAD
=======
            min:0,
            max:0,
>>>>>>> ed
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
<<<<<<< HEAD
      let categorie = this.state.id_categorie;
      console.log(categorie);
      // if(motCle.length > 0){
        this.props.searchCallback(motCle.toLowerCase(), categorie);
      // }
=======
      let categorie=this.state.id_categorie;
      console.log(categorie);
     // if(motCle.length > 0){
        this.props.searchCallback(motCle.toLowerCase(), categorie);
      //}
>>>>>>> ed
    }
   
    annuler = ()=>{
      this.setState((state)=>state.motCle = "")
      this.props.annulerSearchCallback();
    }
    searchParPrix = (evt)=>{
      let min= this.state.min;
      let max=this.state.max;
      if(min >= 0 && max<=1000){
        this.props.searchParPrixCallback(min,max);
      }
    }
    annulerParPrix = ()=>{
      this.setState((state)=>state.min =0)
      this.setState((state)=>state.max =0 )
      this.props.annulerSearchParPrixCallback();
    }



    render(){
      return (
        <React.Fragment>
        <div>
          <input type="text" name="motCle" onChange={this.handleChange} value={this.state.motCle}/>
          <select name="id_categorie" value={this.state.id_categorie} onChange={this.handleChange}>
<<<<<<< HEAD
            <option value="0">Catégorie</option>
=======
          <option value="0">Catégorie</option>
>>>>>>> ed
            <option value="1">roman</option>
            <option value="2">informatique</option>
            <option value="3">manga</option>
          </select>
          <button onClick={this.search}>Rechercher</button>
          <button onClick={this.annuler}>Annuler</button>
<<<<<<< HEAD
        </div>
        </React.Fragment>
        )
=======
          </div>
          <div>
          <input type="number" name="min"placeholder="prix minimun" onChange={this.handleChange} value={this.state.min}/>
          <input type="number" name="max"placeholder="prix maximun" onChange={this.handleChange} value={this.state.max}/>
          <button onClick={this.searchParPrix}>Rechercher par prix</button>
          <button onClick={this.annulerParPrix}>Annuler par prix</button>
        </div>
        </React.Fragment>)
>>>>>>> ed
    }
  }

    