import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import LanguageContext from '../language/LanguageContext';

function FAQPage() {
    const { productId } = useParams();
    const { language } = useContext(LanguageContext);
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        // Mock fetch function to simulate fetching FAQs specific to the product ID and language
        const fetchFAQs = async () => {
            // This URL is hypothetical; replace it with your actual API endpoint
            const response = await fetch(`/api/products/${productId}/faqs?lang=${language}`);
            const data = await response.json();
            setFaqs(data);
        };

        fetchFAQs();
    }, [productId, language]);

    if (faqs.length === 0) {
        return <div>Loading FAQs...</div>;
    }

    return (
        <div className="faq-page">
            <h1>Product FAQs</h1>
            {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                    <h2>{faq.question}</h2>
                    <p>{faq.answer}</p>
                </div>
            ))}
        </div>
    );
}

export default FAQPage;
