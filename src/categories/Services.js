
import { CommonGet } from '../Common/HttpClient';

export default {
    getAllCategories

};


async function getAllCategories() {
    console.log("hit");
    let response = await CommonGet('Catogory/GetCatorgory');
    console.log(response);
    return response;
};