import ApiService from '../apiservice';

class UsuarioSerice extends ApiService{
    constructor(){
        super('/api/usuarios');
    }

    autenticar(credencias){
        return this.post('/autenticar', credencias);
    }
}

export default UsuarioSerice;