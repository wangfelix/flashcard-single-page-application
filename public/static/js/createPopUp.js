import {updateNavBar} from './index.js';

window.openPopUp = async function openPopUp() {
    const popup = document.querySelector('.popup');
    const popupBlocker = document.querySelector('.popup-blocker');

    popup.style.display = "block";
    popupBlocker.style.display = "block";
    document.querySelector('body').style.overflow = 'hidden';

    let insertion = ''

    //fetch the list of dividers for the radio input list on the "add new stack" page
    const responseDividers = await fetch('http://localhost:8001/api/dividers');
    const myJsonDividers = await responseDividers.json(); //extract JSON from the http response
    const alreadyIncludedRadioInputs = document.querySelectorAll('.divider-radio-input-label')

    let arrayAlreadyIncludedRadioInputs = []
    alreadyIncludedRadioInputs.forEach(el => {
        arrayAlreadyIncludedRadioInputs.push(el.innerHTML)
    })


    myJsonDividers.forEach(divider => {

        if(!arrayAlreadyIncludedRadioInputs.includes(divider['sectionContainerName'])) {
            insertion = insertion + '<input type="radio" id="' + divider['_id'] +'" name="divider" value="' + divider['_id'] + '">' +
                '<label class="divider-radio-input-label" for="' + divider['sectionContainerName'] + '">' + divider['sectionContainerName'] + '</label><br>'
        }
    })
    document.querySelector('.list-of-dividers').insertAdjacentHTML('beforeend', insertion)
}

window.closePopUp = function closePopUp() {
    const popup = document.querySelector('.popup');
    const popupBlocker = document.querySelector('.popup-blocker');
    popup.style.display = "none";
    popupBlocker.style.display = "none";
    document.querySelector('body').style.overflow = 'auto';
    slideToLeftOption()
}

window.slideToRightOption = function slideToRightOption() {
    let display = document.querySelector('.selectorDisplay');

    if (!display.classList.contains('moved-display')) {
        display.classList.add('moved-display');

        document.querySelector('.popup-title').innerHTML = 'Create new Stack'
        document.querySelector('#plus-button-dropdown').style.animation = 'extendHeight 0.3s ease forwards'

        document.querySelector('#select-divider-title').style.display = 'block'
        document.querySelector('.list-of-dividers').style.display = 'block'
    }
}

window.slideToLeftOption = function slideToLeftOption() {
    let display = document.querySelector('.selectorDisplay');

    if(display.classList.contains('moved-display')) {
        display.classList.remove('moved-display');

        document.querySelector('#select-divider-title').style.display = 'none'
        document.querySelector('.list-of-dividers').style.display = 'none'
        document.querySelector('.popup-title').innerHTML = 'Create new Divider'
        document.querySelector('#plus-button-dropdown').style.animation = 'reduceHeight 0.3s ease forwards'
    }
}

window.createNewDivider = function createNewDivider() {
    try {
        const elementName =  document.querySelector(".create-text-field").value
        if (document.querySelector(".popup-title").innerHTML === 'Create new Divider') {

            const inputField = document.querySelector(".create-text-field")
            console.log("Eingabe: " + elementName)


            //Form Validation
            if (elementName === "") {
                inputField.classList.add('failed')
                document.querySelector(".create-form").reset()
                inputField.style.color='#CC3333';
                inputField.value = 'empty field'

                console.log("empty field")
            }


            var divider = {
                "sectionContainerName": elementName,
                "stacks": []
            };

            console.log("JSON.stringify(divider): " + JSON.stringify(divider))

            fetch("/api/newdivider", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(divider)
            }).then(async res => {
                console.log("Request complete! response:", JSON.stringify(res.body));
                await updateNavBar();


            });
        } else {
            //Create new Stack

            //get the dividers Object Id
            const objIdOfSelectedDivider = document.querySelector('input[name="divider"]:checked').value

            var stack = {
                "stackName": elementName,
                "divider": objIdOfSelectedDivider,
                cards: []
            };

            fetch("/api/new_stack", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(stack)
            }).then(response => response.json())
                .then(async response => {
                    console.log(response.dividerName);
                    await updateNavBar(elementName, objIdOfSelectedDivider, response.dividerName);
                })
        }








    } catch (e) {
        console.log(e.message)
    }
    return false;
}

