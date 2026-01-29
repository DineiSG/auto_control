# 🚗 Auto Control

Aplicação frontend desenvolvida em **React** com **Vite**, voltada para controle e gerenciamento de dados, integrando-se a uma API backend.

---

## 📦 Requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)  
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)  

---

## ⚙️ Variáveis de Ambiente

O projeto utiliza variáveis de ambiente definidas em um arquivo `.env`.  
Exemplo de configuração:

```bash
VITE_API_BASE_URL=http://localhost:8090/api/v1
```

> Essa variável define a URL base da API utilizada pela aplicação.

---

## 🚀 Instalação e Execução

Clone este repositório e instale as dependências:

```bash
git clone https://github.com/DineiSG/Integracao-Auto-Control-VistoriaGO
cd auto_control
npm install
```

### Rodar em modo desenvolvimento:

```bash
npm run dev
```

A aplicação ficará disponível em:  
👉 [http://localhost:5173](http://localhost:5173)

### Gerar build de produção:

```bash
npm run build
```

### Visualizar build de produção:

```bash
npm run preview
```

### Rodar ESLint (análise de código):

```bash
npm run lint
```

---

## 📚 Principais Dependências

- **React 19** – Biblioteca principal  
- **Vite** – Ferramenta de build e desenvolvimento rápido  
- **React Router DOM** – Roteamento de páginas  
- **Bootstrap / React-Bootstrap** – Estilização e componentes prontos  
- **Chart.js / Recharts / React-Chartjs-2** – Gráficos e dashboards  
- **Lucide React & FontAwesome** – Ícones  
- **Axios ou Fetch (nativo)** – Comunicação com API (via hooks personalizados)  
- **JSPDF e XLSX** – Exportação de relatórios e dados  

---

## 📂 Estrutura do Projeto (resumida)

```bash
auto_control/
│── public/         # Arquivos estáticos
│── src/
│   ├── assets/     # Imagens, fontes, estilos
│   ├── components/ # Componentes reutilizáveis
│   ├── hooks/      # Hooks personalizados 
│   ├── pages/      # Páginas da aplicação
|   ├── services/   # Hooks de comunicação com API
│   ├── App.jsx     # Componente principal
│   └── main.jsx    # Ponto de entrada da aplicação
│
├── .env            # Variáveis de ambiente
├── package.json    # Configurações e dependências
└── vite.config.js  # Configuração do Vite
```

---

## 🛠️ Scripts Disponíveis

- `npm run dev` → Inicia em modo desenvolvimento  
- `npm run build` → Gera build de produção  
- `npm run preview` → Servidor local para preview da build  
- `npm run lint` → Executa ESLint  

---

## 📜 Licença

Este projeto é distribuído sob a licença **MIT**.  
Sinta-se livre para usar, modificar e distribuir conforme necessário.

**Autor:** Waldinei Santos Gonçalves
**Data:** 17 de Outubro de 2025