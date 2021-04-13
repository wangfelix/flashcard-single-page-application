import React, { useState, useEffect } from 'react'
import {useParams, useRouteMatch} from "react-router-dom";
import { FlashCard } from "./FlashCard";
import './css/StackPage.css'
import {ToolBar} from "./ToolBar";

export const StackPage = (props) => {
    const params = useParams()
    const match = useRouteMatch()

    const [cards, setCards] = useState([{front: "Was ist 2+2", back: "4"},{front: "Was ist 3+3", back: "6"}])
    const [movingUp, setMovingUp] = useState(0)

    function scrollFunction() {
        document.querySelector("#stack-page").scrollTop > 80 ? setMovingUp(1) : setMovingUp(0)
    }

    useEffect(() => {
        // fetch cards and set state of cards
    }, [])

    console.log(match)
    return (
        <div className={props.className} id={"stack-page"} onScroll={scrollFunction}>
{/*            <div>{params.divider}/{params.stack}, {match.url}</div>*/}
            <ToolBar
                title={params.stack}
                movingUp={movingUp}
                dividers={props.dividers}
                updateDividers={props.updateDividers}
            />

            <div className={"card-container"}>
                {cards.map(card => (
                    <FlashCard card={card}/>
                ))}
            </div>

        </div>

    )
}