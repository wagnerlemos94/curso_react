import React from 'react';

import Login from '../views/Login';
import CadastroUsuario from '../views/CadastroUsuario';

import { Route, Switch, HashRouter} from 'react-router-dom';
import Home from '../components/Home';



function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />
            </Switch>
        </HashRouter>
    );
}

export default Rotas;