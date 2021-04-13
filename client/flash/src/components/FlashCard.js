import React from 'react'
import './css/FlashCard.css'

export const FlashCard = (props) => {

//  Example Card:{_id: String(ObjId), stack: String(ObjId), frontContent: String, backContent: String}

    return (
        <div className={"flashcard"}>
            <p>{props.card.frontContent}</p>
        </div>
    )
}