const express = require('express');
const app = express();
const port = 3000;
const cep = require('cep-promise');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/cep-promise', async (req, res) => {
  try {
    // Acessando o cabeçalho 'cep' enviado pelo usuário
    const cepValue = req.headers['cep'];
    const numeroDoEndereco = req.headers['numero'];
    const complementoEndereco = req.headers['complemento'];

    // Verificando se o cabeçalho 'cep' foi fornecido
    if (!cepValue || !numeroDoEndereco) {
      return res.status(400).send('Cabeçalho "cep" e "numero" são obrigatórios');
    }

    // Chamando a API cep-promise com o valor do CEP do cabeçalho
    const response = await cep(cepValue);

    const responseFormated = {
      cep: response.cep,
      estado: response.state,
      cidade: response.city,
      bairro: response.neighborhood,
      rua: response.street,
      numero: numeroDoEndereco,
      complemento: complementoEndereco
    }

    res.json(responseFormated);
  } catch (error) {
    const errorMsg = {
      msg: "Erro ao buscar dados da API",
      statusCode: 500
    }
    res.status(500).send(errorMsg);
  }
});
