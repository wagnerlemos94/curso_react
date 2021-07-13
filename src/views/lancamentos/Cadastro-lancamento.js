import React from 'react';

import { withRouter } from 'react-router-dom';
import Card from '../../components/Card';
import FormGroup from '../../components/Form-group';
import SelectMenu from '../SelectMenu';

import LancamentoService from '../../app/service/LancamentoService';
import * as messages from '../../components/toastr';
import LocalStorageService from '../../app/service/localStorageService';


class CadastroLancamentos extends React.Component{
    
    state = {
        id:null,
        descricao:'',
        mes:'',
        ano:'',
        tipo:'',
        status:'',
        usuario:null,
        atualizando: false
    }

    constructor(){
        super();
        this.service = new LancamentoService;
    }

    submit = () => {

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
        
        const { descricao, valor, mes, ano, tipo } = this.state;
        const lancamento = {descricao, valor, mes, ano, tipo, usuario: usuarioLogado.id}

        try{
            this.service.validar(lancamento);
        }catch(erro){
            const mensagens = erro.mensagens;

            mensagens.forEach(msg => messages.mensagemErro(msg));
            return false;
        }


        this.service.salvar(lancamento).then(response => {
            this.props.history.push('/consulta-lancamentos');
            messages.mensagemSucesso('Lancamento cadastrado com sucesso!');
        }).catch(erro => {
            messages.mensagemErro(erro.response.data);
        });
    }

    atualizar = () => {
        const { descricao, valor, mes, ano, tipo,status, id, usuario } = this.state;
        const lancamento = {descricao, valor, mes, ano, status, tipo, id, usuario}

        this.service.atualizar(lancamento).then(response => {
            this.props.history.push('/consulta-lancamentos');
            messages.mensagemSucesso('Lancamento atualizado com sucesso!');
        }).catch(erro => {
            messages.mensagemErro(erro.response.data);
        });
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({[name]:value});
    }

    componentDidMount(){
        const params = this.props.match.params;

        if(params.id){
            this.service
                .obterPorId(params.id)
                .then(response => {
                    this.setState({...response.data, atualizando: true});
                }).catch(erro => {
                    messages.mensagemErro(erro.response.data);
                });
        }
    }
    
    render(){
        const tipos = this.service.obterListaTipos();
        const meses = this.service.obterListaMeses();
        return(
            <Card title={this.state.atualizando ? 'Atualização de Lançamento' : "Cadastro de Lançamento"}>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputDescricao" label="Descrição: *">
                            <input id="inputDescricao" type="text"
                            className="form-control"
                            name="descricao"
                            value={this.state.descricao}
                            onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputAno" label="Ano: *">
                            <input id="inputAno"
                            type="text"
                            className="form-control"
                            name="ano"
                            value={this.state.ano}
                            onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mes: *">
                            <SelectMenu id="inputMes"
                            name="mes"
                            value={this.state.mes}
                            onChange={this.handleChange}
                            lista={meses}
                            className="form-control"/>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputvalor" label="valor: *">
                            <input id="inputvalor"
                            type="text"
                            name="valor"
                            value={this.state.valor}
                            onChange={this.handleChange}
                            className="form-control" />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu id="inputTipo"
                            name="tipo"
                            value={this.state.tipo}
                            onChange={this.handleChange}
                            lista={tipos}
                            className="form-control"/>
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputStatus" id="inputStatus" label="Status: *">
                            <input type="text"
                            name="status"
                            value={this.state.status}
                            className="form-control"
                            disabled/>
                        </FormGroup>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-6">
                        {this.state.atualizando ?
                            (
                                <button onClick={this.atualizar} className="btn btn-primary">Atualizar</button>
                                ):(
                                <button onClick={this.submit} className="btn btn-success">Salvar</button>
                            )
                            
                        }
                        <button onClick={e => this.props.history.push('/consulta-lancamentos')} className="btn btn-danger">Cancelar</button>
                    </div>
                </div>
            </Card>
        );
    }
}

export default withRouter(CadastroLancamentos);