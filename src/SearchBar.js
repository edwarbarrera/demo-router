import React from 'react';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            motCle: "",
            min:"",
            max:""
        }
    }
    handleChange = (evt)=>{
      this.setState((state)=>state[evt.target.name] = evt.target.value)
    }
    search = (evt)=>{
      let motCle = this.state.motCle.trim();
      if(motCle.length > 0){
        this.props.searchCallback(motCle.toLowerCase());
      }
    }
   
    annuler = ()=>{
      this.setState((state)=>state.motCle = "")
      this.props.annulerSearch();
    }
    searchParPrix = (evt)=>{
      let min = this.state.min;
      let max=this.state.max;
      if(min > 0 && max<1000){
        this.props.searchCallback(min,max);
      }
    }
    annulerParPrix = ()=>{
      this.setState((state)=>state.min = "")
      this.setState((state)=>state.max = "")
      this.props.annulerSearch();
    }



    render(){
      return (
        <React.Fragment>
        <div>
          <input type="text" name="motCle" onChange={this.handleChange} value={this.state.motCle}/>
          <button onClick={this.search}>Rechercher</button>
          <button onClick={this.annuler}>Annuler</button>
          </div>
          <div>
          <input type="number" name="min" onChange={this.handleChange} value={this.state.min}/>
          <input type="number" name="max" onChange={this.handleChange} value={this.state.max}/>
          <button onClick={this.searchParPrix}>Rechercher par prix</button>
          <button onClick={this.annulerParPrix}>Annuler par prix</button>
        </div>
        </React.Fragment>)
    }
  }

    