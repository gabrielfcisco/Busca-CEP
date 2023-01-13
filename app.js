var button = document.querySelector('div#app form button');
var input = document.querySelector('div#app form input');
var content = document.querySelector('div#app main');

function createLine(response, error = false) {
    if (error) {
        var line = document.createElement('p');
        line.className = 'error';
        line.appendChild(document.createTextNode(response));
        content.appendChild(line);
    } else {
        var line = document.createElement('p');
        line.appendChild(document.createTextNode(response));
        content.appendChild(line);
    }
}

function run(event) {
    event.preventDefault();
    var CEP = input.value;

    CEP = CEP.replace(' ', '');
    CEP = CEP.replace('.', '');
    CEP = CEP.replace('-', '');
    CEP = CEP.trim();

    axios.get('https://viacep.com.br/ws/' + CEP + '/json/')
        .then((response) => {
            if (response.data.erro) {
                throw new Error('CEP inválido');
            }
            content.innerHTML = '';
            createLine(response.data.logradouro);
            createLine(response.data.bairro);
            createLine(response.data.localidade + '/' + response.data.uf);
        }).catch((err) => {
            content.innerHTML = '';
            createLine('Ops, algo deu errado!', true);
        });
}

button.addEventListener('click', run)