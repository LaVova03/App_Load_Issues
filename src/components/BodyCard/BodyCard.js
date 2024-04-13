import React, { useEffect, useState } from "react";
import './BodyCard.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

const tokenGit = process.env.REACT_APP_GITHUB_TOKEN;

const BodyCard = () => {
    const [cardList, setCardList] = useState([
        { id: "1", cards: [{ id: "card1", text: "Card 1" }, { id: "card2", text: "Card 2" }] },
        { id: "2", cards: [] },
        { id: "3", cards: [{ id: "card3", text: "Card 3" }] },
    ]);

    const [currentCard, setCurrentCard] = useState(null);

    const isUrl = useSelector(state => state.myReducer.isUrl);

    useEffect(() => {
        if (isUrl) {
            addTodo(isUrl)
        }
    }, [isUrl])

    const dragStartHandler = (e, cardId) => {
        setCurrentCard(cardId);
    };

    const dragEndHandler = (e) => {
        e.target.style.background = 'white';
    };

    const dragOverHandler = (e) => {
        e.preventDefault();
        e.target.style.background = 'lightgray';
    };

    const dragLeaveHandler = (e) => {
        e.target.style.background = 'white';
    };

    const dropHandler = (e, cellId) => {
        e.preventDefault();
        const newCardList = [...cardList];
        const draggedCard = newCardList.find(cell => cell.cards.some(card => card.id === currentCard));
        const droppedCell = newCardList.find(cell => cell.id === cellId);
        const draggedIndex = draggedCard.cards.findIndex(card => card.id === currentCard);
        const droppedIndex = droppedCell.cards.length;
        const [draggedCardItem] = draggedCard.cards.splice(draggedIndex, 1);
        droppedCell.cards.splice(droppedIndex, 0, draggedCardItem);
        setCardList(newCardList);
        e.target.style.background = 'white';
    };

    const addTodo = async () => {
        try {
            const response = await axios.get(`${isUrl}`, {
                headers: {
                    Authorization: `Bearer ${tokenGit}`
                }
            });
            if (response) {
                console.log(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className='body_card_wrap'>
            {cardList.map((cell, cellIndex) => (
                <div key={cell.id} className='cell'>
                    <h3>{cell.id === '1' ? 'ToDo' : cell.id === '2' ? 'In Progress' : 'Done'}</h3>
                    <div
                        className='body_wrap empty-card'
                        onDragOver={(e) => dragOverHandler(e)}
                        onDragLeave={(e) => dragLeaveHandler(e)}
                        onDrop={(e) => dropHandler(e, cell.id)}>
                        {cell.cards.map((card, cardIndex) => (
                            <div
                                key={card.id}
                                draggable
                                onDragStart={(e) => dragStartHandler(e, card.id)}
                                onDragEnd={(e) => dragEndHandler(e)}
                                onDragOver={(e) => dragOverHandler(e)}
                                onDrop={(e) => dropHandler(e, cell.id)}
                                className='body_card'>
                                {card.text}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BodyCard;
