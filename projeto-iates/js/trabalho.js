/* Função para 1 implementação contato */
var formContato = document.getElementById('form-contato');
console.log(formContato); 

    if(formContato){
        formContato.onsubmit = (event) => {
            event.preventDefault(); 
    
            var nome = document.getElementById('nome').value.trim();
            var email = document.getElementById('email').value.trim();
            var mensagemTexto = document.getElementById('msg').value.trim();

       /* teste console: */
            console.log(nome, email, mensagemTexto);

            if (!nome || !email || !mensagemTexto) {
                alert('Por favor, preencha todos os campos!');
                return;
            }

            var mensagem = {
                nome: nome,
                email: email,
                mensagem: mensagemTexto
            };

        console.log(mensagem);

        try {
            inserirMensagem(mensagem);  /* Chama a função da api.js */
            alert('Mensagem enviada com sucesso!');
            formContato.reset();
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            alert('Ocorreu um erro ao enviar a mensagem. Tente novamente.');
        }
    };
}


/* 2º implementação, na pagina admin login e senha */

var formAdmin = document.getElementById('form-admin');

    if (formAdmin) {
        formAdmin.onsubmit = (event) => {
            event.preventDefault();

            const email = document.getElementById('email').value.trim();
            const senha = document.getElementById('senha').value.trim();

            if (!email || !senha) {
                alert('Por favor, preencha todos os campos!');
                return;
            }

            var objLoginSenha = { 
                email: email, 
                senha: senha 
            };
            
            /* testando no console */
            console.log(objLoginSenha);

            try {
                var validacao = validarUsuario(objLoginSenha); // Chama a função da API
                if (validacao) {
                    alert('Login efetuado com sucesso!');
                    window.location.href = 'mensagem.html';
                } else {
                    alert('E-mail ou senha inválidos!');
                    formAdmin.reset();
                }
            } catch (error) {
                console.error('Erro ao efetuar login:', error);
                alert('Erro ao efetuar login. Tente novamente.');
            }
        };
    }


/* 3 implementação das msgs */

var tabelaMensagens = document.querySelector('#tabela-mensagens tbody');

    try {
        // Obtém as mensagens usando a função da API
        var mensagens = obterMensagens();

        if (!mensagens || mensagens.length === 0) {
            alert("Nenhuma mensagem encontrada!")
        }

        // Preenche a tabela dinamicamente
        mensagens.forEach((mensagem) => {
            var linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${mensagem.nome}</td>
                <td>${mensagem.email}</td>
                <td>${mensagem.mensagem}</td>
            `;
            tabelaMensagens.appendChild(linha);
        });
    } catch (error) {
        console.error('Erro ao obter mensagens:', error);
    }


