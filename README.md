<h1 align="center">Pseudopotential library</h1>

<p align="center">
<a href=https://app.netlify.com/sites/pseudos/deploys><img src="https://api.netlify.com/api/v1/badges/20168620-4d9d-4a72-a1ad-cf223f591d6f/deploy-status" alt="Netlify Status" /></a>
</p>

A place to download various pseudopotentials. Open webapp
https://pseudos.netlify.app


## Development

Initialize project using vite:
```console
npm create vite@latest pseudos -- --template react-ts
```

Upgrade minor deps:
```console
npx -y npm-check-updates --target minor -u
```

Run local dev server:
```console
npm run dev
```

Add MUI:
```console
npm install @mui/material @emotion/react @emotion/styled
```
