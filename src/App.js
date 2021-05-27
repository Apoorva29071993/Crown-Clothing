import './App.css';
import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './components/shop/shop.component.jsx';
import {Route , Switch } from 'react-router-dom';

const HatsPage = () => (
  <div>
    <h1>Hats Page</h1>
  </div>
)

function App() {
  return (
    <div>
      <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/shop" component={ShopPage} />
      </Switch>
    </div>
  );
}

export default App;
