import React from 'react'
import './css/FlashCard.css'

export const FlashCard = (props) => {

    return (
        <div className={"flashcard"}>
            <p>{props.card.front}</p>
        </div>
    )
}