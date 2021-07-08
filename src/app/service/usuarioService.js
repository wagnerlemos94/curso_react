import ApiService from '../apiservice';

class UsuarioSerice extends ApiService{
    constructor(){
        super('/api/usuarios');
    }
}

export default UsuarioSerice;