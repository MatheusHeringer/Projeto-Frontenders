// Criando a Lista 
var list = [];

//Criando a Tabela no Front-End
function Lista(list) {
    var table = '<thead><tr><td>Nome</td><td>Senha</td><td>Email</td><td>Ação</td></tr></thead><tbody>';
    for (var key in list) {
        table += '<tr><td>' + FormatarNome(list[key].nome) + '</td><td>' + FormatarSenha(list[key].senha) +'</td><td>' + formataremail(list[key].email)+'</td><td>' + '</td><td><button class="btn btn-default" onclick="ApagarRegistro(' + key + ');">Apagar</button></td></tr>';
    }
    table += '</tbody>';

    document.getElementById('listTable').innerHTML = table;
    saveListStorage(list);
}

//Formatando o Campo Nome
function FormatarNome(nome) {
    var str = nome.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}

//Formatando o Campo Senha
function FormatarSenha(senha) {
    return parseInt(senha);
}

//Formatando o Campo email
function formataremail(email){
    return (email);
}



//Criando novo produto
function Cadastrar() {
    if (document.getElementById("senha").value != document.getElementById("c_senha").value) {
        alert("As Senhas não Conferem")
    }
    else if(document.getElementById('cidade').value=='...'){
        alert('preencha um cep valido')
        

    }
    else {
        var nome = document.getElementById("nome").value;
        var senha = document.getElementById("senha").value;
        var email = document.getElementById('email').value;
        
        list.unshift({ "nome": nome, "senha": senha, "email":email});
        Lista(list);
        LimparForm()
        window.open('login.html')
        window.close()
    }
}

//Limpa os campos do Formulário
function LimparForm() {
    document.getElementById("nome").value = "";
    document.getElementById("senha").value = "";
    document.getElementById("c_senha").value = "";
    document.getElementById("email").value = "";
    alert('Você foi cadastrado com sucesso, realize loguin para continuar')
}

//Apagando os Registros
function ApagarRegistro(id) {
    if (confirm("Confirma Exclusão?")) {
        if (id === list.length - 1) {
            list.pop();
        } else if (id === 0) {
            list.shift();
        } else {
            var arrAuxIni = list.slice(0, id);
            var arrAuxEnd = list.slice(id + 1);
            list = arrAuxIni.concat(arrAuxEnd);
        }
        Lista(list);
    }
}

//Salvando em JSON
function saveListStorage(list) {
    var jsonStr = JSON.stringify(list);
    localStorage.setItem("list", jsonStr);
}

//Identifica um Registro Salvo
function initListStorage() {
    var testList = localStorage.getItem("list");
    if (testList) {
        list = JSON.parse(testList);
    }
    Lista(list);
}

initListStorage();




//API DO CEP




function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById('rua').value=(conteudo.logradouro);
    document.getElementById('bairro').value=(conteudo.bairro);
    document.getElementById('cidade').value=(conteudo.localidade);
    document.getElementById('uf').value=(conteudo.uf);
    
} //end if.
else {
    //CEP não Encontrado.
    alert("CEP não encontrado.");
}
}


endereco = document.querySelector(".endereco")

botaook = document.querySelector("#btnok")
botaook.onclick = function pesquisacep() {
endereco.style.display = "block"

var cepe=document.getElementById('cep').value



//Nova variável "cep" somente com dígitos.
var cep = cepe
cep.replace(/\D/g, '');

//Verifica se campo cep possui valor informado.
if (cep != "") {

    //Expressão regular para validar o CEP.
    var validacep = /^[0-9, -]{9}$/;

    //Valida o formato do CEP.
    if(validacep.test(cep)) {

        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById('rua').value="...";
        document.getElementById('bairro').value="...";
        document.getElementById('cidade').value="...";
        document.getElementById('uf').value="...";
        

        //Cria um elemento javascript.
        var script = document.createElement('script');

        //Sincroniza com o callback.
        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);

    } //end if.
    else {
        //cep é inválido.
    
        alert("Formato de CEP inválido.");
    }
} //end if.

};

masccep=document.querySelector('#cep')
masccep.onkeypress=function(e){
    d=e.target.value.replace(/\D/g,"")
    d=d.replace(/(\d{5})(\d)/,"$1-$2")
    e.target.value=d
}