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

function limparInputForm(event) {
    event.target.reset();
};

function verificarClasseCard() {
    const temDisplayNone = cardDados.classList.contains('d-none');
    if (temDisplayNone) cardDados.classList.remove('d-none');
};

function buscarObj(LocalizedName, Temperature, WeatherText) {
    return {
        nome: LocalizedName,
        temperatura: Temperature.Metric.Value,
        clima: WeatherText
    };
};

function verificaTempo(IsDayTime) {
    IsDayTime ? imgTempo.src = './src/day.svg' : imgTempo.src = './src/night.svg';
};

async function buscarDados(event) {
    event.preventDefault();

    const valorInput = form.city.value;
    const [{ Key, LocalizedName }] = await buscarDadosCidade(valorInput);
    const [{ Temperature, WeatherText, IsDayTime, WeatherIcon }] = await buscarClimaCidade(Key);
    const cidade = buscarObj(LocalizedName, Temperature, WeatherText);

    verificarClasseCard();
    verificaTempo(IsDayTime);
    addDadosCard(cidade, WeatherIcon);
    limparInputForm(event);
};

form.addEventListener('submit', buscarDados);
