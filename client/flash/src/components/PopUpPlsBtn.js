import React, {useState, useEffect} from 'react'
import './css/PopUpPlsBtn.css'


export const PopUpPlsBtn  = (props) => {

    const [textFieldValue, setTextFieldValue] = useState("")
    const [selectorPosition, setSelectorPosition] = useState('left')
    const [objIdOfSelectedDivider, setObjIdOfSelectedDivider] = useState('')
    const [popUpTitle, setPopUpTitle] = useState('Create new Divider')


    useEffect(() => {
        selectorPosition==='left'? setPopUpTitle("Create new Divider") : setPopUpTitle("Create new Stack")
    }, [selectorPosition])

    // TEST _____________________________________________________________________
    useEffect(() => {
        console.log("objIdOfSelectedDivider: " + objIdOfSelectedDivider)
    }, [objIdOfSelectedDivider])
    // TEST _____________________________________________________________________

    let openPopUp = async function openPopUp() {
        props.setPopUpPlsBtnState('opened')
    }

    let closePopUp = function closePopUp() {
        props.setPopUpPlsBtnState('closed')
        setSelectorPosition('left')
    }

    let createNewDivider = function createNewDivider(e) {
        e.preventDefault()
        try {
            if (popUpTitle === 'Create new Divider') {

                //Form Validation
                if (textFieldValue === "") {
                    setTextFieldValue('empty field')
                    return;
                }

                let divider = {
                    "sectionContainerName": textFieldValue,
                    "stacks": []
                };

                fetch("http://localhost:8001/api/newdivider", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(divider)
                }).then(async res => {
                    props.updateDividers()
                });

            } else {

                //TODO Create new Stack
                //get the divider's Object Id
/*                const objIdOfSelectedDivider = document.querySelector('input[name="divider"]:checked').value*/

                let stack = {
                    "stackName": textFieldValue,
                    "divider": objIdOfSelectedDivider,
                    cards: []
                };

                fetch("http://localhost:8001/api/new_stack", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(stack)
                })
                    .then(response => response.json())
                    .then(async response => {
                        console.log(response.dividerName);
                        /* await updateNavBar(elementName, objIdOfSelectedDivider, response.dividerName);*/
                        props.updateDividers()
                    })
            }
        } catch (e) {
            console.log("error" + e.message)
        }
    }

    return (
        <div className="plus-btn-div">

            <button className="plusBtn" onClick={openPopUp}>
                <svg width="421" height="421" viewBox="0 0 421 421" fill="none" xmlns="http://www.w3.org/2000/svg">
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

                <div
                    id={"plus-button-dropdown"}
                    selector-position={selectorPosition}
                >

                    <div>
                        <div className="selector-div">
                            <p onClick={() => setSelectorPosition('left')}>New Divider</p>
                            <div className="vertical-divider"/>
                            <p onClick={() => setSelectorPosition('right')} className="create-new-stack">New Stack</p>
                        </div>
                        <div className="selectorDisplay" position={selectorPosition}/>
                    </div>

                    <form className="create-form" onSubmit={(e) => {createNewDivider(e)}}>

                        <div>
                            <p className="popup-title">{popUpTitle}</p>
                            <input
                                className="create-text-field"
                                type="text"
                                placeholder="new divider name"
                                value={textFieldValue}
                                onChange={(e) => setTextFieldValue(e.target.value)}
                            />

                            <div className="form-validation-messages">
                                <p>Name existiert bereits!</p>
                            </div>

                            <div>
                                <p className="popup-title"
                                   id="select-divider-title"
                                   selector-position={selectorPosition}
                                >
                                    Select Divider
                                </p>

                                <div
                                    className="list-of-dividers"
                                    selector-position={selectorPosition}
                                >
                                    {props.dividers.map(divider => (
                                        <div>
                                            <input
                                                type="radio" key={divider._id}
                                                name="divider"
                                                value={divider._id}
                                                onClick={() => setObjIdOfSelectedDivider(divider.sectionContainerName)}
                                            />
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