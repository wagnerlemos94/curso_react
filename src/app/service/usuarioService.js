import ApiService from '../apiservice';
import ErroValicao from '../service/exception/ErroValidacao';

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

    validar(usuario){
        const erros = []

        if(!usuario.nome){
            erros.push("O campo Nome é obrigatorio.");
        }
        
        if(!usuario.email){
            erros.push("O campo Email é obrigatorio.");
        }else if(!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            erros.push("Informe um Email válido.");
        }

        if(!usuario.senha || !usuario.senhaRepeticao){
            erros.push("Digite a senha 2x.");
        }else if(usuario.senha !== usuario.senhaRepeticao){
            erros.push("As senhas nao batem");
        }


        if(erros && erros.length > 0){
            throw new ErroValicao(erros);
        }
    }
}

export default UsuarioSerice;