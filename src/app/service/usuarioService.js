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

    salvar(usuario){
        return this.post('/', usuario);
    }
}

export default UsuarioSerice;