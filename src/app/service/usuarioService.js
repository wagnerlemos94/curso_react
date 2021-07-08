import ApiService from '../apiservice';

class UsuarioSerice extends ApiService{
    constructor(){
        super('/api/usuarios');
    }

    autenticar(credencias){
        return this.post('/autenticar', credencias);
    }

    obeterSaldoPorUsuario(id){
        return this.get(`/${id}/saldo`);
    }
}

export default UsuarioSerice;