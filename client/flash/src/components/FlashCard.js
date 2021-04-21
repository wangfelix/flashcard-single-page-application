import React, { useEffect } from 'react'
import './css/FlashCard.css'

export const FlashCard = (props) => {

//  Example Card:{_id: String(ObjId), stack: String(ObjId), frontContent: String, backContent: String}

    useEffect(() => {
        console.log("%c isSelected: " + props.selected, 'background: #222; color: #bada55')
        console.log("Heyyyyyy: " + typeof props.selected)
    }, [props.cards])

    return (
        <div className={"flashcard"} is-selected={props.selected}>
            <p>{props.card.frontContent}</p>
        </div>
    )
}