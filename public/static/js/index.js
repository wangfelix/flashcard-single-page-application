import Homepage from "./views/Homepage.js";
import Sets from "./views/Sets.js";
import CreateSet from "./views/CreateSet.js";
import Explore from "./views/Explore.js";
import StackPage from "./views/Stackpage.js";

const navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
}

const pathToRegex = path => {return new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$")};

const router = async () => {

    console.log("regex:" + pathToRegex("posts/:id"))

    const routes = [
        {path: "/", view: Homepage},
        {path: "/sets", view: Sets},
        {path: "/explore", view: Explore},
        {path: "/createset", view: CreateSet},
        {path: "/stacks", view: StackPage}
    ];


    console.log("location pathname: " + location.pathname)
    let trimmedPathName = location.pathname;
    let dividerName;
    let stackName;

    if (location.pathname.startsWith('/stacks/'))  {
        let inputUrl = location.pathname;
        let slicedInput = inputUrl.slice(8);

        console.log("sliced uri:" + slicedInput);

        const inputStackName = decodeURI(slicedInput);

        console.log("decoded Uri: " + inputStackName);

        // In inputStackName, a period separates the name of the divider,
        // and the name of the stack, that is included in the divider

        // Separate divider-name and stack-name
        if (inputStackName.split(":").length !== 2) {
            trimmedPathName = '/';
        } else {
            dividerName = inputStackName.split(":")[0];
            stackName = inputStackName.split(":")[1];
            trimmedPathName = '/stacks';
        }
    }


    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: trimmedPathName === route.path
        }
    });

    // Save the matching route in the variable match
    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    /* If there is no match, the let match will be undefined. If that is the case, we want to render the homepage
        which is in routes[0].
     */
    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        };
    }

    const view = new match.route.view();
    document.querySelector('#app').innerHTML = await view.getHtml();
    if (trimmedPathName === '/stacks') {
        document.getElementById('titleText').innerHTML = stackName;
        view.setTitle(stackName);
    }
    await updateNavBar();

};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault()
            navigateTo(e.target.href)
        }
    })
    router();
})


export async function updateNavBar(newStackName = undefined, idOfUpdatedDivider = undefined, nameOfUpdatedDivider = undefined) {
    let navBarHtml = "";

    const responseStacks = await fetch('http://localhost:8001/api/sets');
    const myJsonStacks = await responseStacks.json(); //extract JSON from the http response

    const responseDividers = await fetch('http://localhost:8001/api/dividers');
    const myJsonDividers = await responseDividers.json(); //extract JSON from the http response

    let currentlyIncludedSets = document.querySelectorAll(".setNavLink");
    let currentlyIncludedDividers = document.querySelectorAll(".dividerText");
    let setIsIncluded = false;
    let dividerIsIncluded = false;


    // Check, if its enough to just update a specific Divider
    if (arguments.length === 3) {
        let dividerElements = document.querySelector('[data-divider-id="'+ idOfUpdatedDivider +'"]')

        dividerElements.insertAdjacentHTML('beforeend',
            '<div class="nav-ui-li-border-div"><li class="li"><a class="setNavLink" href="/stacks/'
            + nameOfUpdatedDivider + ':' + newStackName + '" data-link>' + newStackName
            + '</a></li></div>'
        )
        return;
    }



    //initialize Dividers so that they will be displayed first
    myJsonDividers.forEach(divider => {
        currentlyIncludedDividers.forEach(includedDivider => {
            if (divider['sectionContainerName'] === includedDivider.innerHTML) {
                dividerIsIncluded = true;
            }
        })

        if (!dividerIsIncluded) {
            let stacksHtml = '';

            let arrayOfStacks = divider['stacks']
            arrayOfStacks.forEach(stack => {

                stacksHtml = stacksHtml
                    + '<div class="nav-ui-li-border-div"><li class="li"><a class="setNavLink" href="/stacks/'
                    + divider['sectionContainerName'] + ':' + stack['stackName'] + '" data-link>' + stack['stackName']
                    + '</a></li></div>';

            })

            document.querySelector('.allSectionsContainer')
                .insertAdjacentHTML('beforeend',
                '<div class="singleSectionContainer" id="' + divider['_id'] + '">' +
                            '<div class="dividerWithText">' +
                                '<p class="dividerText">' + divider['sectionContainerName'] + '</p>' +
                            '</div>' +
                            '<div class="navSetsContainer" data-divider-id="'+ divider['_id'] + '">'+ stacksHtml +'</div>' +
                '</div>');

        }
        dividerIsIncluded = false;
    })

    /*for (let i = 0; i < myJsonStacks.length; i++) {

        for(let j = 0; j < currentlyIncludedSets.length; j++){
            if (myJsonStacks[i]['stackName'] === currentlyIncludedSets[j].innerHTML) {
                setIsIncluded = true;
                break;
            }
        }

        if (!setIsIncluded) {
            console.log("myJson["+i+"]:" + myJsonStacks[i]);
            navBarHtml = navBarHtml
                + '<div class="nav-ui-li-border-div"><li class="li"><a class="setNavLink" href="/'
                + myJsonStacks[i]['stackName'].toLowerCase() + '" data-link>' + myJsonStacks[i]['stackName']
                + '</a></li></div>';
        }

        setIsIncluded = false;
    }*/
    document.querySelector('.navSetsContainer').insertAdjacentHTML('beforebegin', navBarHtml);

    let navbar = document.querySelectorAll(".singleSectionContainer");
    navbar.forEach(section => {
        section.style.animation = 'moveInNavBarItems 1.5s ease forwards';
    });
}