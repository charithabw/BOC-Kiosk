import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../language/LanguageContext';
import categoryService from '../categories/Services';
import VideoBackground from '../components/VideoBackground';
import './style.css';
import categories from './categories';
import Services from './Services';

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
    <div className="category-page">
      <VideoBackground />
      <h2>Categories</h2>
      <div
        className="categories-container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          gap: '20px',
          position: 'absolute',
          right: '20px',
          top: '100px',
        }}
      >
        {categories.map((category) => (
          <button
            key={category.categoryID} // unique key from the data
            className="category-button"
            onClick={() => handleCategoryClick(category.categoryID)}
            style={{
              width: '200px',
              height: '60px',
              fontSize: '1rem',
              fontWeight: 'bold',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #ff7e5f, #feb47b)',
              color: '#fff',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
            }}
          >
            {/* Dynamically display category name based on language */}
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
