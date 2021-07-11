import React from 'react';
import { withRouter } from 'react-router';
import Card from '../../components/Card';
import FormGroup from '../../components/Form-group';
import SelectMenu from '../SelectMenu';
import LancamentoTable from './LancamentoTable';


class ConsultaLancamento extends React.Component{
    render(){
        const mes = [
         { label: 'Selecione..', value: ''},
         { label: 'Janeiro', value: '1'},
         { label: 'Feverreiro', value: '2'},
         { label: 'Março', value: '3'},
         { label: 'Abril', value: '4'},
         { label: 'Maio', value: '5'},
         { label: 'Junho', value: '6'},
         { label: 'Julho', value: '7'},
         { label: 'Agosto', value: '8'},
         { label: 'Setembro', value: '9'},
         { label: 'Outrubro', value: '10'},
         { label: 'Novembro', value: '11'},
         { label: 'Dezembro', value: '12'},
        ]

        const tipos = [
            { label: 'Selecione..', value: ''},
            { label: 'DESPESA', value: 'DESPESA'},
            { label: 'RECEITA', value: 'RECEITA'},
        ]

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
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Digite o Ano" />
                            </FormGroup>
                            
                            <FormGroup htmlFor="inputMes" label="Mes: *">
                                <SelectMenu id="inputMes" className="form-control" lista={mes} />
                            </FormGroup>

                            <FormGroup htmlFor="inputTipo" label="Tipo Lançamento: *">
                                <SelectMenu id="inputTipo" className="form-control" lista={tipos} />
                            </FormGroup>

                            <button type="button" className="btn btn-success">Buscar</button>
                            <button type="button" className="btn btn-danger">Cadastrar</button>

                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentoTable lancamentos={lancamentos}/>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export default withRouter(ConsultaLancamento);