
let alunos = [];

document.getElementById('buscar-dados').addEventListener('click', () => {
    fetch('http://demo6669574.mockable.io')
        .then(response => response.json())
        .then(data => {
            alunos = data.nome.map((nome, index) => ({
                nome: nome,
                rm: data.rm[index],
                turma: data.turma[index]
            }));
            exibirDadosNaTabela(alunos);
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
});

document.getElementById('form-cadastro').addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const rm = document.getElementById('rm').value.trim();
    const turma = document.getElementById('turma').value.trim();

    if (nome && rm && turma) {
        alunos.push({ nome, rm, turma });
        exibirDadosNaTabela(alunos);
        document.getElementById('form-cadastro').reset();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

function exibirDadosNaTabela(dados) {
    const tbody = document.querySelector('#tabela-dados tbody');
    tbody.innerHTML = '';

    dados.forEach((aluno, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.rm}</td>
            <td>${aluno.turma}</td>
            <td class="acoes">
                <button onclick="editarAluno(${index})">Editar</button>
                <button onclick="excluirAluno(${index})">Excluir</button>
            </td>
        `;

        tr.addEventListener('dblclick', () => excluirAluno(index));

        tbody.appendChild(tr);
    });
}

window.editarAluno = function (index) {
    const novoNome = prompt('Digite o novo nome:', alunos[index].nome);
    if (novoNome) {
        alunos[index].nome = novoNome;
        exibirDadosNaTabela(alunos);
    }
};

window.excluirAluno = function (index) {
    if (confirm('Tem certeza que deseja excluir este aluno?')) {
        alunos.splice(index, 1);
        exibirDadosNaTabela(alunos);
    }
};