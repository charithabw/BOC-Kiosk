// src/Products/products.js
const products = [
    // Category 1: Digital Accounts
    {
        id: '1',
        categoryId: '1',
        name: {
            en: 'Basic Digital Account',
            si: 'මූලික ඩිජිටල් ගිණුම',
            ta: 'அடிப்படை டிஜிட்டல் கணக்கு'
        },
        description: {
            en: 'An easy start for your digital banking needs.',
            si: 'ඔබේ ඩිජිටල් බැංකුකරණය අවශ්‍යතා සඳහා පහසු ආරම්භයක්.',
            ta: 'உங்கள் டிஜிட்டல் வங்கி தேவைகளுக்கான எளிய தொடக்கம்.'
        },
        image: 'path/to/basic-digital-account.png'
    },
    {
        id: '2',
        categoryId: '1',
        name: {
            en: 'adavced Digital Account',
            si: 'මූලික ඩිජිටල් ගිණුම',
            ta: 'அடிப்படை டிஜிட்டல் கணக்கு'
        },
        description: {
            en: 'An easy start for your digital banking needs.',
            si: 'ඔබේ ඩිජිටල් බැංකුකරණය අවශ්‍යතා සඳහා පහසු ආරම්භයක්.',
            ta: 'உங்கள் டிஜிட்டல் வங்கி தேவைகளுக்கான எளிய தொடக்கம்.'
        },
        image: 'path/to/basic-digital-account.png'
    },
    // Category 2: Minor and Youth Accounts
    {
        id: '2',
        categoryId: '2',
        name: {
            en: 'Youth Savvy Account',
            si: 'තරුණ දක්ෂ ගිණුම',
            ta: 'இளைஞர் சிக்கன கணக்கு'
        },
        description: {
            en: 'A perfect start for young individuals to manage finances.',
            si: 'තරුණ පුද්ගලයින්ගේ මුදල් කළමනාකරණය සඳහා හොඳම ආරම්භය.',
            ta: 'இளைஞர்கள் நிதி நிர்வாகத்தை கையாள உகந்த தொடக்கம்.'
        },
        image: 'path/to/youth-account.png'
    },
    // Category 3: Ladies and Regular Savings
    {
        id: '3',
        categoryId: '3',
        name: {
            en: 'Ladies Exclusive Savings',
            si: 'කාන්තා විශේෂ සුරකින්නු',
            ta: 'பெண்களுக்கான சிறப்பு சேமிப்பு'
        },
        description: {
            en: 'Special savings account designed just for women.',
            si: 'කාන්තාවන් සඳහා නිර්මාණය කරන ලද විශේෂ සුරකින්නු ගිණුම.',
            ta: 'பெண்களுக்காக வடிவமைக்கப்பட்ட சிறப்பு சேமிப்பு கணக்கு.'
        },
        image: 'path/to/ladies-account.png'
    },
    // Category 4: Investment Accounts
    {
        id: '4',
        categoryId: '4',
        name: {
            en: 'Growth Investment Account',
            si: 'වර්ධන ආයෝජන ගිණුම',
            ta: 'வளர்ச்சி முதலீட்டு கணக்கு'
        },
        description: {
            en: 'Maximize your returns with our growth-focused investment accounts.',
            si: 'අපගේ වර්ධන-කේන්ද්‍රීකරණය කරන ලද ආයෝජන ගිණුම් සමඟ ඔබේ ආදායම් වලින් උපරිමය ලබා ගන්න.',
            ta: 'எங்களுடைய வளர்ச்சி மையமான முதலீட்டு கணக்குகளுடன் உங்கள் திரும்பும் தொகையை அதிகரிக்கவும்.'
        },
        image: 'path/to/investment-account.png'
    },
    // Additional categories can be added in similar fashion
];

export default products;
