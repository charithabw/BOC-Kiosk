import React from 'react';
import { useNavigate } from 'react-router-dom';

const FAQButton = ({ productId }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/faq/${productId}`); 
    };

    return (
        <button onClick={handleClick}>
            FAQ
        </button>
    );
};

export default FAQButton;


