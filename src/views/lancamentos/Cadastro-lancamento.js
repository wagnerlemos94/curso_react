import React from 'react';

import { withRouter } from 'react-router-dom';
import Card from '../../components/Card';
import FormGroup from '../../components/Form-group';
import SelectMenu from '../SelectMenu';

import LancamentoService from '../../app/service/LancamentoService';


class CadastroLancamentos extends React.Component{
    
    constructor(){
        super();
        this.service = new LancamentoService;
    }
    
    render(){
        const tipos = this.service.obterListaTipos();
        const meses = this.service.obterListaMeses();
        return(
            <Card title="Cadastro de Lançamento">
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputDescricao" label="Descrição: *">
                            <input id="inputDescricao" type="text" className="form-control" />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputAno" label="Ano: *">
                            <input id="inputAno" type="text" className="form-control" />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mes: *">
                            <SelectMenu id="inputMes" lista={meses} className="form-control"/>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputvalor" label="valor: *">
                            <input id="inputvalor" type="text" className="form-control" />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu id="inputTipo" lista={tipos} className="form-control"/>
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputStatus" id="inputStatus" label="Status: *">
                            <input type="text" className="form-control" disabled/>
                        </FormGroup>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-6">
                        <button className="btn btn-success">Salvar</button>
                        <button className="btn btn-danger">Cancelar</button>
                    </div>
                </div>
            </Card>
        );
    }
}

export default withRouter(CadastroLancamentos);