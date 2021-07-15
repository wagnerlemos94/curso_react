import React from 'react';
import Card from '../components/Card';
import FormGroup from '../components/Form-group';
import { withRouter } from 'react-router-dom';
import UsuarioSerice from '../app/service/usuarioService';
import { mensagemErro } from '../components/toastr';
import { AuthContext } from '../main/ProvedorAutenticacao';

class Login extends React.Component{

    state = {
        email: '',
        senha:'',
    }

    constructor(){
        super();
        this.service = new UsuarioSerice;
    }
    
    entrar = () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then(response => {
            this.context.iniciarSessao(response.data);
            this.props.history.push('/home')
        }).catch(erro => {
            mensagemErro(erro.response.data);
        });
    }

    prepareCadastrar = () => {
        this.props.history.push('/cadastro-usuarios');
    }

    render(){
        return(            
            <div className="row">
                <div className="col-md-6" style={ {position:'relative', left: '300px'}}>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                                <input type="email" className="form-control"
                                                value={this.state.email}
                                                onChange={e => this.setState({email: e.target.value})}
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp" placeholder="Digite o Email" />
                                            </FormGroup>

                                            <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                                <input type="password" className="form-control"
                                                value={this.state.senha}
                                                onChange={e => this.setState({senha: e.target.value})}
                                                id="exampleInputPassword1"
                                                aria-describedby="Password" placeholder="Password" />
                                            </FormGroup>

                                            <button onClick={this.entrar}
                                                type="button"
                                                className="btn btn-success">
                                                <i className="pi pi-sign-in"></i> Entrar
                                            </button>
                                            <button onClick={this.prepareCadastrar}
                                                type="button"
                                                className="btn btn-danger">
                                                <i className="pi pi-plus"></i>  Cadastrar
                                            </button>                                            
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

Login.contextType = AuthContext;

export default withRouter(Login); 