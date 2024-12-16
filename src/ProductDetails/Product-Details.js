import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../language/LanguageContext';
import productService from './services';
import VideoBackground from '../components/VideoBackground';
import DownloadApp from '../components/DownloadApp';
import FAQButton from '../components/FAQButton';
import DemoVideoButton from '../components/DemoVideoButton';
import FeedbackButton from '../components/FeedbackButton';
import { Box, Typography, CircularProgress, Container, List, ListItem } from '@mui/material';

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
                const imagesResponse = await productService.GetProductImagesByProductNameID(productId);
                if (detailResponse.statusCode === 'SUCCESS' && detailResponse.data.length > 0) {
                    setProductDetails(detailResponse.data[0]);
                } else {
                    console.error('Failed to fetch product details');
                    setError('Failed to fetch product details');
                }
                
                if (imagesResponse.statusCode === 'SUCCESS' && imagesResponse.data.length > 0) {
                    setProductImages(imagesResponse.data[0]);
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
        return <CircularProgress />;
    }

    if (error) {
        return <Typography variant="body1" color="error">{error}</Typography>;
    }

    if (!productDetails) {
        return <Typography variant="body1">Product not found</Typography>;
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
        <Container sx={{ padding: 3 }}>
            <VideoBackground />
            {logo ? (
                <img src={toImageUrl(logo)} alt="Product logo" style={{ width: 100, height: 'auto' }} />
            ) : (
                <Typography>No logo data or rendering issue</Typography>
            )}
            <Typography variant="h4">{getTitle()}</Typography>
            <Typography>{getDescription()}</Typography>
            <Typography variant="h6">{getSubtitle()}</Typography>
            <List>
                {getPointList().map((point, index) => (
                    <ListItem key={index}>{point}</ListItem>
                ))}
            </List>
            <DownloadApp qrCodes={qrCodes} />
            <Box display="flex" justifyContent="space-between">
                <FAQButton productId={productId} />
                <DemoVideoButton />
                <FeedbackButton productName={getTitle()} />
            </Box>
        </Container>
    );
}

export default ProductDetailsPage;
