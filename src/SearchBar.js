import React from 'react';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            motCle: "",
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

    render(){
      return (
        <div>
          <input type="text" name="motCle" onChange={this.handleChange} value={this.state.motCle}/>
          <button onClick={this.search}>Rechercher</button>
          <button onClick={this.annuler}>Annuler</button>
        </div>)
    }
  }

    