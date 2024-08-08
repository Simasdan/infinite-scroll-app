# infinite-scroll-app

This is an infinite scroll application developed using React and TypeScript for the Vinted Academy admission process. The app fetches data from the Flickr API through a custom useFetch hook (based on fetch). It features two routes configured without using react-router-dom: the main route for infinite scrolling through hotos and the favourites route.

The infinite scroll route initially loads 9 photos. Each photo includes a hover state that displays the image title and a button to add the photo to favourites. As the user scrolls to the bottom, a loading animation appears while additional photos are loaded in batches of 9.

The favourites route displays photos that have been marked as "Favoured." If no photos have been favourited, a message "No favourites yet!" is shown. Otherwise, a list of favoured photos is presented.

As a front-end only application, favoured photos are stored in localStorage to persist across page reloads. Users can remove photos from their favourites from any of the presented routes.

To run the project, first install the required dependencies with:

1. 'npm install'

Then, you can start the development server using:

2. 'npm run dev'

Alternatively, to build the project and preview it, use:

2. 'npm run build'
3. 'npm run preview'

Unit tests are also included and can be run with:

npm run test

Additionally, common guidance for React, TypeScript, and Vite is provided to help with further development and troubleshooting.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

