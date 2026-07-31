# Calculadora 3D — Freelancer Pricing Calculator

[![Deploy to GitHub Pages](https://github.com/RobsonMarcolino/Calculadora3D/actions/workflows/deploy.yml/badge.svg)](https://github.com/RobsonMarcolino/Calculadora3D/actions/workflows/deploy.yml)

![Calculadora 3D](docs/preview.png)

> 🔗 **[Acesse a demo ao vivo →](https://robsonmarcolino.github.io/Calculadora3D/)**

Uma ferramenta de precificação para designers freelancer, construída como um **dispositivo 3D fotorrealista que você opera de verdade**: gira os knobs, aperta os botões de serviço e vê o display dot-matrix rolar até o preço. Os valores são calibrados para o mercado de design brasileiro.

---

## 👨‍💻 Sobre este projeto

Este projeto foi desenvolvido por **Robson Marcolino Jr** como estudo e aprendizado, baseado no projeto original [LBK-12C](https://github.com/leobeckerdesign/lbk-12c) criado por **Leo Becker** ([Leo Becker Media House](https://leobecker.com)).

Agradeço ao Leo pelo projeto incrível que serviu como base para meu aprendizado em React Three Fiber, modelagem 3D com Three.js e desenvolvimento web moderno.

## ✨ O que faz

Escolha um serviço (**ID**, **Landing Page** ou **Pitch Deck**), ajuste o porte do cliente, o seu nível de senioridade e o quanto você quer o trabalho. O dispositivo calcula um preço calibrado ao mercado e ainda explica a metodologia por trás.

## 🛠️ Stack

| Tecnologia | Uso |
|---|---|
| **Vite 6** | Build & dev server |
| **React 18** + **TypeScript** | UI & lógica |
| **React Three Fiber** | Dispositivo 3D (three.js + drei + postprocessing + react-spring) |
| **Tailwind CSS v4** | Estilização |
| **Blender** | Modelo 3D (`public/models/lbk12c.glb`) |
| **GitHub Pages** | Hospedagem da demo |

> 💡 Um **fallback 2D** em CSS puro entra automaticamente quando o WebGL não está disponível.

## 🚀 Rodar localmente

```bash
pnpm install
pnpm dev        # http://localhost:5173
```

Adicione `?edit=1` na URL para abrir o editor de layout ao vivo (sliders, gizmos e orbit).

## 📦 Build

```bash
pnpm build      # saída estática em dist/
```

## 🌐 Deploy

O deploy é automático via **GitHub Actions**. Cada push na branch `main` dispara o build e publica no GitHub Pages.

## 📄 Créditos

- **Projeto original:** [LBK-12C](https://github.com/leobeckerdesign/lbk-12c) por [Leo Becker](https://leobecker.com)
- **Fork e adaptação:** [Robson Marcolino Jr](https://github.com/RobsonMarcolino)

---

© 2026 Robson Marcolino Jr — Baseado no projeto LBK-12C de Leo Becker Media House
