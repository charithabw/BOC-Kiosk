
import React from 'react';

const DownloadApp = ({ qrCodes }) => {
    return (
        <div className="product-qr-codes">
            <h2>Download the App</h2>
            <div className="qr-images">
                <img src={qrCodes.appStore} alt="App Store QR" />
                <img src={qrCodes.playStore} alt="Play Store QR" />
                <img src={qrCodes.huaweiStore} alt="Huawei Store QR" />
            </div>
        </div>
    );
};

export default DownloadApp;




