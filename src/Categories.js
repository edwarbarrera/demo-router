import React from 'react';
<<<<<<< HEAD
import { Route} from 'react-router-dom';
=======
import { Route } from 'react-router-dom';
>>>>>>> ed
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