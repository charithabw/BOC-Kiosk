const productDetails = [
    {
        id: 1,
        name: {
            en: 'Smartphone',
            si: 'ස්මාර්ට් දුරකථන',
            ta: 'ஸ்மார்ட்போன்'
        },
        description: {
            en: 'Explore the latest smartphone with cutting-edge technology and design.',
            si: 'නවතම තාක්ෂණය සහ නිර්මාණය සහිත දුරකථනය ගවේෂණය කරන්න.',
            ta: 'சமீபத்திய தொழில்நுட்பம் மற்றும் வடிவமைப்புடன் கூடிய ஸ்மார்ட்போனை ஆராயுங்கள்.'
        },
        features: {
            en: [
                'High-resolution touchscreen display',
                'Triple camera system for wide, ultra-wide, and telephoto photography',
                'Fast charging and long-lasting battery life',
                'Water and dust resistance'
            ],
            si: [
                'උසස් විභේදනය සහිත ටච් තිරය',
                'පුළුල්, අති පුළුල්, සහ දුර ඡායාරූප කිරීමේ කැමරා පද්ධතිය',
                'ඉක්මන් ආරෝපණය සහ දිගු කාලීන බැටරි ජීවිතය',
                'ජල සහ දූවිලි ආරක්ෂාව'
            ],
            ta: [
                'உயர் தீர்மானம் தொடுதிரை காட்சி',
                'அகலமான, மிக அகலமான, மற்றும் டெலிபோட்டோ புகைப்படக்கலைக்கான மூன்று கேமரா அமைப்பு',
                'விரைவான சார்ஜிங் மற்றும் நீண்ட கால பேட்டரி வாழ்க்கை',
                'நீர் மற்றும் தூசி எதிர்ப்பு'
            ]
        },
        qrCodes: {
            appStore: 'path/to/appstore-qr.png',
            playStore: 'path/to/playstore-qr.png',
            huaweiStore: 'path/to/huaweistore-qr.png'
        }
    },
    {
        id: 2,
        name: {
            en: 'Laptop',
            si: 'ලැප්ටොප්',
            ta: 'லேப்டாப்'
        },
        description: {
            en: 'Lightweight laptop with high performance for professionals and students.',
            si: 'වෘත්තීයයන් සහ ශිෂ්‍යයන් සඳහා ඉහළ කාර්ය සාධනය සහිත සැහැල්ලු ලැප්ටොප්.',
            ta: 'தொழில்முறையாளர்கள் மற்றும் மாணவர்களுக்கான உயர் செயல்திறன் கொண்ட லேசான லேப்டாப்.'
        },
        features: {
            en: [
                'Ultra HD display for crystal clear visuals',
                'Integrated graphics for high-end gaming and professional software',
                'Backlit keyboard for night-time use',
                'SSD storage for faster access and boot times'
            ],
            si: [
                'තෙත් පැහැදිලි දර්ශන සඳහා අල්ට්‍රා HD දර්ශනය',
                'උසස් ගේමින් සහ වෘත්තීය මෘදුකාංග සඳහා ඒකාබද්ධ ග්‍රැෆික්',
                'රාත්‍රී කාලයේ භාවිතය සඳහා පසුබිම් ආලෝක යතුරුපුවරුව',
                'ඉක්මන් ප්‍රවේශය සහ ඇරුම් කාල සඳහා SSD ගබඩාකිරීම'
            ],
            ta: [
                'மிக தெளிவான காட்சிகளுக்கு அல்ட்ரா ஹெச்டி காட்சி',
                'உயர் முடிவு விளையாட்டுக்கள் மற்றும் தொழில்முறை மென்பொருள் கையாள்வதற்கு ஒருங்கிணைந்த கிராபிக்ஸ்',
                'இரவு நேர பயன்பாட்டுக்கான பின்னணி விளக்கம் கொண்ட கீபோர்ட்',
                'வேகமான அணுகலுக்கும் பூட் நேரங்களுக்கும் எஸ்எஸ்டி சேமிப்பு'
            ]
        },
        qrCodes: {
            appStore: 'path/to/appstore-qr.png',
            playStore: 'path/to/playstore-qr.png',
            huaweiStore: 'path/to/huaweistore-qr.png'
        }
    }
];

export default productDetails;
