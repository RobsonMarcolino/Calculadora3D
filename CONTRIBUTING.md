# Contribuindo com a Calculadora 3D

Obrigado pelo interesse em contribuir! 🎉

## 🚀 Setup local

```bash
# Clone o repositório
git clone https://github.com/RobsonMarcolino/Calculadora3D.git
cd Calculadora3D/lbk-12c

# Instale as dependências
pnpm install

# Inicie o dev server
pnpm dev
```

> 💡 Adicione `?edit=1` na URL para abrir o editor de layout ao vivo.

## 📋 Padrões de commit

Usamos [Conventional Commits](https://www.conventionalcommits.org/pt-br):

| Prefixo | Uso |
|---|---|
| `feat:` | Nova funcionalidade |
| `fix:` | Correção de bug |
| `docs:` | Apenas documentação |
| `style:` | Formatação (não altera lógica) |
| `refactor:` | Refatoração de código |
| `test:` | Adição ou correção de testes |
| `chore:` | Manutenção (deps, config, CI) |
| `perf:` | Melhoria de performance |
| `a11y:` | Acessibilidade |
| `ci:` | Mudanças em CI/CD |

### Exemplos

```
feat: add PDF export for pricing quotes
fix: correct knob rotation on mobile Safari
docs: add architecture diagram to README
chore: update React Three Fiber to v9
```

## 🏗️ Estrutura do projeto

```
lbk-12c/
├── public/models/          # Modelo GLB do Blender
├── src/
│   ├── app/
│   │   ├── App.tsx         # Entry point (WebGL check + fallback)
│   │   └── components/
│   │       ├── calculator/     # 2D fallback + shared logic
│   │       │   ├── pricing.ts      # Pricing engine (pure logic)
│   │       │   ├── Controls.tsx    # Keycaps, knobs, buttons
│   │       │   ├── Display.tsx     # LCD readout (2D)
│   │       │   └── tokens.ts      # Design tokens / palette
│   │       └── calculator3d/   # WebGL 3D version
│   │           ├── Scene.tsx       # R3F Canvas + camera
│   │           ├── DeviceGLB.tsx   # GLB loader + interactions
│   │           ├── ScreenReadout.tsx # HTML overlay on 3D glass
│   │           ├── materials.ts    # Procedural PBR textures
│   │           └── CalculatorContext.tsx # Shared state
│   └── styles/             # CSS (Tailwind + custom fonts)
├── .github/workflows/      # CI/CD (GitHub Pages deploy)
├── Dockerfile              # Container build (Nginx)
└── nginx.conf              # Production server config
```

## 🔍 Guidelines

1. **TypeScript strict** — nunca use `any` sem justificativa
2. **Componentes focados** — cada componente faz uma coisa
3. **Pricing é puro** — `pricing.ts` não tem side-effects, só lógica
4. **3D e 2D separados** — o fallback 2D em `calculator/` é independente do 3D
5. **Testes** — toda lógica de pricing precisa ter testes

## 🧪 Testes

```bash
pnpm test          # Roda testes unitários
pnpm build         # Verifica se o build compila
```

## 🌐 Deploy

O deploy é automático via GitHub Actions. Cada push na branch `main` dispara:

1. `pnpm install --frozen-lockfile`
2. `pnpm build`
3. Deploy no GitHub Pages

## 📝 Pull Requests

1. Crie uma branch: `git checkout -b feat/minha-feature`
2. Faça commits semânticos
3. Abra um PR com descrição clara
4. Aguarde review

---

Feito com ☕ por [Robson Jr](https://github.com/RobsonMarcolino)
