
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../language/LanguageContext'; 
import productService from './services'; 
import VideoBackground from '../components/VideoBackground';
import DownloadApp from '../components/DownloadApp'; 
import FAQButton from '../components/FAQButton';
import DemoVideoButton from '../components/DemoVideoButton';
import FeedbackButton from '../components/FeedbackButton';
import '../style/App.css';

function ProductDetailsPage() {
    const { productId } = useParams();
    const { language } = useLanguage(); 
    const [productDetails, setProductDetails] = useState(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        const fetchProductDetails = async () => {
            try {
                const response = await productService.GetProductDetailByProductNameID(productId);
                if (response.statusCode === 'SUCCESS' && response.data.length > 0) {
                    setProductDetails(response.data[0]); 
                } else {
                    console.error('Failed to fetch product details');
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [productId]);

    if (loading) {
        return <div>Loading product details...</div>;
    }

    if (!productDetails) {
        return <div>Product not found</div>;
    }

    
    const { titleEng, titleSin, titleTam, desEng, desSin, desTam, subTitleEng, subTitleSin, subTitleTam, pointListEng, pointListSin, pointListTam} = productDetails;

    const qrCodes = {
        appStore: 'https://example.com/appStoreQrCode.png',
        playStore: 'https://example.com/playStoreQrCode.png',
        huaweiStore: 'https://example.com/huaweiStoreQrCode.png',
    };
    
    const title = { en: titleEng, si: titleSin, ta: titleTam }[language];
    const description = { en: desEng, si: desSin, ta: desTam }[language];
    const subTitle = { en: subTitleEng, si: subTitleSin, ta: subTitleTam }[language];
    const pointList = { en: pointListEng, si: pointListSin, ta: pointListTam }[language];
    

    return (
        <div className="product-details-container">
            <VideoBackground />
            <h1>{title}</h1>
            <p>{description}</p> 

            <h2>{subTitle}</h2> 
            <ul>
                {pointList.split('\r\n').map((point, index) => (
                    <li key={index}>{point}</li> 
                ))}
            </ul>

            <DownloadApp qrCodes={qrCodes} />


          {/* Add the button components */}
          <div className="navigation-buttons">
                <FAQButton productId={productId} />
                <DemoVideoButton />
                <FeedbackButton productName={title} />
    
            </div>
        </div>
    );
}

export default ProductDetailsPage;
