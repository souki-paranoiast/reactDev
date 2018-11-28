
/**
 * Web API utility
 */
class Api {

    /**
     * 
     * @param {string} api 
     * @param {object} sendObj 
     * @param {Function} resF 
     * @param {Function} successF 
     * @param {Function} failF 
     */
    static get(api, sendObj, resF, successF, failF) {
        const param = Object.keys(sendObj)
            .map(key => key + "=" + encodeURIComponent(sendObj[key]))
            .join("&");
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        };
        const url = api + "?" + param;
        return fetch(url, { method: "GET", headers })
            .then(resF)
            .then(successF)
            .catch(failF);
    }

    static post(api, body, resF, successF, failF) {
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        };
        return fetch(api, { method: "POST", headers, body })
            .then(resF)
            .then(successF)
            .catch(failF);
    }

    static put(api, body, resF, successF, failF) {
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        };
        return fetch(api, { method: "PUT", headers, body })
            .then(resF)
            .then(successF)
            .catch(failF);
    }
}

export default Api;