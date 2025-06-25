import { CommonGet } from "../Common/HttpClient";

export default {
  getAllCategories,
};

async function getAllCategories() {
  let response = await CommonGet("Catogory/GetCatorgory");
  console.log(response);
  return response;
}
