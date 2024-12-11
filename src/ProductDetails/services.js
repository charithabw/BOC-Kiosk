import { CommonGet } from '../Common/HttpClient';

async function GetProductDetailByProductNameID(productNameId) {
    console.log("Fetching Product Details");
    try {
        const response = await CommonGet(`ProductDetail/GetProductDetailByProductNameID`, `productNameID=${productNameId}`);
        console.log("Product Details:", response);
        return response;
    } catch (error) {
        console.error("Error fetching product details:", error);
        throw error;
    }
}

async function GetProductImagesByProductNameID(productNameId) {
    console.log("Fetching Product Images");
    try {
        const response = await CommonGet(`ProductImage/GetProductImageByProductNameID`, `productNameID=${productNameId}`);
        console.log("Product Images:", response);
        console.log("Fetching Product images");
        
        return response;
    } catch (error) {
        console.error("Error fetching product images:", error);
        throw error;
    }
}

const productService = {
    GetProductDetailByProductNameID,
    GetProductImagesByProductNameID
};

export default productService;
