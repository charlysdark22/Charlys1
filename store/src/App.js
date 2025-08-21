import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './App.css';

function App() {
  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>Tienda Online</h1>
      <ProductList />
      <Cart />
    </div>
  );
}

export default App;