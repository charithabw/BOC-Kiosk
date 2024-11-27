import Config from "../Config";
const serviceUrl = Config.apidomain;

export const CommonGet = async (url, params = {}) => {
    const query = new URLSearchParams(params).toString();
    const fullUrl = `${serviceUrl}${url}?${query}`;

    try {
        const response = await fetch(fullUrl, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept-Language": "en-US", 
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json(); 
    } catch (error) {
        console.error("Error in fetch: ", error);
        throw error; 
    }
};
