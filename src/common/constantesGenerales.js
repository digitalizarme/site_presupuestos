let api_string;
if (process.env.NODE_ENV === 'development') {
    api_string = `http://${window.location.hostname}:3000`;
} else {
    if (window.location.hostname === "digitalizarme.herokuapp.com") {
        api_string = 'https://apitestedigitalizarme.herokuapp.com';

    } else {
        api_string = 'https://apidigitalizarme.herokuapp.com';

    }
}

export const optionsUnidad = [
    {
        label: 'UN - UNIDAD',
        value: 'UN'
    }, {
        label: 'M2 - METRO CUADRADO',
        value: 'M2'
    }, {
        label: 'M3 - METRO CUBICO',
        value: 'M3'
    }, {
        label: 'KG - KILO GRAMO',
        value: 'KG'
    }, {
        label: 'GR - GRAMO',
        value: 'GR'
    }, {
        label: 'MT - METRO',
        value: 'MT'
    }, {
        label: 'ML - MILIGRAMO',
        value: 'ML'
    }, {
        label: 'JG - JUEGO',
        value: 'JG'
    }, {
        label: 'LT - LITRO',
        value: 'LT'
    }, {
        label: 'CJ - CAJA',
        value: 'CJ'
    }, {
        label: 'HS - HORAS',
        value: 'HS'
    }, {
        label: 'MN - MINUTOS',
        value: 'MN'
    }, {
        label: 'TN - TONELADA',
        value: 'TN'
    }
];

export const optionsIVA = [
    {
        label: 'Exento',
        value: 0
    }, {
        label: 'IVA 5',
        value: 5
    }, {
        label: 'IVA 10',
        value: 10
    }
];

export const API = api_string;
