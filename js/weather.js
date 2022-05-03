const APIKey = 'RIq6tfJXPVTQA9DMWrEumEwaXZdQQnUA';
const URLbase = 'https://dataservice.accuweather.com/';

const buscatUrlCidade = nomeCidade => 
    `${URLbase}locations/v1/cities/search?apikey=${APIKey}&q=${nomeCidade}&language=pt-br`;

const buscatUrlClima = (KeyCidade) => 
    `${URLbase}currentconditions/v1/${KeyCidade}?apikey=${APIKey}&language=pt-br`;

const dadosFetch = async url => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Não foi possível obter os dados.');
        }

        return response.json();
    } catch ({ name, message }) {
        console.log(`${name}: ${message}`);
    };
};

const buscarDadosCidade = nomeCidade => dadosFetch(buscatUrlCidade(nomeCidade));

const buscarClimaCidade = KeyCidade => dadosFetch(buscatUrlClima(KeyCidade));


