import React, { useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', quantity: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const restockThreshold = 5;

  const addProduct = () => {
    if (newProduct.name.trim() !== '' && newProduct.quantity > 0) {
      setProducts([...products, newProduct]);
      setNewProduct({ name: '', quantity: 0 });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const productsToRestock = products.filter(
    product => product.quantity < restockThreshold
  );

  return (
    <div className="App">
      <h1>Inventory Tracker</h1>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={handleInputChange}
        />
        <button onClick={addProduct}>Add Product</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search Products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <h2>Product List</h2>
      <ul>
        {filteredProducts.map((product, index) => (
          <li key={index}>
            {product.name} - {product.quantity}
          </li>
        ))}
      </ul>
      <h2>Products to Restock</h2>
      <ul>
        {productsToRestock.map((product, index) => (
          <li key={index}>
            {product.name} - {product.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;