import FavouriteLayout from './layouts/FavouritesLayout/FavouriteLayout';
import MainLayout from './layouts/MainLayout/MainLayout';
import Router from './components/Router/Router';
import Navigation from './components/Navigation/Navigation';

const routes = [
  { path: '/', component: MainLayout },
  { path: '/favourites', component: FavouriteLayout },
]

const App = () => {

  return (
    <>
      <Navigation/>
      <Router routes={routes}/>
    </>
  )
}

export default App