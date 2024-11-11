
import { useNavigate } from 'react-router-dom';
import products from './products';
import "../style/digitalProducts.css"
import DigitalProductBackground from "../components/DIgitalProductBackground"



// Component that displays the Digital Products page
const DigitalProductsPage = ({ language }) => {
  const navigate = useNavigate();
 

  const titles = {
    en: "BOC Digital Products",
    si: "BOC ඩිජිටල් නිෂ්පාදන",
    ta: "BOC டிஜிட்டல் தயாரிப்புகள்"
  };


  const handleRedirect = (url) => {
    navigate(url);
  }

  



  return (
    <div className="digital-products-container">
        <DigitalProductBackground /> 
        <div className="onctainecontent-area">
     
      <h1 className="page-title">{titles[language]}</h1>
      <div className="products-grid">
        {products.map(product => (
          <button
            key={product.id}
            className="product-button"
            style={{ backgroundColor: product.color }}
            onClick={() => handleRedirect(product.link)}
          >
            <img src={product.image} alt={product.name} />
            <span>{product.name}</span>
          </button>
        ))}
      </div>
    </div>
    </div>
  
  );
}

export default DigitalProductsPage;
