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
    const [productImages, setProductImages] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProductDetails = async () => {
            setLoading(true);
            try {
                const detailResponse = await productService.GetProductDetailByProductNameID(productId);
                if (detailResponse.statusCode === 'SUCCESS' && detailResponse.data.length > 0) {
                    setProductDetails(detailResponse.data[0]);
                } else {
                    console.error('Failed to fetch product details');
                    setError('Failed to fetch product details');
                }
                
                const imagesResponse = await productService.GetProductImagesByProductNameID(productId);
                if (imagesResponse.statusCode === 'SUCCESS' && imagesResponse.data.length > 0) {
                    console.log('Product Images:', imagesResponse.data[0]);
                    setProductImages(imagesResponse.data[0]);
                    console.log('Set State:', productImages);
 
                } else {
                    console.error('Failed to fetch product images');
                    setError('Failed to fetch product images');
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
                setError('Error fetching product details');
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [productId]);

    if (loading) {
        return <div>Loading product details...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!productDetails) {
        return <div>Product not found</div>;
    }

    const {
        titleEng, titleSin, titleTam, desEng, desSin, desTam,
        subTitleEng, subTitleSin, subTitleTam, pointListEng, pointListSin, pointListTam
    } = productDetails;

    const getTitle = () => ({ en: titleEng, si: titleSin, ta: titleTam }[language]);
    const getDescription = () => ({ en: desEng, si: desSin, ta: desTam }[language]);
    const getSubtitle = () => ({ en: subTitleEng, si: subTitleSin, ta: subTitleTam }[language]);
    const getPointList = () => ({ en: pointListEng, si: pointListSin, ta: pointListTam }[language].split('\r\n'));

    // Base64 URL to image format
    const toImageUrl = base64Url => `data:image/jpeg;base64,${base64Url}`;

    const { logo, qrAndroid, qrApple, qrHuawei } = productImages;
    const qrCodes = {
        appStore: toImageUrl(qrApple),
        playStore: toImageUrl(qrAndroid),
        huaweiStore: toImageUrl(qrHuawei)
    };

    return (
        <div className="product-details-container">
            <VideoBackground />
           {logo ? (
    <img src={toImageUrl(logo)} alt="Product logo" />
) : (
    <div>No logo data or rendering issue</div>
)}

            <h1>{getTitle()}</h1>
            <p>{getDescription()}</p>
            <h2>{getSubtitle()}</h2>
            <ul>
                {getPointList().map((point, index) => (
                    <li key={index}>{point}</li>
                ))}
            </ul>
            <DownloadApp qrCodes={qrCodes} />
            <div className="navigation-buttons">
                <FAQButton productId={productId} />
                <DemoVideoButton />
                <FeedbackButton productName={getTitle()} />
            </div>
        </div>
    );
}

export default ProductDetailsPage;
