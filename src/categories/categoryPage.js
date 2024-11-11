// CategoryPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import categories from './categories'; // Importing categories

function CategoryPage({ language = 'en' }) { // Default language is English
  const navigate = useNavigate(); // Hook to handle navigation

  const handleCategoryClick = (category) => {
    if (category.en === 'Digital Products') {
      navigate('/digital-products');
    } else {     
      
      console.log(`Category ${category.en} clicked!`); // Debugging line
    }
  };

  return (
    <div className="category-page">
      <h2>Categories</h2>
      <div className="categories-container">
        {categories.map(category => (
          <button
            key={category.id}
            className="category-button"
            onClick={() => handleCategoryClick(category)}
          >
            {category[language]}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
