import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../language/LanguageContext';
import categories from './categories';
import Services from './Services';

function CategoryPage() {
  const navigate = useNavigate();
  const { language } = useLanguage(); // Extract language using the custom hook

  useEffect(() => {
    getAllCategories();
  });

  const handleCategoryClick = (categoryId) => {
    navigate(`/products/${categoryId}`);
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
            onClick={() => handleCategoryClick(category.id)}
          >
            {category[language]} {/* Make sure this is correctly reflecting the state */}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
