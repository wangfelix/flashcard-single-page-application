import AbstractView, {fetchHtmlAsText} from "./AbstractView.js";
const htmlUrl = "/static/html/homepage.html";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Flash");
    }

    async getHtml() {
        return fetchHtmlAsText(htmlUrl);
    }

    async getRequestFromDB() {
    }
}