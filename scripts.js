
document.getElementById('mudar-cor').addEventListener('click', () => {
    const texto = document.getElementById('texto-exemplo');
    texto.style.color = texto.style.color === 'red' ? 'black' : 'red';
});

document.getElementById('adicionar-item').addEventListener('click', () => {
    const novoItem = document.getElementById('novo-item').value.trim();
    if (novoItem) {
        const li = document.createElement('li');
        li.textContent = novoItem;
        li.addEventListener('dblclick', function () {
            this.remove();
        });
        document.getElementById('lista-itens').appendChild(li);
        document.getElementById('novo-item').value = '';
    }
});


document.getElementById('buscar-dados').addEventListener('click', () => {
    fetch('http://demo6669574.mockable.io')
        .then(response => response.json())
        .then(data => {
            document.getElementById('resultado-api').textContent = data.mensagem;
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
});

document.getElementById('formulario-post').addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    fetch('http://demo6669574.mockable.io', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email }),
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('resposta-post').textContent = 'Dados enviados com sucesso!';
        })
        .catch(error => console.error('Erro ao enviar dados:', error));
});


document.addEventListener("DOMContentLoaded", () => {
    let dadosOriginais = [];

    document.getElementById('buscar-dados-tabela').addEventListener('click', () => {
        fetch('http://demo6669574.mockable.io')
            .then(response => response.json())
            .then(data => {
                dadosOriginais = data.nome.map((nome, index) => ({
                    nome: nome,
                    rm: data.rm[index],
                    turma: data.turma[index]
                }));
                exibirDadosNaTabela(dadosOriginais);
            })
            .catch(error => console.error('Erro ao buscar dados:', error));
    });

    document.getElementById('aplicar-filtro').addEventListener('click', () => {
        const dadosFiltrados = dadosOriginais.filter(aluno => aluno.rm.toString().startsWith('5'));
        exibirDadosNaTabela(dadosFiltrados);
    });

    document.getElementById('resetar-filtro').addEventListener('click', () => {
        exibirDadosNaTabela(dadosOriginais);
    });

    function exibirDadosNaTabela(dados) {
        const tbody = document.querySelector('#tabela-dados tbody');
        tbody.innerHTML = '';
        dados.forEach(aluno => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${aluno.nome}</td>
                <td>${aluno.rm}</td>
                <td>${aluno.turma}</td>
            `;
            tbody.appendChild(tr);
        });
    }
});

let alunos = [];

document.getElementById('form-adicionar').addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome-aluno').value.trim();
    const rm = document.getElementById('rm').value.trim();
    const turma = document.getElementById('turma').value.trim();

    if (nome && rm && turma) {
        alunos.push({ nome, rm, turma });
        document.getElementById('form-adicionar').reset();
        exibirDadosNaTabela(alunos, 'tabela-crud');
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

function exibirDadosNaTabela(dados, idTabela) {
    const tbody = document.querySelector(`#${idTabela} tbody`);
    tbody.innerHTML = '';
    dados.forEach((aluno, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.rm}</td>
            <td>${aluno.turma}</td>
            ${idTabela === 'tabela-crud' ? `
                <td class="acoes">
                    <button onclick="editarAluno(${index})">Editar</button>
                    <button onclick="excluirAluno(${index})">Excluir</button>
                </td>
            ` : ''}
        `;
        tbody.appendChild(tr);
    });
}

function editarAluno(index) {
    const novoNome = prompt('Digite o novo nome:', alunos[index].nome);
    if (novoNome) {
        alunos[index].nome = novoNome;
        exibirDadosNaTabela(alunos, 'tabela-crud');
    }
}

function excluirAluno(index) {
    if (confirm('Tem certeza que deseja excluir este aluno?')) {
        alunos.splice(index, 1);
        exibirDadosNaTabela(alunos, 'tabela-crud');
    }
}

document.getElementById('formulario-validacao').addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome-validacao').value;
    const email = document.getElementById('email-validacao').value;
    let valido = true;

    if (!nome) {
        document.getElementById('erro-nome').textContent = 'Nome é obrigatório.';
        valido = false;
    } else {
        document.getElementById('erro-nome').textContent = '';
    }

    if (!email) {
        document.getElementById('erro-email').textContent = 'E-mail é obrigatório.';
        valido = false;
    } else {
        document.getElementById('erro-email').textContent = '';
    }

    if (valido) {
        alert('Formulário enviado!');
    }
});