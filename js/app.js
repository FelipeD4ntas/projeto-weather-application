const form = document.querySelector('[data-js="localizacao"]');
const nomeCidade = document.querySelector('[data-js="nome-cidade"]');
const climaCidade = document.querySelector('[data-js="clima"]');
const temperaturaCidade = document.querySelector('[data-js="temperatura"]');
const cardDados = document.querySelector('[data-js="card-dados"]');
const imgTempo = document.querySelector('[data-js="tempo"]');
const iconeTempo = document.querySelector('[data-js="icone-tempo"]');

function addDadosCard({ nome, clima, temperatura }, WeatherIcon) {
    iconeTempo.innerHTML = `<img src="./src/icons/${WeatherIcon}.png" alt="icone tempo" />`
    nomeCidade.textContent = nome;
    climaCidade.textContent = clima;
    temperaturaCidade.textContent = temperatura;
};

function mostrarCard() {
    const temDisplayNone = cardDados.classList.contains('d-none');
    if (temDisplayNone) cardDados.classList.remove('d-none');
};

function limparInputForm(event) {
    event.target.reset();
};

function criarObjt(LocalizedName, Temperature, WeatherText) {
    return {
        nome: LocalizedName,
        temperatura: Temperature.Metric.Value,
        clima: WeatherText
    };
};

function verificaTempo(IsDayTime) {
   imgTempo.src = IsDayTime ? './src/day.svg' : './src/night.svg';
};

function addDadosLocalStorage({ nome }) {
    localStorage.setItem('cidade', nome);
};

function addDadosUltimaCidade() {
    const ultimaCidade = localStorage.getItem('cidade');
    fazerRequest(ultimaCidade)
};

async function fazerRequest(nomeCidade) {
    const [{ Key, LocalizedName }] = await buscarDadosCidade(nomeCidade);
    const [{ Temperature, WeatherText, IsDayTime, WeatherIcon }] = await buscarClimaCidade(Key);
    const cidade = criarObjt(LocalizedName, Temperature, WeatherText);

    mostrarCard();
    addDadosCard(cidade, WeatherIcon);
    verificaTempo(IsDayTime);
    addDadosLocalStorage(cidade);
};

function buscarDados(event) {
    event.preventDefault();
    const valorInput = form.city.value;

    fazerRequest(valorInput);
    limparInputForm(event);
};

addDadosUltimaCidade();
form.addEventListener('submit', buscarDados);
