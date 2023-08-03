import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, readCard, updateCard, createCard } from "../utils/api";

function FormComponent({ isEdit, title, deckName }) {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState({ front: "", back: "" });

  useEffect(() => {
    loadDeckAndCard();
  }, [deckId, cardId]);

  const loadDeckAndCard = async () => {
    try {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
      if (isEdit) {
        const loadedCard = await readCard(cardId);
        setCard(loadedCard);
      }
    } catch (error) {
      // Handle error
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCard((prevCard) => ({
      ...prevCard,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isEdit) {
        await updateCard(card);
      } else {
        await createCard(deckId, card);
      }
      handleCancel();
    } catch (error) {
      // Handle error
    }
  };

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
        <h2>
            <span>{deckName}</span>
            <span> - </span>
            <span>{title}</span>
        </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            id="front"
            name="front"
            className="form-control"
            value={card.front}
            onChange={handleChange}
            rows="3"
          />
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            id="back"
            name="back"
            className="form-control"
            value={card.back}
            onChange={handleChange}
            rows="3"
          />
        </div>
        <button type="submit" className="btn btn-primary mr-2">
          Save
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default FormComponent;