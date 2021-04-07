import './css/ToolBar.css'
import React from 'react'

export const ToolBar = (props) => {


    console.log("passed value " + props.movingUp)



    let openPopUp = async function openPopUp() {
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

    let closePopUp = function closePopUp() {
        const popup = document.querySelector('.popup');
        const popupBlocker = document.querySelector('.popup-blocker');
        popup.style.display = "none";
        popupBlocker.style.display = "none";
        document.querySelector('body').style.overflow = 'auto';
        slideToLeftOption()
    }

    let slideToLeftOption = function slideToLeftOption() {
        let display = document.querySelector('.selectorDisplay');

        if(display.classList.contains('moved-display')) {
            display.classList.remove('moved-display');

            document.querySelector('#select-divider-title').style.display = 'none'
            document.querySelector('.list-of-dividers').style.display = 'none'
            document.querySelector('.popup-title').innerHTML = 'Create new Divider'
            document.querySelector('#plus-button-dropdown').style.animation = 'reduceHeight 0.3s ease forwards'
        }
    }

    let slideToRightOption = function slideToRightOption() {
        let display = document.querySelector('.selectorDisplay');

        if (!display.classList.contains('moved-display')) {
            display.classList.add('moved-display');

            document.querySelector('.popup-title').innerHTML = 'Create new Stack'
            document.querySelector('#plus-button-dropdown').style.animation = 'extendHeight 0.3s ease forwards'

            document.querySelector('#select-divider-title').style.display = 'block'
            document.querySelector('.list-of-dividers').style.display = 'block'
        }
    }

    let createNewDivider = function createNewDivider() {
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


                let divider = {
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
/*                    await updateNavBar();*/
                });
            } else {
                //Create new Stack

                //get the dividers Object Id
                const objIdOfSelectedDivider = document.querySelector('input[name="divider"]:checked').value

                let stack = {
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
/*                        await updateNavBar(elementName, objIdOfSelectedDivider, response.dividerName);*/
                    })
            }


        } catch (e) {
            console.log(e.message)
        }
        return false;
    }


    return (
        <div className="header" id="header" movingup={props.movingUp}>

            <div className="toolbar">

                <div className="popup-blocker" onClick={closePopUp}/>

                <div className="plus-btn-div">
                    <button className="plusBtn" onClick={openPopUp}>
                        <svg width="421" height="421" viewBox="0 0 421 421" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M151 392C151 408.016 163.984 421 180 421H241C257.016 421 270 408.016 270 392V270H392C408.016 270 421 257.016 421 241V180C421 163.984 408.016 151 392 151H270V29C270 12.9837 257.016 0 241 0H180C163.984 0 151 12.9837 151 29V151H29C12.9837 151 0 163.984 0 180V241C0 257.016 12.9837 270 29 270H151V392Z"
                                  fill="url(#paint0_linear)"/>
                            <defs>
                                <linearGradient id="paint0_linear" x1="421" y1="0" x2="0" y2="421"
                                                gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#BBC2D1"/>
                                    <stop offset="1" stop-color="#595C61"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </button>

                    <div className={"popup"}>
                        <div id={"plus-button-dropdown"}>

                            <div>
                                <div className="selector-div">
                                    <p onClick={slideToLeftOption}>New Divider</p>
                                    <div className="vertical-divider"/>
                                    <p onClick={slideToRightOption} className="create-new-stack">New Stack</p>
                                </div>
                                <div className="selectorDisplay"/>
                            </div>


                            <form className="create-form" onSubmit={() => {return createNewDivider()}}>


                                <div>
                                    <p className="popup-title">Create new Divider</p>
                                    <input className="create-text-field" type="text" placeholder="new divider name" />
                                    <div className="form-validation-messages">
                                        <p>Name existiert bereits!</p>
                                    </div>


                                    <div>
                                        <p className="popup-title" id="select-divider-title">Select Divider</p>
                                        <div className="list-of-dividers">
                                        </div>
                                    </div>
                                </div>


                                <input className="submit-btn" type="submit" value="Save" />
                            </form>


                        </div>
                    </div>
                </div>

                <button className="progressBtn">
                    <svg width="426" height="353" viewBox="0 0 426 353" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M0 29C0 12.9837 12.9837 0 29 0H184C200.016 0 213 12.9837 213 29V73C213 89.0163 200.016 102 184 102H29C12.9837 102 0 89.0163 0 73V29ZM0 155C0 138.984 12.9837 126 29 126H397C413.016 126 426 138.984 426 155V198C426 214.016 413.016 227 397 227H29C12.9837 227 0 214.016 0 198V155ZM29 251C12.9837 251 0 263.984 0 280V324C0 340.016 12.9837 353 29 353H312C328.016 353 341 340.016 341 324V280C341 263.984 328.016 251 312 251H29Z"
                              fill="url(#paint0_linear)"/>
                        <defs>
                            <linearGradient id="paint0_linear" x1="0" y1="0" x2="426" y2="353"
                                            gradientUnits="userSpaceOnUse">
                                <stop stop-color="#595C61"/>
                                <stop offset="1" stop-color="#A4A6A9"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </button>

                <button className="settingsBtn"
                        onClick="
                        document.getElementById('id01').style.display='block';
                        document.querySelector('.dimBackgroundForModals').style.display='block';
                        document.querySelector('.dimBackgroundForModals').style.animation='blurBackground 0.4s ease forwards';
                        document.querySelector('.settings-modal').style.animation='settings-modal-slide-in 0.2s ease forwards'
                    "
                >
                    <svg width="468" height="468" viewBox="0 0 468 468" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M276 46.6077V24C276 10.7452 265.255 0 252 0H216C202.745 0 192 10.7452 192 24V46.6077C172.771 50.8987 154.629 58.0739 138.053 67.6557L119.368 48.9706C109.995 39.598 94.7991 39.598 85.4265 48.9706L59.9706 74.4264C50.5981 83.799 50.5981 98.995 59.9706 108.368L76.1987 124.596C62.2882 144.622 52.0921 167.422 46.6077 192H24C10.7452 192 0 202.745 0 216V252C0 265.255 10.7452 276 24 276H46.6077C51.5298 298.058 60.2469 318.684 72.038 337.158L59.9706 349.225C50.598 358.598 50.598 373.794 59.9706 383.167L85.4264 408.622C94.799 417.995 109.995 417.995 119.368 408.622L131.567 396.423C149.855 407.98 170.231 416.535 192 421.392V444C192 457.255 202.745 468 216 468H252C265.255 468 276 457.255 276 444V421.392C300.336 415.962 322.93 405.912 342.813 392.21L359.225 408.622C368.598 417.995 383.794 417.995 393.166 408.622L418.622 383.167C427.995 373.794 427.995 358.598 418.622 349.225L399.977 330.58C409.743 313.833 417.047 295.474 421.392 276H444C457.255 276 468 265.255 468 252V216C468 202.745 457.255 192 444 192H421.392C416.48 169.988 407.789 149.401 396.034 130.956L408.622 118.368C417.995 108.995 417.995 93.799 408.622 84.4264L383.167 58.9706C373.794 49.598 358.598 49.598 349.225 58.9706L336.547 71.6494C318.229 60.0553 297.815 51.4756 276 46.6077ZM303 234C303 272.108 272.108 303 234 303C195.892 303 165 272.108 165 234C165 195.892 195.892 165 234 165C272.108 165 303 195.892 303 234Z"
                              fill="url(#paint0_linear)"/>
                        <defs>
                            <linearGradient id="paint0_linear" x1="397.669" y1="70.9888" x2="95.9663" y2="411.472"
                                            gradientUnits="userSpaceOnUse">
                                <stop stop-color="#89909C"/>
                                <stop offset="1" stop-color="#595C61"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </button>

            </div>
            <p className="title-text" id="titleText" movingup={props.movingUp}>Dashboard</p>
            <div className="header-divider"/>

        </div>
    )
}