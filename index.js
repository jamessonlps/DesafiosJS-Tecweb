const axios = require("axios").default;

/**
 * Algumas constantes e funções que são usadas para requisições
 * necessárias para baixar e submeter dados.
*/

const urlToken = "https://tecweb-js.insper-comp.com.br/token";
const urlQuestions = "https://tecweb-js.insper-comp.com.br/exercicio";
const dataToken = {
    username: "jamessonlps",
};
const optionsToken = {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
};

let urlSubmit = (slug) => {
    return `https://tecweb-js.insper-comp.com.br/exercicio/${slug}`;
};

const getToken = async() => {
    return await axios
        .post(
            urlToken,
            dataToken,
            optionsToken,
        )
        .then((response) => {
            return response.data.accessToken;
        });
};

const getConfig = (token) => {
    const data = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    };
    return data;
}

const getQuestions = async(options) => {
    return await axios
        .get(
            urlQuestions,
            options,
        )
        .then((response) => {
            return response.data;
        });
}

let submitAnswer = async(slug, answer, options) => {
    let url = urlSubmit(slug);
    await axios
        .post(
            url,
            {"resposta": answer},
            options
        )
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error("Ocorreu algum erro");
        });
};

let getLink = async(link, options) => {
    return await axios
        .get(
            link,
            options,
        )
        .then((response) => {
            return response.data;
        });
};


/**
 * Funções relativas à cada questão do servidor
*/

async function soma(a, b, options) {
    let sum = a + b;
    await submitAnswer('soma', sum, options)
}


async function tamanhoString(string, options) {
    let length = string.length;
    await submitAnswer('tamanho-string', length, options)
}


async function nomeDoUsuario(email, options) {
    const splited = email.split("@");
    await submitAnswer('nome-do-usuario', splited[0], options);
}


async function jacaWars(v, theta, options) {
    let answer;

    const g = 9.8;
    const d_ref = 100;
    const theta_rad = (theta * Math.PI) / 180;
    const d_radius = 2;

    const d_jaca = (Math.pow(v, 2) * Math.sin(2*theta_rad)) / g;

    if (Math.abs(d_jaca - d_ref) < d_radius) {
        answer = 0;
    }
    else if (d_jaca - d_ref < - d_radius) {
        answer = -1;
    }
    else {
        answer = 1;
    }

    await submitAnswer('jaca-wars', answer, options)
}


async function anoBissexto(year, options) {
    let ans;
    if (((year % 4 == 0) && (year % 100 != 0)) || year % 400 == 0) {
        ans = true;
    }
    else {
        ans = false;
    }

    await submitAnswer('ano-bissexto', ans, options);
}


async function volumeDaPizza(z, a, options) {
    const vol = (Math.PI * (z**2)) * a;
    const res = Math.round(vol);
    
    await submitAnswer('volume-da-pizza', res, options);
}


async function mru(s0, v, t, options) {
    const s = s0 + v*t;
    await submitAnswer('mru', s, options);
}


async function inverteString(string, options) {
    const size = string.length;
    let inverted = "";

    for (char in string) {
        inverted += string[size-1-char];
    }

    await submitAnswer('inverte-string', inverted, options);
}


async function somaValores(dict, options) {
    let sum = 0;
    Object.keys(dict.objeto).forEach((key) => {
        sum += dict.objeto[key];
    });
    await submitAnswer('soma-valores', sum, options);
}


async function nEsimoPrimo(n, options) {
    let prime = 3;
    if (n == 1) {
        return 2;
    }
    else {
        let index = 3;   // roda no loop verificando se é primo ou não
        let counter = 2; // identifica o k-ésimo primo verificado
        while (counter <= n) {
            const isPrime = (num) => {
                for (let i = 2; i < num; i++)
                    if (num % i === 0) {
                        return false;
                    }
                return true;
            };

            // atualiza último primo identificado e sua posição
            if (isPrime(index)) {
                prime = index;
                counter += 1;
            }

            index += 1;
        }
    }

    await submitAnswer('n-esimo-primo', prime, options);
}


async function maiorPrefixoComum(strings, options) {
    let counter = 0;
    let prefix = '';

    for (string of strings.slice(counter, strings.length-1)) {
        
        for (string2 of strings.slice(counter+1, strings.length)) {
            let comparing = true;
            let i = 0;
            
            while (comparing && i <= Math.min(string.length, string2.length)) {
                
                if (string.slice(0,i) == string2.slice(0,i)) {
                    if (i > prefix.length) {
                        prefix = string.slice(0,i);
                    }
                    i += 1;
                }
                else {
                    comparing = false;
                }
                
            }
        }
        counter += 1;
    }

    await submitAnswer('maior-prefixo-comum', prefix, options);
}


async function somaSegundoMaiorEMenorNumeros(numbers, options) {
    let nums = numbers;

    let max = Math.max(...numbers);
    let min = Math.min(...numbers);
    
    nums.splice(nums.indexOf(max), 1);
    nums.splice(nums.indexOf(min), 1);
    
    max = Math.max(...nums);
    min = Math.min(...nums);
    
    const ans = max + min;

    await submitAnswer('soma-segundo-maior-e-menor-numeros', ans, options);
}


async function contaPalindromos(words, options) {
    let palindromes = [];
    words.forEach((word) => {
        let inverted = "";

        for (char in word) {
            inverted += word[word.length-1-char];
        }

        if (word == inverted) {
            palindromes.push(word);
        }
    });

    const ans = palindromes.length;
    
    await submitAnswer('conta-palindromos', ans, options);
}


async function somaDeStringsDeInts(strings, options) {
    let ints = strings.map((string) => parseInt(string));
    let soma = ints.reduce((num1, num2) => num1 + num2);
    
    await submitAnswer('soma-de-strings-de-ints', soma, options);
}


async function somaComRequisicoes(endpoints, options) {
    let sum = 0;
    for (endpoint of endpoints) {
        let num = await getLink(endpoint, options);
        sum += num;
    }
    await submitAnswer('soma-com-requisicoes', sum, options);
}


async function cacaAoTesouro(endpoint, options) {
    searching = true;
    let link = endpoint;
    while (searching) {
        let response = await getLink(link, options);
        
        if (typeof(response) === "string") {
            if (response.slice(0,7) != 'http://') {
                searching = false;
                await submitAnswer('caca-ao-tesouro', response, options);
            }
            else {
                link = response;
            }
        }
        else {
            searching = false;
            await submitAnswer('caca-ao-tesouro', response, options);
        }

    }
}


/**
 * A partir desse trecho, uma única função é executada 
 * e é responsável desde pelo processo de pegar o token 
 * até enviar a resposta de questão por questão.
*/

async function handleSubmit() {
    let token = await getToken();
    let config = getConfig(token);
    let questions = await getQuestions(config);

    const q1 = questions['soma'];
    const q2 = questions['tamanho-string'];
    const q3 = questions['nome-do-usuario'];
    const q4 = questions['jaca-wars'];
    const q5 = questions['ano-bissexto'];
    const q6 = questions['volume-da-pizza'];
    const q7 = questions['mru'];
    const q8 = questions['inverte-string'];
    const q9 = questions['soma-valores'];
    const q10 = questions['n-esimo-primo'];
    const q11 = questions['maior-prefixo-comum'];
    const q12 = questions['soma-segundo-maior-e-menor-numeros'];
    const q13 = questions['conta-palindromos'];
    const q14 = questions['soma-de-strings-de-ints'];
    const q15 = questions['soma-com-requisicoes'];
    const q16 = questions['caca-ao-tesouro'];

    await soma(q1.entrada.a, q1.entrada.b, config);
    await tamanhoString(q2.entrada.string, config);
    await nomeDoUsuario(q3.entrada.email, config);
    await jacaWars(q4.entrada.v, q4.entrada.theta, config);
    await anoBissexto(q5.entrada.ano, config);
    await volumeDaPizza(q6.entrada.z, q6.entrada.a, config);
    await mru(q7.entrada.s0, q7.entrada.v, q7.entrada.t, config);
    await inverteString(q8.entrada.string, config);
    await somaValores(q9.entrada, config);
    await nEsimoPrimo(q10.entrada.n, config);
    await maiorPrefixoComum(q11.entrada.strings, config);
    await somaSegundoMaiorEMenorNumeros(q12.entrada.numeros, config);
    await contaPalindromos(q13.entrada.palavras, config);
    await somaDeStringsDeInts(q14.entrada.strings, config);
    await somaComRequisicoes(q15.entrada.endpoints, config);
    await cacaAoTesouro(q16.entrada.inicio, config);
}

handleSubmit();
