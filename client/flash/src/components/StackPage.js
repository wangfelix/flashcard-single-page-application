import React, { useState, useEffect } from 'react'
import {Link, useLocation, useParams, useRouteMatch} from "react-router-dom";
import { FlashCard } from "./FlashCard";
import './css/StackPage.css'
import {ToolBar} from "./ToolBar";
import {EditPage} from "./EditPage";

export const StackPage = (props) => {
    const params = useParams()
    const match = useRouteMatch()
    const location = useLocation()

    // If query param edit exists and is 'true', the component will return the "edit page" of the stack
    const edit = new URLSearchParams(location.search).get("edit")

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState('false');

    //  Array of Cards, Card:{_id: String(ObjId), stack: String(ObjId), frontContent: String, backContent: String}
    const [cards, setCards] = useState([])

    // Stores the Object Id of the currently displayed stack
    const [stackObjId, setStackObjId] = useState(0)

    // Css selector uses movingUp to Handle the shrinking and expanding animation Toolbar Component when scrolling
    const [movingUp, setMovingUp] = useState(0)

    function scrollFunction() {
        document.querySelector("#stack-page").scrollTop > 80 ? setMovingUp(1) : setMovingUp(0)
    }

    const updateCards = () => {
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
    }

    /*every time the user changes to a different stackPage, the params changes and the cards of that exact stack get loaded in*/
    useEffect(() => {updateCards()}, [params.stack])

    // TEST--------------------------------------------------
    useEffect(() => {
        console.log('cards updated')
        console.log(cards)
    }, [cards])


    console.log('match')
    console.log(match)
    console.log('params')
    console.log(params)
    console.log('location')
    console.log(location)
    // TEST--------------------------------------------------


    if (error) {
        return <div className={'content'}><div>Error: {error.message}</div></div>;
    } else if (isLoaded === 'false') {
        return <div className={'content'}><div className={"loading-screen"}><p>Loading...</p></div></div>;
    } else {

        if (edit === 'true') {
            return (
                <EditPage
                    cards={cards}
                    updateCards={updateCards}
                />
            )
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

                    <div className={'content'}>
                        <div className={"card-container"}>
                            {cards.map(card => (
                                <FlashCard card={card}/>
                            ))}
                        </div>

                        <Link to={'/'}><div>Edit</div></Link>
                    </div>

                </div>
            )
        }
    }

}