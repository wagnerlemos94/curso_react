import React from 'react';

import Login from '../views/Login';
import CadastroUsuario from '../views/CadastroUsuario';

import { Route, Switch, HashRouter} from 'react-router-dom';



function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuario" component={CadastroUsuario} />
            </Switch>
        </HashRouter>
    );
}

export default Rotas;