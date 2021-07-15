import React from 'react';
import { withRouter } from 'react-router';
import Card from '../../components/Card';
import FormGroup from '../../components/Form-group';
import SelectMenu from '../SelectMenu';
import LancamentoTable from './LancamentoTable';

import LancamentoService from '../../app/service/LancamentoService';
import LocalStorageService from '../../app/service/localStorageService';

import * as messages from '../../components/toastr';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';


class ConsultaLancamento extends React.Component{

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao:'',
        showConfirmDialog:false,
        lancamentoDeletar: {},
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
        this.props.history.push(`/cadastro-lancamentos/${id}`);
    }

    abrirConfirmacao = (lancamento) => {
        this.setState({showConfirmDialog: true, lancamentoDeletar: lancamento});
    }

    cancelarDelecao = () => {
        this.setState({showConfirmDialog: false, lancamentoDeletar: {}});
    }

    deletar = () => {
        this.service.deletar(this.state.lancamentoDeletar.id).then(response => {
            const lancamentos = this.state.lancamentos;
            const index = lancamentos.indexOf(this.state.lancamentoDeletar);
            lancamentos.splice(index, 1);
            this.setState({lancamentos: lancamentos, showConfirmDialog: false})
            this.setState(lancamentos);

            messages.mensagemSucesso('Lançamento deletado com sucesso!');
        }).catch(erro => {
            messages.mensagemErro('Ocorreu um erro ao tentar deletar o lançamento!');
        });
    }

    preparaFormularioCadastro = () => {
        this.props.history.push('/cadastro-lancamentos')
    }

    altetarStatus = (lancamento, status) => {
        this.service
            .alterarStatus(lancamento.id,status)
            .then( response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(lancamento);
                if(index !== -1){
                    lancamento['status'] = status;
                    lancamentos[index] = lancamento;
                    this.setState({lancamento});
                }
                messages.mensagemSucesso("Status atualizado com sucesso!");
            }).catch(erro => {
                messages.mensagemErro(erro.response);
            });
    }

    render(){
        const mes = this.service.obterListaMeses();

        const tipos = this.service.obterListaTipos();
        
        const showConfirmDialogFooter = (
            <div>
                <Button label="Confirma" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} className="p-button-secondary"/>
            </div>
        );

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

                            <button onClick={this.buscar}
                                    type="button"
                                    className="btn btn-success">
                                    <i className="pi pi-search"></i> Buscar
                            </button>
                            <button onClick={this.preparaFormularioCadastro}
                                    type="button"
                                    className="btn btn-danger">
                                    <i className="pi pi-plus"></i>Cadastrar
                            </button>

                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentoTable lancamentos={this.state.lancamentos}
                            deleteAction={this.abrirConfirmacao}
                            editAction={this.editar}
                            alterarStatus={this.altetarStatus}/>
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Confirmação"
                            visible={this.state.showConfirmDialog}
                            style={{width: '50vw'}}
                            footer={showConfirmDialogFooter}
                            model={true}
                            onHide={() => this.setState({showConfirmDialog: false})}
                            >
                                Confirma a exclusão desse Lançamento?
                            </Dialog>
                </div>
            </Card>
        );
    }
}

export default withRouter(ConsultaLancamento);