// CategoryPage.js
import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import categories from './categories'; // Importing categories
import Services from './Services';

function CategoryPage({ language = 'en' }) { // Default language is English
  const navigate = useNavigate(); // Hook to handle navigation

  useEffect(() => {  
      getAllCategories();
  });

  const handleCategoryClick = (category) => {
    if (category.en === 'Digital Products') {
      navigate('/digital-products');
    } else {     
      
      console.log(`Category ${category.en} clicked!`); // Debugging line
    }
  };

  async function getAllCategories() {
    const categories = await Services.getAllCategories();
    
  }

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
