import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../language/LanguageContext';
import productService from './services';
import VideoBackground from '../components/VideoBackground';
import './style.css';

function ProductsPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await productService.GetProductNamebyCategoryID(categoryId);
        if (response.statusCode === 'SUCCESS') {
          setProducts(response.data.map(item => ({
            ...item,
            id: item.productNameID,
            image: '#',  // Use a valid image URL here
            name: {
              en: item.prodEng,
              si: item.prodSin,
              ta: item.prodTam
            }
          })));
        } else {
          console.error('Failed to fetch products:', response.message);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  const handleProductClick = (productId) => {
    navigate(`/product-details/${productId}`);
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="products-page">
      <VideoBackground />
      <h1 style={{ color: '#54004E' }}>{`Products for Category ID: ${categoryId}`}</h1>
      <div className="products-grid">
        {products.map(product => (
          <button
            key={product.id}
            className="product-button"
            onClick={() => handleProductClick(product.id)}
            style={{
              backgroundImage: `url(${product.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#F0B310', // Vibrant Gold as a fallback color
            }}
          >
            <span>{product.name[language]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
