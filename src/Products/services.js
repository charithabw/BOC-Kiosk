import { CommonGet } from '../Common/HttpClient';


async function GetProductNamebyCategoryID(categoryId) {
    console.log("hitproduct");
    
    let response = await CommonGet(`ProductName/GetProductName`, `CategoryID=${categoryId}`);
    console.log(response);
    return response;
}


const productService = {
    GetProductNamebyCategoryID
};

export default productService;
