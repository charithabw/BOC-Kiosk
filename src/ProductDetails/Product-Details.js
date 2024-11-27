import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LanguageContext from '../language/LanguageContext';
import productDetails from './productdetails'; // Assuming your details file is named productDetails.js
import VideoBackground from '../components/VideoBackground';
import '../style/App.css'

function ProductDetailsPage() {
    const { productId } = useParams();
    const navigate = useNavigate();

    const { language } = useContext(LanguageContext);
    const product = productDetails.find(p => p.id === parseInt(productId));

    if (!product) {
        return <div>Product not found</div>;
    }
    const handleNavigate = (page) => {
        navigate(`/product-details/${productId}/${page}`);
    };

    return (
        <div className="product-details-container">
            <VideoBackground/>
            <h1>{product.name[language]}</h1>
            <img src={product.image} alt={product.name[language]} style={{ width: '100%', height: 'auto' }} />
            <div className="product-description">
                <p>{product.description[language]}</p>
            </div>
            <div className="product-features">
                <h2>Features</h2>
                <ul>
                    {product.features[language].map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
            </div>
            <div className="product-qr-codes">
                <h2>Download the App</h2>
                <div className="qr-images">
                    <img src={product.qrCodes.appStore} alt="App Store QR" />
                    <img src={product.qrCodes.playStore} alt="Play Store QR" />
                    <img src={product.qrCodes.huaweiStore} alt="Huawei Store QR" />
                </div>
            </div>
            <div className="navigation-buttons">
                <button onClick={() => handleNavigate('faq')}>FAQ</button>
                <button onClick={() => handleNavigate('demo-video')}>Demo Video</button>
                <button onClick={() => handleNavigate('feedback')}>Customer Feedback</button>
            </div>
        </div>
    );
}

export default ProductDetailsPage;
