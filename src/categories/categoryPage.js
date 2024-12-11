import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../language/LanguageContext';
import categoryService from '../categories/Services';
import ProductDetailBackground from '../components/ProductDetailBackground';
import './style.css';

function CategoryPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [categories, setCategories] = useState([]); // State to store fetched categories
  const [loading, setLoading] = useState(true); // State to handle loading

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAllCategories();
      if (response.statusCode === 'SUCCESS') {
        setCategories(response.data || []); // Update state with fetched categories
      } else {
        console.error('Failed to fetch categories:', response.message);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryID) => {
    navigate(`/products/${categoryID}`);
  };

  if (loading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className="category-page" style={{ position: 'relative', height: '100vh' }}>
      <ProductDetailBackground />
      <h2 style={{ textAlign: 'center', color: '#54004E' }}>Categories</h2>
      <div
        className="categories-container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '30px',
          margin: '0 auto',
          paddingTop: '50px', // Adjust top padding
        }}
      >
        {categories.map((category) => (
          <button
            key={category.categoryID}
            className="category-button"
            onClick={() => handleCategoryClick(category.categoryID)}
            style={{
              width: '300px', // Increased width
              height: '80px', // Increased height
              fontSize: '1.25rem', // Increased font size
              fontWeight: 'bold',
              borderRadius: '20px', // Rounded corners
              background: 'linear-gradient(135deg, #F0B310, #C8940E)', // Using brand colors
              color: '#F7F7F7', // Using light gray for contrast
              boxShadow: '0 6px 10px rgba(0, 0, 0, 0.2)', // More prominent shadow for depth
              cursor: 'pointer',
              border: 'none', // Remove default border
            }}
          >
            {language === 'en'
              ? category.catEng
              : language === 'si'
              ? category.catSin
              : category.catTam}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
