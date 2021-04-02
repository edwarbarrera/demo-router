import React from 'react';
<<<<<<< HEAD
import { Route} from 'react-router-dom';
import CategorieForm from './CategorieForm';
=======
>>>>>>> master


export default class Categories extends React.Component{
    render(){
<<<<<<< HEAD
        return (
            <React.Fragment>
                <switch>
                    <Route path={this.props.match.path +'createCategorie'} component={CategorieForm}/>
                </switch>
            </React.Fragment>
        );
=======
        return ("liste des categories");
>>>>>>> master
    }
}