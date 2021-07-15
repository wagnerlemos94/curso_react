import React from 'react';
import currencyFormatter from 'currency-formatter';

export default props => {

    const rows = props.lancamentos.map((lancamento) => {
        return(
            <tr key={lancamento.id}>
                <th>{lancamento.descricao}</th>
                <th>{currencyFormatter.format(lancamento.valor, {locale: 'pt-BR'})}</th>
                <th>{lancamento.tipo}</th>
                <th>{lancamento.mes}</th>
                <th>{lancamento.status}</th>
                <td>
                    <button className="btn btn-success" title="Efetivar"
                    disabled={lancamento.status != 'PENDENTE'}
                    onClick={e => props.alterarStatus(lancamento, 'EFETIVADO')}
                    type="button">
                        <i className="pi pi-check p-mr-2"></i>
                    </button>
                    <button className="btn btn-warning" title="Cancelar"
                    disabled={lancamento.status != 'PENDENTE'}
                    onClick={e => props.alterarStatus(lancamento, 'CANCELADO')}
                    type="button">
                        <i className="pi pi-times p-mr-2"></i>
                    </button>

                    <button type="button" title="Editar"
                    className="btn btn-primary"
                    onClick={e => props.editAction(lancamento.id)}>
                    <i className="pi pi-pencil p-mr-2"></i>
                    </button>

                    <button type="button" title="Excluir"
                    className="btn btn-danger"
                    onClick={e => props.deleteAction(lancamento)}>
                        <i className="pi pi-trash p-mr-2"></i>
                    </button>
                </td>
            </tr>
        );
    });

    return(
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>

        </table>
    );
}