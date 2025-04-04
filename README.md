# 🎮 Jogo Gênios - React Native

Um jogo estilo "Genius" criado com **React Native**, inspirado no clássico jogo de memória. O jogador deve repetir corretamente uma sequência de quadrados iluminados. A cada acerto, a sequência aumenta!

## 🚀 Demonstração

Execute o jogo diretamente pelo [Snack Expo](https://snack.expo.dev) com o código fornecido no projeto.

## 🧠 Regras do Jogo

- O jogo começa com **um quadrado piscando**.
- O jogador deve repetir a sequência exata tocando nos quadrados na mesma ordem.
- A cada acerto, **um novo passo é adicionado à sequência**.
- Se o jogador errar a sequência, o jogo **reinicia automaticamente**.

## 🔁 Funcionalidades

- Interface com **9 quadrados (3x3)**.
- **3 níveis de dificuldade**:
  - Fácil: velocidade mais lenta
  - Médio: velocidade intermediária
  - Difícil: velocidade rápida
- **Feedback visual**:
  - Fundo **verde** para acertos
  - Fundo **vermelho** para erros
- Bloqueio de cliques enquanto a sequência estiver sendo exibida.
- Alerta ao iniciar o jogo com opções de **Reiniciar** ou **Cancelar**.

## 🎛️ Controles

- **Iniciar**: começa ou reinicia o jogo.
- **Dificuldade**: alterna entre os níveis e reinicia automaticamente.

## 🛠️ Tecnologias Utilizadas

- React Native
- Expo Snack
- JavaScript (Hooks: `useState`, `useEffect`)
- Estilização com `StyleSheet`

## 📁 Estrutura

- `App.js`: lógica principal do jogo e interface.
- Componentes:
  - Grade de botões
  - Botões de controle
  - Sistema de alerta e feedback visual
---
