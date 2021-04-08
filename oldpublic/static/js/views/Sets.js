import AbstractView, {fetchHtmlAsText} from "./AbstractView.js";
const htmlUrl = "/static/html/sets.html"

export default class extends AbstractView {

    constructor() {
        super();
        this.setTitle("Flash Sets");
    }

    async getHtml() {
        return fetchHtmlAsText(htmlUrl);
    }

    async getRequestFromDB() {
        let html = "";

        const response = await fetch('http://localhost:8001/api/sets');
        const myJson = await response.json(); //extract JSON from the http response

        console.log(myJson);
        console.log(myJson[0]);
        console.log("myJson.length: " + myJson.length);

        for (let i = 0; i < myJson.length; i++) {
            console.log("myJson["+i+"]:" + myJson[i]);
            html = html + "<li>" + myJson[i]['stackName'] + "</li>";
        }


        document.querySelector('.main-section').insertAdjacentHTML('beforeend', html);
    }



}

