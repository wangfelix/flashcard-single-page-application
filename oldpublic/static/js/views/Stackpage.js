import AbstractView, {fetchHtmlAsText} from "./AbstractView.js";
const htmlUrl = "/static/html/stackPage.html";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("");
    }

    async getHtml() {
        return fetchHtmlAsText(htmlUrl);
    }

    setTitle(title) {
        super.setTitle(title);
    }

    async getRequestFromDB() {
    }
}