import React from 'react'
import './css/PopUpPlsBtn.css'

export const PopUpPlsBtn  = (props) => {

    let openPopUp = async function openPopUp() {
        props.setPopUpPlsBtnState('opened')
    }

    let closePopUp = function closePopUp() {
        props.setPopUpPlsBtnState('closed')
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

            <div className="popup-blocker"
                 onClick={closePopUp}
                 pop-up-state={props.popUpPlsBtnState}
            />

            <div className={"popup"} pop-up-state={props.popUpPlsBtnState}>
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
                                    {props.dividers.map(divider => (
                                        <div>
                                            <input type="radio" key={divider._id} name="divider" value="divider['_id']" />
                                            <label className={"divider-radio-input-label"} htmlFor={divider.sectionContainerName}>
                                                {divider.sectionContainerName}
                                            </label>
                                            <br/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>


                        <input className="submit-btn" type="submit" value="Save" />
                    </form>


                </div>
            </div>
        </div>
    )
}