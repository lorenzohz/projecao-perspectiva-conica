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

## 🎮 Como Usar

### Interface Principal

A aplicação é dividida em três seções:

1. **Visualização 3D** (topo): Renderização interativa do objeto e sua projeção
2. **Controles** (meio): Painéis para ajustar parâmetros da projeção
3. **Explicação** (final): Seção educacional acessível através de scroll

### Objetos 3D Disponíveis

A aplicação oferece 7 objetos diferentes para visualização:

- **Cubo**: Hexaedro regular com 8 vértices
- **Pirâmide**: Pirâmide de base quadrada
- **Casa**: Estrutura em forma de casa com telhado
- **Letra L**: Forma extrudada da letra L
- **Tubarão**: Modelo estilizado de tubarão
- **Pac-Man**: Personagem icônico com boca aberta
- **Vaso**: Vaso de flores com base, bojo, pescoço e borda

### Controles Principais

#### 1. Seleção de Objeto
Use o dropdown para escolher entre os 7 objetos 3D disponíveis. O objeto selecionado será renderizado em **ciano** (original) e sua projeção em **vermelho**.

#### 2. Ponto de Vista (C)
Controla a posição do observador no espaço através das coordenadas `(a, b, c)`:
- **a**: Posição no eixo X (horizontal)
- **b**: Posição no eixo Y (vertical)
- **c**: Posição no eixo Z (profundidade)

Use os **sliders** para ajuste rápido ou visualize o valor numérico ao lado.

#### 3. Plano de Projeção (P1, P2, P3)
Define o plano onde a projeção é renderizada através de três pontos não colineares:
- **P1, P2, P3**: Pontos que definem o plano de projeção
- **P3 = R0**: O ponto P3 também serve como origem (R0) do plano, evitando inconsistências

Cada ponto possui coordenadas **X, Y, Z** editáveis através de inputs numéricos. **Dica**: Ao clicar em um campo, todo o conteúdo é selecionado automaticamente, facilitando a edição de valores (incluindo negativos).

#### 4. Checkboxes de Visualização
- ☑️ **Original**: Mostra/oculta o objeto 3D original (ciano)
- ☑️ **Projeção**: Mostra/oculta a projeção no plano (vermelho)
- ☑️ **Raios**: Mostra/oculta as linhas de projeção do ponto de vista aos vértices

#### 5. Transformação Janela→Viewport 📐
Ativa um overlay que demonstra a transformação de coordenadas da janela (bounding box dos pontos projetados) para a viewport (área de visualização 2D). O overlay:
- Mostra os limites da janela de visualização
- Exibe o objeto projetado transformado para coordenadas de tela
- É redimensionável (arraste o canto inferior direito)
- Adapta o conteúdo automaticamente ao redimensionar

#### 6. Botão Reset 🔄
Restaura todos os valores para os padrões iniciais:
- Ponto de vista: (5, 5, 10)
- Plano: P1=(-3,0,0), P2=(3,0,0), P3=(0,3,0)
- Objeto: Cubo
- Todas as visualizações ativadas

#### 7. Controles de Câmera 3D
Na visualização 3D, você pode interagir com a cena:
- **Rotacionar**: Clique e arraste com o botão esquerdo do mouse
- **Zoom**: Use a roda do mouse (scroll)
- **Pan**: Clique e arraste com o botão direito do mouse

#### 8. Legenda
Identifica visualmente cada elemento da cena:
- 🔵 **Ciano**: Objeto original
- 🔴 **Vermelho**: Projeção
- 🟢 **Verde**: Plano de projeção
- 🟡 **Amarelo**: Ponto de vista
- 🟢 **Verde claro**: Pontos P1, P2, P3

### Seção Educacional

Role a página para baixo para acessar explicações detalhadas sobre:
- Conceitos de projeção perspectiva cônica
- Função de cada elemento (ponto de vista, plano, raios)
- Dicas de uso e experimentação

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
