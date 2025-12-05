# Sistema de Projeção Perspectiva Cônica 3D

Sistema interativo de visualização de projeção perspectiva cônica desenvolvido com React e Three.js.

🌐 **[Versão WEB](https://lorenzohz.github.io/projecao-perspectiva-conica)**

## 📋 Pré-requisitos

### Instalação do Node.js

#### Windows
1. Acesse o site oficial: [https://nodejs.org/](https://nodejs.org/)
2. Baixe a versão LTS (Long Term Support) recomendada
3. Execute o instalador `.msi` baixado
4. Siga o assistente de instalação (aceite os termos e mantenha as opções padrão)
5. Verifique a instalação abrindo o PowerShell e executando:
```powershell
node --version
npm --version
```

#### Linux (Ubuntu/Debian)
```bash
# Atualizar repositórios
sudo apt update

# Instalar Node.js e npm
sudo apt install nodejs npm

# Verificar instalação
node --version
npm --version
```

#### macOS
```bash
# Usando Homebrew
brew install node

# Verificar instalação
node --version
npm --version
```

## 🚀 Instalação e Execução

### 1. Clonar o Repositório
```bash
git clone https://github.com/lorenzohz/projecao-perspectiva-conica.git
cd projecao-perspectiva-conica
```

### 2. Instalar Dependências
```bash
npm install
```

Este comando instalará todas as dependências necessárias:
- **React** (v19.2.0): Biblioteca para construção de interfaces
- **Three.js** (v0.181.2): Biblioteca para renderização 3D
- **@react-three/fiber** (v9.4.2): Integração React com Three.js
- **@react-three/drei** (v10.7.7): Helpers úteis para React Three Fiber
- **react-scripts** (v5.0.1): Scripts e configuração do Create React App

### 3. Executar o Projeto

#### Modo Desenvolvimento
```bash
npm start
```

O projeto será iniciado em modo de desenvolvimento e abrirá automaticamente no navegador em:
```
http://localhost:3000
```

O servidor recarrega automaticamente quando você faz alterações no código.

#### Build de Produção
```bash
npm run build
```

Cria uma versão otimizada do projeto na pasta `build/` pronta para deploy.

#### Deploy no GitHub Pages
```bash
npm run deploy
```

Faz o build e publica automaticamente no GitHub Pages.

## 📁 Estrutura do Projeto

```
projecao-perspectiva-conica/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── App.js                      # Componente principal
│   ├── App.css                     # Estilos globais
│   ├── PerspectiveProjection.jsx   # Componente de projeção 3D
│   ├── index.js                    # Ponto de entrada
│   └── index.css                   # Estilos base
├── package.json                     # Dependências e scripts
└── README.md                        # Este arquivo
```

## 🛠️ Tecnologias Utilizadas

- **React**: Framework JavaScript para UI
- **Three.js**: Biblioteca de renderização 3D WebGL
- **React Three Fiber**: Renderizador React para Three.js
- **React Three Drei**: Utilitários para React Three Fiber

## 📝 Scripts Disponíveis

- `npm start`: Inicia o servidor de desenvolvimento
- `npm run build`: Cria build de produção
- `npm test`: Executa os testes
- `npm run deploy`: Publica no GitHub Pages
- `npm run eject`: Ejeta a configuração do Create React App (irreversível)

## 📄 Licença

Este projeto é de código aberto e está disponível para fins educacionais.

## 👥 Desenvolvedores

Este projeto foi desenvolvido por:

- **Lorenzo Henrique Zanetti** - [@lorenzohz](https://github.com/lorenzohz)
- **Matheus Cenerini Jacomini** - [@Mathayuz](https://github.com/Mathayuz)

### 🎓 Contexto Acadêmico

Desenvolvido como método de avaliação para a disciplina de **Computação Gráfica** do curso de **Bacharelado em Ciência da Computação** na **Universidade Estadual de Maringá (UEM)**.

O projeto visa demonstrar na prática os conceitos estudados em sala de aula.
