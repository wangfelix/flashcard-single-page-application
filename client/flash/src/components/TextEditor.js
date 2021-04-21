import React, { useState, useEffect } from 'react';


export const TextEditor = (props) => {

    const [content, setContent] = useState("")

    /*
    * Every time the user selects a new card from the mini preview bar, the props.content change and the state var
    * content gets updated to the value of the selected card
    */
    useEffect(() => {
        setContent(props.content)
    }, [props.content])

    /*
    * This func is called everytime the user types in the textarea,
    * so that the shown content will update to the users input.
    *
    * Without this function the string in the textarea would be static and wouldn't change according to the user input
    */
    const updateValue = (e) => {
        setContent(e.target.value)
    }

    return (
        <div className={'text-editor-div'}>

            <TextBoxToolbar />
            <textarea
                className={'text-editor'}
                value={content}
                onChange={(e) => (updateValue(e))}
            />
        </div>
    )
}


const TextBoxToolbar = (props) => {
    return (
        <div className={'text-box-toolbar'}>
            Toolbar Placeholder
        </div>
    )
}