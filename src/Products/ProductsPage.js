import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from './products'; // Temporarily using static file
import LanguageContext from '../LanguageContext';

function ProductsPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    // Filter products based on categoryId, this will be replaced with a fetch call to your database
    const filteredProducts = products.filter(product => product.categoryId.toString() === categoryId);
    setCategoryProducts(filteredProducts);
  }, [categoryId]);

  const handleProductClick = (productId) => {
    navigate(`/product-details/${productId}`); // Navigate to the product details page
  };

  return (
    <div className="products-container">
      <h1>{`Products for Category ID: ${categoryId}`}</h1>
      <div className="products-grid">
        {categoryProducts.map(product => (
          <button
            key={product.id}
            className="product-button"
            onClick={() => handleProductClick(product.id)}
          >
            <img src={product.image} alt={product.name[language]} />
            <span>{product.name[language]}</span> // Display product name based on selected language
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
