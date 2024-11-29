import React from 'react';
import { useNavigate } from 'react-router-dom';

const FeedbackButton = ({ productName }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/feedback/${productName}`); 
    };

    return (
        <button onClick={handleClick}>
            Customer Feedback
        </button>
    );
};

export default FeedbackButton;
