
import { CommonGet } from '../Common/HttpClient';

export default {
    getAllCategories

};


async function getAllCategories() {
    console.log("hit");
    let response = await CommonGet('HomeScreen/GetHomeScreen');
    console.log(response);
    return response;
};