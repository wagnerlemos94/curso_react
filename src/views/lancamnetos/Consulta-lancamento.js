import React from 'react';
import { withRouter } from 'react-router';
import Card from '../../components/Card';
import FormGroup from '../../components/Form-group';
import SelectMenu from '../SelectMenu';
import LancamentoTable from './LancamentoTable';

import LancamentoService from '../../app/service/LancamentoService';
import LocalStorageService from '../../app/service/localStorageService';

import * as messages from '../../components/toastr';


class ConsultaLancamento extends React.Component{

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao:'',
        lancamentos:[]
    }

    constructor(){
        super();
        this.service = new LancamentoService;
    }


    buscar = () =>{
        if(!this.state.ano){
            messages.mensagemErro("O preenchimento do campo Ano é obrigatório!")
            return false;
        }
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        
        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }
        
        this.service
            .consultar(lancamentoFiltro)
            .then(response => {                          
            this.setState({lancamentos: response.data})
            }).catch(erro => {
                console.log(erro)
            });
        
    }

    editar = (id) => {
        console.log('editnado o lancamento ' + id);
    }

    deletar = (id) => {
        console.log('deletando o lancamento ' + id);
    }

    render(){
        const mes = this.service.obterListaMeses();

        const tipos = this.service.obterListaTipos();

        const lancamentos = [
            {id:1, descricao: 'Salário..', valor: 5000, mes:1, tipo: "Receita", status:'Efetivado'},
        ]

        return(
            <Card title="Contulta Lançamento">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input type="text" className="form-control" 
                                id="InputAno"
                                value={this.state.ano}
                                onChange={e => this.setState({ano: e.target.value})}
                                placeholder="Digite o Ano" />
                            </FormGroup>

                            <FormGroup htmlFor="inputMes" label="Mês: *">
                                <SelectMenu id="inputMes"
                                className="form-control" 
                                value={this.state.mes}
                                onChange={e => this.setState({mes: e.target.value})}
                                lista={mes} />
                            </FormGroup>

                            <FormGroup htmlFor="inputDesc" label="Descrição: *">
                                <input type="text" className="form-control" 
                                id="inputDesc"
                                value={this.state.descricao}
                                onChange={e => this.setState({descricao: e.target.value})}
                                placeholder="Digite a Descrição" />
                            </FormGroup>

                            <FormGroup htmlFor="inputTipo" label="Tipo Lançamento: *">
                                <SelectMenu id="inputTipo"
                                className="form-control" 
                                value={this.state.tipo}
                                onChange={e => this.setState({tipo: e.target.value})}
                                lista={tipos} />
                            </FormGroup>

                            <button onClick={this.buscar} type="button" className="btn btn-success">Buscar</button>
                            <button type="button" className="btn btn-danger">Cadastrar</button>

                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentoTable lancamentos={this.state.lancamentos}
                            deleteAction={this.deletar}
                            editAction={this.editar}/>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export default withRouter(ConsultaLancamento);