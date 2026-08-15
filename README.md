# TrybeTunes

Aplicação em React que simula um serviço de streaming de música. Permite fazer login, buscar artistas (usando a API pública do iTunes), navegar pelos álbuns e faixas retornadas, ouvir prévias das músicas, favoritá-las e editar um perfil de usuário — tudo persistido localmente no navegador.

## 🎓 Sobre este projeto

Este foi um projeto **proposto durante o curso da [Trybe](https://www.betrybe.com/)**, com requisitos definidos a serem cumpridos (roteamento com React Router, consumo de API externa, persistência local do usuário e das músicas favoritas, edição de perfil, etc.). O código-base inicial (configuração de lint/estilo e estrutura de pastas) foi fornecido pela Trybe; toda a implementação dos componentes React, integração com a API e lógica da aplicação foi desenvolvida por mim, individualmente, como parte da avaliação do módulo de front-end.

## 🧑‍💻 Tecnologias

- React 18 (Create React App)
- React Router DOM 5
- API pública do iTunes (busca de artistas, álbuns e faixas)
- JavaScript (ES6+)
- CSS3
- ESLint + Stylelint (configuração da Trybe)

## 🚀 Como rodar localmente

> ⚠️ Este projeto usa `react-scripts` 5, que depende de uma versão específica do Node: **16 ou 18**. Com Node 19+ o build quebra por incompatibilidade com o OpenSSL do Node (`error:0308010C:digital envelope routines::unsupported`). Se você usa uma versão mais recente, recomendo usar o [nvm](https://github.com/coreybutler/nvm-windows) (Windows) ou [nvm](https://github.com/nvm-sh/nvm) (Mac/Linux) para alternar para o Node 18 antes de instalar as dependências.

1. Clone o repositório:
   ```bash
   git clone git@github.com:enzogennarii/trybetunes.git
   cd trybetunes
   ```
2. Garanta que está usando Node 16 ou 18:
   ```bash
   nvm install 18
   nvm use 18
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Rode em modo desenvolvimento:
   ```bash
   npm start
   ```
   A aplicação abre em `http://localhost:3000`.

5. Ou gere o build de produção:
   ```bash
   npm run build
   ```

## 📋 Funcionalidades

- Login simples (apenas com nome), persistido no navegador
- Busca de artistas com resultados reais vindos da API do iTunes
- Listagem de álbuns de um artista, com capa, nome e faixas
- Player de prévia (30s) de cada faixa, direto na página do álbum
- Favoritar/desfavoritar músicas, com lista de favoritas dedicada
- Edição de perfil (nome, e-mail, foto e descrição)

## 📧 Contato

enzo.gennari02@gmail.com
