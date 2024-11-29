import React from 'react';
import { useParams } from 'react-router-dom';

const FeedbackPage = () => {
    const { productName } = useParams();

    return (
        <div>
            <h1>Feedback for {productName}</h1>
          
        </div>
    );
};

export default FeedbackPage;
