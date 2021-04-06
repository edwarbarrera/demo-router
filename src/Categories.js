import React from 'react';
import { Route} from 'react-router-dom';
import CategorieForm from './CategorieForm';


export default class Categories extends React.Component{
    render(){
        return (
            <React.Fragment>
                <switch>
                    <Route path={this.props.match.path +'createCategorie'} component={CategorieForm}/>
                </switch>
            </React.Fragment>
        );
    }
}