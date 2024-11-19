import Config from "../Config";

var serviceUrl = Config.apidomain;

export const CommonGet = (url, queryString) => {

    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        if (queryString != null) {
            request.open("GET", serviceUrl + url + "?" + queryString);
        } else {
            request.open("GET", serviceUrl + url);
        }

        request.setRequestHeader("Content-type", "application/json; charset=utf-8");
        request.setRequestHeader('Access-Control-Allow-Methods', '*');
        request.setRequestHeader('Accept-Language', 'en-US');
        request.onload = () => {

            if (request.response === 'Token Time Exceed') {
                window.logout.logout();
            }
            else {
                if (request.status >= 200 && request.status < 300) {
                    resolve(JSON.parse(request.response));
                } else {
                    reject(request.statusText);
                }
            }
        };
        request.onerror = () => {
            reject(request.statusText);
        };
        request.send();
    });
};