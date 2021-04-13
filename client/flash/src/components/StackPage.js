import React, { useState, useEffect } from 'react'
import {useParams, useRouteMatch} from "react-router-dom";
import { FlashCard } from "./FlashCard";
import './css/StackPage.css'
import {ToolBar} from "./ToolBar";

export const StackPage = (props) => {
    const params = useParams()
    const match = useRouteMatch()

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState('false');

    //  Array of Cards, Card:{_id: String(ObjId), stack: String(ObjId), frontContent: String, backContent: String}
    const [cards, setCards] = useState([])

    // Css selector uses movingUp to Handle the shrinking and expanding animation Toolbar Component when scrolling
    const [movingUp, setMovingUp] = useState(0)

    function scrollFunction() {
        document.querySelector("#stack-page").scrollTop > 80 ? setMovingUp(1) : setMovingUp(0)
    }

    useEffect(() => {

        const url = 'http://localhost:8001/api/cards/' + encodeURIComponent(params.divider) + '/' + encodeURIComponent(params.stack)
        fetch(url, {
            mode: 'cors',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded('true');
                    setCards(result);
                },
                (error) => {
                    setIsLoaded('true');
                    setError(error);
                }
            )
    }, [])

    // TEST--------------------------------------------------
    useEffect(() => {
        console.log('cards')
        console.log(cards)
    }, [cards])


    console.log('match')
    console.log(match)
    console.log('params')
    console.log(params)
    // TEST--------------------------------------------------


    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (isLoaded === 'false') {
        return <div className={"loading-screen"}><p>Loading...</p></div>;
    } else {
        return (
            <div className={props.className} id={"stack-page"} onScroll={scrollFunction}>
                {/* <div>{params.divider}/{params.stack}, {match.url}</div> */}
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

}