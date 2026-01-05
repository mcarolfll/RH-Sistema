# 🎯 Sistema de Gestão de RH - React + Node.js

Sistema completo e moderno para gerenciamento de candidatos e empresas desenvolvido com React, Node.js, Express e MySQL.

![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-5.7%2B-4479A1?style=flat&logo=mysql&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat&logo=vite&logoColor=white)

## 📋 Funcionalidades

### ✨ Funcionalidades Principais

- ✅ **CRUD Completo**
  - Cadastro de Candidatos
  - Cadastro de Empresas
  - Edição de registros
  - Exclusão de registros
  - Visualização detalhada

- 🔍 **Sistema de Busca**
  - Busca em tempo real
  - Filtro por nome, e-mail, cargo (candidatos)
  - Filtro por nome, CNPJ, e-mail (empresas)
  - Contador de resultados

- 📊 **Dashboard e Estatísticas**
  - Estatísticas em tempo real
  - Contador de candidatos e empresas
  - Interface moderna e intuitiva

- 🎨 **Interface Moderna e Responsiva**
  - Design responsivo (mobile-first)
  - Funciona perfeitamente em celular e computador
  - Gradientes e animações suaves
  - Ícones Font Awesome
  - Feedback visual em todas as ações
  - Mensagens de sucesso/erro

- 🔒 **Validações e Segurança**
  - Validação de formulários
  - Proteção contra SQL Injection
  - Sanitização de dados
  - Validação de e-mail único
  - Máscaras de entrada (telefone, CNPJ)

## 🚀 Como Instalar e Usar

### Pré-requisitos

- **Node.js** 18 ou superior ([Download](https://nodejs.org/))
- **MySQL** 5.7 ou superior ([Download](https://www.mysql.com/downloads/))
- **npm** ou **yarn** (vem com Node.js)

### Instalação Passo a Passo

#### 1. Instalar Dependências

Abra o terminal na pasta do projeto e execute:

```bash
npm install
```

#### 2. Configurar Banco de Dados

Crie um arquivo `.env` na raiz do projeto (copie do `.env.example`):

```bash
# No Windows (PowerShell)
copy .env.example .env

# No Linux/Mac
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais do MySQL:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=sistema_rh
PORT=5000
```

> **Nota:** Se você não tem senha no MySQL, deixe `DB_PASSWORD=` vazio.

#### 3. Iniciar o Servidor MySQL

Certifique-se de que o MySQL está rodando:

- **Windows:** Inicie o MySQL através dos Serviços do Windows
- **Linux/Mac:** `sudo service mysql start` ou `sudo systemctl start mysql`
- **XAMPP/WAMP:** Inicie o MySQL através do painel de controle

#### 4. Iniciar a Aplicação

Agora você pode iniciar tanto o frontend quanto o backend de uma vez:

```bash
npm start
```

Ou inicie separadamente:

**Terminal 1 - Backend (Node.js):**
```bash
npm run server
```

**Terminal 2 - Frontend (React):**
```bash
npm run dev
```

#### 5. Acessar a Aplicação

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api

> **Nota:** O sistema criará automaticamente o banco de dados e as tabelas na primeira execução!

## 📁 Estrutura do Projeto

```
sistema-rh-react/
├── public/
│   └── index.html
├── src/
│   ├── components/         # Componentes reutilizáveis
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Alert.jsx
│   │   ├── SearchBar.jsx
│   │   └── EmptyState.jsx
│   ├── pages/             # Páginas da aplicação
│   │   ├── Home.jsx
│   │   ├── Candidatos/
│   │   │   ├── ListaCandidatos.jsx
│   │   │   ├── CadastrarCandidato.jsx
│   │   │   ├── EditarCandidato.jsx
│   │   │   └── VerCandidato.jsx
│   │   └── Empresas/
│   │       ├── ListaEmpresas.jsx
│   │       ├── CadastrarEmpresa.jsx
│   │       ├── EditarEmpresa.jsx
│   │       └── VerEmpresa.jsx
│   ├── services/          # Serviços de API
│   │   └── api.js
│   ├── utils/             # Utilitários
│   │   └── masks.js
│   ├── styles/            # Estilos
│   │   └── App.css
│   ├── App.jsx
│   └── main.jsx
├── server/                # Backend Node.js
│   ├── config/
│   │   └── database.js
│   ├── routes/
│   │   ├── candidatos.js
│   │   ├── empresas.js
│   │   └── stats.js
│   └── index.js
├── package.json
├── vite.config.js
├── .env.example
└── README_REACT.md
```

## 🎨 Recursos Visuais

- **Design Moderno**: Gradientes, sombras e efeitos visuais
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Ícones**: Font Awesome para uma experiência visual rica
- **Animações**: Transições suaves e animações ao scroll
- **Cores**: Paleta de cores profissional e harmoniosa
- **Tipografia**: Fonte Poppins para melhor legibilidade

## 💡 Funcionalidades Detalhadas

### Cadastro de Candidatos
- Nome completo (obrigatório)
- E-mail (obrigatório, único)
- Telefone com máscara automática
- Cargo desejado (obrigatório)
- Experiência profissional (texto livre)
- Habilidades e competências (texto livre)
- Data de cadastro automática

### Cadastro de Empresas
- Nome da empresa (obrigatório)
- CNPJ com máscara automática (único)
- E-mail (obrigatório)
- Telefone com máscara automática
- Endereço completo
- Descrição da empresa
- Data de cadastro automática

### Sistema de Busca
- Busca instantânea em múltiplos campos
- Resultados filtrados em tempo real
- Contador de resultados
- Botão para limpar busca

### Visualização Detalhada
- Página completa com todas as informações
- Layout organizado em seções
- Links de ação rápida (editar, excluir)
- Formatação adequada de textos longos

## 🔧 Scripts Disponíveis

```bash
# Iniciar frontend e backend juntos
npm start

# Apenas frontend (desenvolvimento)
npm run dev

# Apenas backend
npm run server

# Build para produção
npm run build

# Preview do build de produção
npm run preview
```

## 📱 Compatibilidade

### Desktop
- ✅ Chrome/Edge (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

### Mobile
- ✅ Android (Chrome, Firefox)
- ✅ iOS (Safari)
- ✅ Responsivo em todos os tamanhos de tela

## 🐛 Solução de Problemas

### Erro: "Cannot find module"
- ✅ Execute `npm install` novamente
- ✅ Certifique-se de estar na pasta raiz do projeto

### Erro: "Erro ao conectar ao banco de dados"
- ✅ Verifique se o MySQL está rodando
- ✅ Confirme as credenciais no arquivo `.env`
- ✅ Certifique-se de que o usuário tem permissões para criar bancos

### Erro: "Port already in use"
- ✅ Altere a porta no arquivo `.env` (ex: `PORT=5001`)
- ✅ Ou feche o processo que está usando a porta

### Aplicação não carrega no navegador
- ✅ Certifique-se de que ambos os servidores estão rodando
- ✅ Frontend: http://localhost:3000
- ✅ Backend: http://localhost:5000/api

## 🚀 Deploy em Produção

### Frontend (React)
1. Execute `npm run build`
2. Os arquivos estarão na pasta `dist/`
3. Faça deploy em serviços como Vercel, Netlify, etc.

### Backend (Node.js)
1. Configure variáveis de ambiente no servidor
2. Instale dependências: `npm install --production`
3. Execute: `node server/index.js`
4. Use PM2 ou similar para manter o processo rodando

### Banco de Dados
- Use um serviço de banco MySQL gerenciado (ex: AWS RDS, PlanetScale)
- Ou configure MySQL no seu servidor

## 📊 API Endpoints

### Candidatos
- `GET /api/candidatos` - Listar todos (com busca opcional: `?busca=termo`)
- `GET /api/candidatos/:id` - Buscar por ID
- `POST /api/candidatos` - Criar novo
- `PUT /api/candidatos/:id` - Atualizar
- `DELETE /api/candidatos/:id` - Deletar

### Empresas
- `GET /api/empresas` - Listar todas (com busca opcional: `?busca=termo`)
- `GET /api/empresas/:id` - Buscar por ID
- `POST /api/empresas` - Criar nova
- `PUT /api/empresas/:id` - Atualizar
- `DELETE /api/empresas/:id` - Deletar

### Estatísticas
- `GET /api/stats` - Retorna contagem de candidatos e empresas

## 🔒 Segurança

- ✅ Proteção contra SQL Injection (usando prepared statements)
- ✅ Validação de dados no frontend e backend
- ✅ Sanitização de entradas
- ✅ Validação de tipos de dados
- ✅ CORS configurado

## 🚀 Próximas Melhorias Sugeridas

- [ ] Sistema de autenticação e login
- [ ] Exportação de dados (CSV, PDF)
- [ ] Gráficos e relatórios avançados
- [ ] Paginação nas listagens
- [ ] Upload de fotos de perfil
- [ ] Sistema de tags/categorias
- [ ] Histórico de alterações
- [ ] Notificações por e-mail
- [ ] Modo escuro (dark mode)
- [ ] Testes automatizados

## 📝 Licença

Este projeto é de código aberto e está disponível para uso pessoal e educacional.

## 👨‍💻 Tecnologias Utilizadas

- **Frontend:**
  - React 18.2
  - React Router DOM 6.20
  - Axios 1.6
  - Vite 5.0

- **Backend:**
  - Node.js 18+
  - Express 4.18
  - MySQL2 3.6
  - CORS 2.8
  - Dotenv 16.3

- **Estilização:**
  - CSS3 (Grid, Flexbox, Custom Properties)
  - Font Awesome Icons
  - Google Fonts (Poppins)

## 📞 Suporte

Para dúvidas ou problemas:
1. Consulte a seção "Solução de Problemas" acima
2. Verifique os logs no console do navegador (F12)
3. Verifique os logs do servidor no terminal

---

**⭐ Se este projeto foi útil, considere dar uma estrela!**




