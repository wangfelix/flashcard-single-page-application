import AbstractView, {fetchHtmlAsText} from "./AbstractView.js";
const htmlUrl = "/static/html/explore.html"

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Flash Explore");
    }

    async getHtml() {
        return fetchHtmlAsText(htmlUrl);
    }
}