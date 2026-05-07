# Netlify fix

This package avoids the `vite: not found` issue by using:

```toml
command = "npx --yes vite@5.4.11 build"
```

It also removes the React plugin import from `vite.config.js`, so the build does not depend on `@vitejs/plugin-react` being available as a local binary/plugin.
