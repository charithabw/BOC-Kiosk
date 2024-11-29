import { CommonGet } from '../Common/HttpClient';


async function GetProductDetailByProductNameID(productNameId) {
    console.log("hitProductDetails");
    
    let response = await CommonGet(`ProductDetail/GetProductDetailByProductNameID`, `productNameID=${productNameId}`);
    console.log(response);
    return response;
}


const productService = {
    GetProductDetailByProductNameID
};

export default productService;
