import React, { useState, useEffect } from 'react'
import {FlashCard} from "./FlashCard";
import {Link} from "react-router-dom";
import {TextEditor} from "./TextEditor";
import "./css/EditPage.css"

export const EditPage = (props) => {

    const [didLoad, setDidLoad] = useState(false)
    const [selectedCardId, setSelectedCard] = useState(null)
    const [frontContentOfSelectedCard, setFrontContentOfSelectedCard] = useState("")
    const [backContentOfSelectedCard, setBackContentOfSelectedCard] = useState("")


    useEffect(() => {

        console.log("%c anzahl Ausführungen on first load" , 'background: #DDD; color: #badaA5')

        // Only execute on first change of props.cards
        //
        // The StackPage renders first with a empty array of the state var 'cards'.
        // Then this EditPage renders. But this useEffect doesnt run because deps = props.cards.
        // Then ComponentWillMount of StackPage fetches the cards and sets the cards array.
        // Because the deps of this useEffect is set to props.cards this will execute set the state vars.
        // Checking !didLoaded prevents the the TextEditor always showing the values of the first card,
        // when the cards array changes.
        if (props.cards[0] && !didLoad) {
            setDidLoad(true)
            setSelectedCard(props.cards[0]._id)
            setFrontContentOfSelectedCard(props.cards[0].frontContent)
            setBackContentOfSelectedCard(props.cards[0].backContent)
        }
    }, [didLoad, props.cards])

    const createCard = (e) => {
        e.preventDefault()

        const card = {frontContent: "", backContent: ""}

        fetch("http://localhost:8001/api/new_card", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(card)
        }).then(async res => {
            props.updateCards()
        });
    }

    /**
     * Shows the selected card in the Editor for the user to edit
     */
    const detailCard = (cardId) => {

        setSelectedCard(cardId)

        props.cards.forEach(card => {
            if (card._id === cardId) {
                setFrontContentOfSelectedCard(card.frontContent)
                setBackContentOfSelectedCard(card.backContent)
            }
        })
    }

    const isSelected = (cardId) => { return cardId === selectedCardId ? "true" : "false" }

    return (
        <div className={'edit-page'}>

            <div className={'mini-view-bar'}>
                {props.cards.map(card => (
                    <button
                        className={"flashcard-btn"}
                        onClick={() => (detailCard(card._id))}
                    >
                        <FlashCard cards={props.cards} card={card} selected={isSelected(card._id)}/>
                    </button>
                ))}
            </div>

            <div className={'content'}>
                <div className={'header-bar'}>
                    <Link to="/" onClick={() => {}}>Save</Link>
                    <button onClick={createCard}>Create new Card</button>
                </div>
                <div className={'edit-area'}>
                    <TextEditor content={frontContentOfSelectedCard}/>
                    <TextEditor content={backContentOfSelectedCard}/>
                </div>
            </div>
        </div>
    )
}