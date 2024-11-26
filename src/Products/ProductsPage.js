import React, { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from './products'; 
import { useLanguage } from '../language/LanguageContext'; 
import VideoBackground from '../components/VideoBackground';
import './style.css'

function ProductsPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage(); // Correctly using the useContext hook with the custom hook
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    // Simulate fetching data: Filter products based on categoryId
    const filteredProducts = products.filter(product => product.categoryId === categoryId);
    setCategoryProducts(filteredProducts);
  }, [categoryId]); // Ensuring the dependency is correctly tracked

  const handleProductClick = (productId) => {
    navigate(`/product-details/${productId}`); // Navigate to the product details page using the product ID
  };

  return (
    <div className="products-page" >
     
    <div className="products-container">

      <h1>{`Products for Category ID: ${categoryId}`}</h1>
      <div className="products-grid">
      <VideoBackground/>
        {categoryProducts.map(product => (
          <button
            key={product.id}
            className="product-button"
            onClick={() => handleProductClick(product.id)}
            style={{ backgroundImage: `url(${product.image})` }} // Example of setting the image as a background
          >
            {/* Accessing the product name based on the selected language */}
            <span>{product.name[language]}</span>
          </button>
        ))}
      </div>
    </div>
    </div>
  );
}

export default ProductsPage;
