# Contributing to CogniDesk AI

We welcome contributions to CogniDesk AI! Thank you for taking the time to improve this project.

## Development Workflow

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/<your-username>/cognidesk-ai.git
   cd cognidesk-ai
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your feature or bug fix:
   ```bash
   git checkout -b feature/amazing-feature
   ```
5. **Make your changes** following our code style:
   - Use TypeScript strict mode.
   - Follow the Obsidian / Zinc design system (no neon/vibecoded styling).
   - Ensure `npm run build` passes with 0 errors.
6. **Commit your changes**:
   ```bash
   git commit -m "feat: add amazing feature"
   ```
7. **Push to your fork**:
   ```bash
   git push origin feature/amazing-feature
   ```
8. **Open a Pull Request** against `main`.

## Code Style & Conventions
- Prefer functional React components with hooks.
- Use Zustand for shared application state.
- Keep components modular and single-responsibility.
