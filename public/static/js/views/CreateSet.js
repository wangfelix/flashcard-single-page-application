import AbstractView, {fetchHtmlAsText} from "./AbstractView.js";
const htmlUrl = "/static/html/createSet.html"

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Flash Create New Set");
    }

    async getHtml() {
        return fetchHtmlAsText(htmlUrl);
    }
}