vemail = ["admin"]
vsenha = ["admin"]
vnome = ["admin"]
vsenhac = ["admin"]
vrg = ["000000000"]

botaoCadastrar = document.getElementById("botaoCadastrar")
botaoCadastrar.onclick = function () {

    if (document.getElementById("senha").value != document.getElementById("c_senha").value) {
        alert("A senha deve ser igual a confirmação de senha.")
    }
    else if (document.getElementById('cidade').value == '...' || document.getElementById('cidade').value == "") {
        alert('Preencha um CEP válido.')
    }
    else if (document.getElementById("nome").value == "" || document.getElementById("email").value == "" || document.getElementById("senha").value == "" || document.getElementById("rg").value == "" || document.getElementById("num").value == "") {
        alert("Preencha todos os campos corretamente.")
    }
    else {
        nome = document.getElementById("nome").value
        email = document.getElementById("email").value
        senha = document.getElementById("senha").value
        senhac = document.getElementById("c_senha").value
        rg = document.getElementById("rg").value
        vnome.push(nome)
        vemail.push(email)
        vsenha.push(senha)
        vsenhac.push(senhac)
        vrg.push(rg)
        console.log(vemail)
        console.log(vsenha)
        console.log(vnome)
        console.log(vsenhac)
        console.log(vrg)
        LimparForm()
        document.getElementById("containerCadastro").style.display = "none";
        document.getElementById("containerLogin").style.display = "block";
    }
}

//Limpa os campos do Formulário
function LimparForm() {
    document.getElementById("nome").value = "";
    document.getElementById("senha").value = "";
    document.getElementById("c_senha").value = "";
    document.getElementById("email").value = "";
    document.getElementById("rg").value = "";
    document.getElementById("cep").value = "";
    document.getElementById('rua').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('uf').value = "";
    document.getElementById('num').value = "";
    document.getElementById('comp').value = "";
    alert('Você foi cadastrado com sucesso, realize login para continuar')
}

//API DO CEP

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('rua').value = (conteudo.logradouro);
        document.getElementById('bairro').value = (conteudo.bairro);
        document.getElementById('cidade').value = (conteudo.localidade);
        document.getElementById('uf').value = (conteudo.uf);

    } //end if.
    else {
        //CEP não Encontrado.
        alert("CEP não encontrado.");
    }
}

endereco1 = document.querySelector(".endereco1")
endereco2 = document.querySelector(".endereco2")
botaook = document.querySelector("#btnok")
botaook.onclick = function pesquisacep() {
    if (document.getElementById("cep").value != "") {
        endereco1.style.display = "block"
        endereco2.style.display = "block"

        var cepe = document.getElementById('cep').value

        //Nova variável "cep" somente com dígitos.
        var cep = cepe
        cep.replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9, -]{9}$/;

            //Valida o formato do CEP.
            if (validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                document.getElementById('rua').value = "...";
                document.getElementById('bairro').value = "...";
                document.getElementById('cidade').value = "...";
                document.getElementById('uf').value = "...";

                //Cria um elemento javascript.
                var script = document.createElement('script');

                //Sincroniza com o callback.
                script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

                //Insere script no documento e carrega o conteúdo.
                document.body.appendChild(script);

            } //end if.
            else {
                //cep é inválido.

                alert("Formato de CEP inválido.");
            }
        } //end if.
    }
    else {
        alert("Preencha o campo CEP corretamente.")
    }
};

masccep = document.querySelector('#cep')
masccep.onkeypress = function (e) {
    d = e.target.value.replace(/\D/g, "")
    d = d.replace(/(\d{5})(\d)/, "$1-$2")
    e.target.value = d
}

//Botão de login

botaoEntrar = document.getElementById("botaoEntrar")
botaoEntrar.onclick = function () {
    for (var i = 0; i < vemail.length; i++) {
        if (vemail[i] == document.getElementById("email_login").value && vsenha[i] == document.getElementById("senha_login").value) {
            alert("Login efetuado com sucesso. Seja bem vindo(a)!")
            break
        }
    }
    if (document.getElementById("email_login").value == "" || document.getElementById("senha_login").value == "") {
        alert("Preencha os campos corretamente.")
    }
    else if (vemail[i] != document.getElementById("email_login").value && vsenha[i] != document.getElementById("senha_login").value) {
        alert("Usuário e/ou senha incorretos.")
    }
}

//Botão de redirecionamento para a página de login

botaoEntrar2 = document.getElementById("botaoEntrar2")
botaoEntrar2.onclick = function () {
    document.getElementById("containerCadastro").style.display = "none";
    document.getElementById("containerLogin").style.display = "block";
}

botaoEntrar3 = document.getElementById("botaoEntrar3")
botaoEntrar3.onclick = function () {
    document.getElementById("containerSenha").style.display = "none";
    document.getElementById("containerLogin").style.display = "block";
}

//Botão de redirecionamento para a página de criação de contas

botaoCriar2 = document.getElementById("botaoCriar2")
botaoCriar2.onclick = function () {
    document.getElementById("containerLogin").style.display = "none";
    document.getElementById("containerCadastro").style.display = "block";
    endereco1.style.display = "none"
    endereco2.style.display = "none"
}

botaoCriar3 = document.getElementById("botaoCriar3")
botaoCriar3.onclick = function () {
    document.getElementById("containerSenha").style.display = "none";
    document.getElementById("containerCadastro").style.display = "block";
    endereco1.style.display = "none"
    endereco2.style.display = "none"
}

//Verificação do email antes de trocar a senha

botaoVerificar = document.getElementById("botaoVerificar")
botaoVerificar.onclick = function () {
    for (i = 0; i < vemail.length; i++) {
        if (vemail[i] == document.getElementById("email_rec").value) {
            document.getElementById("senhas").style.display = "block"
            vemail.splice(i, 1)
            vsenha.splice(i, 1)
            vsenhac.splice(i, 1)
            console.log(vemail)
            console.log(vsenha)
            console.log(vsenhac)
        }
    }
}

//Troca de senha

botaoTrocar = document.getElementById("botaoTrocar")
botaoTrocar.onclick = function () {
    if (document.getElementById("senha_rec").value == "" || document.getElementById("senhac_rec").value == "") {
        alert("Preencha os campos corretamente.")
    }
    else if (document.getElementById("senha_rec").value != document.getElementById("senhac_rec").value) {
        alert("A senha deve ser igual a confirmação de senha.")
    }
    else {
        email_rec = document.getElementById("email_rec").value
        senha_rec = document.getElementById("senha_rec").value
        senhac_rec = document.getElementById("senhac_rec").value
        vemail.push(email_rec)
        vsenha.push(senha_rec)
        vsenhac.push(senhac_rec)
        console.log(vemail)
        console.log(vsenha)
        console.log(vnome)
        console.log(vsenhac)
        console.log(vrg)
        alert("Senha trocada com sucesso.")
        document.getElementById("email_rec").value = "";
        document.getElementById("senha_rec").value = "";
        document.getElementById("senhac_rec").value = "";
        document.getElementById("senhas").style.display = "none"
        document.getElementById("containerSenha").style.display = "none";
        document.getElementById("containerLogin").style.display = "block";
    }
}

//Botao para recuperar a senha

botaoRecuperar = document.getElementById("botaoRecuperar")
botaoRecuperar.onclick = function () {
    document.getElementById("containerSenha").style.display = "block"
    document.getElementById("containerLogin").style.display = "none"
}