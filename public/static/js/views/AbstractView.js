export default class {

    constructor() {
    }

    setTitle(title) {
        document.title = title;
    }

    async getRequestFromDB() {
    }

    async getHtml() {
        return "";
    }

}

/**
 * This method fetches an html using its url, and returns its content as String using .text()
 *
 * @param {String} url - address for the HTML to fetch
 * @return {String} the resulting HTML string fragment
 */
export async function fetchHtmlAsText(url) {
    return await (await fetch(url)).text();
}