import React from 'react';
import { useParams } from 'react-router-dom';

const FAQPage = () => {
    const { productId } = useParams();

    return (
        <div>
            <h1>FAQ for Product {productId}</h1>
         
        </div>
    );
};

export default FAQPage;
