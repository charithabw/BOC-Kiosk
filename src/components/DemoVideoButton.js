import React from 'react';
import { useNavigate } from 'react-router-dom';

const DemoVideoButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/demo-video'); 
    };

    return (
        <button onClick={handleClick}>
            Demo Video
        </button>
    );
};

export default DemoVideoButton;
