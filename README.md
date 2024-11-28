# Todo
 - DetailPage im oad-backend zum Laufen bringen
   - die ganzen Queries und anderen Parameter? der MediaSelection übergeben
     - Ev, das MediaObject-Handling extrahieren? (oad-backend spezifisch?)
 - Die Library im OAD-Backend testweise einbauen
   - Fehler beheben
 - Im ScrollVisibilityTrigger.tsx wurden im useEffect alle Abhängigkeiten hinzugefügt
   - Führt das jetzt zu endlos loop?
     - Kurz mit einem console.debug checken
   - Ev nicht. Wenn doch, muss wohl der Setter nur aufgerufen werden, wenn sich der Listener geändert hat.
   - Same
     - in useEffect von useBackOnEscape.ts
   - Falls es allgemein noch Probleme gibt. Es wurden noch bei anderen `useEffects` Abhängigkeiten eingefügt
   - Kurz checken ob der Trick mit der defaultSortingCombination noch funktioniert?
     - Da wurde auch das useEffect erweitert (siehe useSorting)
 - Unterschied zwischen LoadingIndicator und Spinner?
 - Wenn relay-bee komplett extrahiert ist, checken ob der LoadingIndicator im Suspense vom NavigationLayout wieder funktioniert?
   - Funktioniert momentan auf der ActList nicht. Dort wird beim Laden der Tabellen-Header angezeigt und sonst nichts

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
