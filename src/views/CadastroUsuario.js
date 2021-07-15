import React from 'react';

import Card from '../components/Card';
import FormGroup from '../components/Form-group';
import { withRouter } from 'react-router-dom';

import UsuarioSerice from '../app/service/usuarioService';
import { mensagemErro, mensagemSucesso } from '../components/toastr';


class CadastroUsuario extends React.Component{
    
    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor(){
        super();
        this.service = new UsuarioSerice();
    }

    cadastrar = () => {

        const {nome, email, senha, senhaRepeticao} = this.state;
        
        const usuario = {nome ,email , senha , senhaRepeticao }

        try{
            this.service.validar(usuario);
        }catch(erro){
            const msgs = erro.mensagens;

            msgs.forEach(msg => mensagemErro(msg));
            return false;
        }
        
        this.service.salvar(usuario).then(Response =>{
            mensagemSucesso("Usuario cadastrado com suceso! Faça login para acessar o sistema.");
            this.props.history.push('/login');
        }).catch( error => {
            mensagemErro(error.Response.data);
        });
    }

    cancelar = () => {
        this.props.history.push('/login');
    }
    
    render(){
        return(
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input type="text" 
                                id="inputNome"
                                className="form-control"
                                name="nome" 
                                onChange={e => this.setState({nome : e.target.value})}/>
                            </FormGroup>

                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input type="text" 
                                id="inputEmail"
                                className="form-control"
                                name="email" 
                                onChange={e => this.setState({email : e.target.value})}/>
                            </FormGroup>

                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input type="password" 
                                id="inputSenha"
                                className="form-control"
                                name="senha" 
                                onChange={e => this.setState({senha : e.target.value})}/>
                            </FormGroup>

                            <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                                <input type="password" 
                                id="inputRepitaSenha"
                                className="form-control"
                                name="repeticao" 
                                onChange={e => this.setState({senhaRepeticao : e.target.value})}/>
                            </FormGroup>
                        </div>
                        <button onClick={this.cadastrar}
                                type="button" className="btn btn-success">
                                <i className="pi pi-save"></i> Salvar
                        </button>
                        <button onClick={this.cancelar}
                            type="button" 
                            className="btn btn-danger">
                            <i className="pi pi-times"></i> Cancelar
                        </button>
                    </div>

                </div>
            </Card>
        );
    }
}

export default withRouter(CadastroUsuario);