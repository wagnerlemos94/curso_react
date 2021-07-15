import React from 'react';

import Login from '../views/Login';
import CadastroUsuario from '../views/CadastroUsuario';

import { Route, Switch, HashRouter, Redirect} from 'react-router-dom';
import Home from '../components/Home';
import ConsultaLancamentos from '../views/lancamentos/Consulta-lancamento';
import CadastroLancamentos from '../views/lancamentos/Cadastro-lancamento';
import * as messages from '../components/toastr';
import { AuthConsumer } from './ProvedorAutenticacao';

function RotaAutenticada({ component: Component,isUsuarioAutenticado, ...props }){
    return(
        <Route {...props} render={(componentProps) => {
            if(isUsuarioAutenticado){
                return(
                    <Component {...componentProps} />
                );
            }else{
                return(
                    <Redirect to={{pathname: '/login', state:{from:componentProps.location}}}/>
                )
            }
        }} />
    );
}

function Rotas(props){
    return(
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />
                
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-lancamentos" component={ConsultaLancamentos} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-lancamentos/:id?" component={CadastroLancamentos} />
            </Switch>
        </HashRouter>
    );
}

export default () => (
    <AuthConsumer>
        { (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado}/>)}
    </AuthConsumer>
);