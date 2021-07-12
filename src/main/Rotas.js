import React from 'react';

import Login from '../views/Login';
import CadastroUsuario from '../views/CadastroUsuario';

import { Route, Switch, HashRouter} from 'react-router-dom';
import Home from '../components/Home';
import ConsultaLancamentos from '../views/lancamentos/Consulta-lancamento';
import CadastroLancamentos from '../views/lancamentos/Cadastro-lancamento';



function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />
                <Route path="/consulta-lancamento" component={ConsultaLancamentos} />
                <Route path="/cadastro-lancamento" component={CadastroLancamentos} />
            </Switch>
        </HashRouter>
    );
}

export default Rotas;