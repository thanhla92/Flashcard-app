import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";

function AddCardScreen() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState({ front: "", back: "" });

  useEffect(() => {
    loadDeck();
  }, [deckId]);

  const loadDeck = async () => {
    try {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
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
      await createCard(deckId, card);
      setCard({ front: "", back: "" });
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <h2>{deck && deck.name}</h2>
      <h3>Add Card</h3>
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
        <Link to={`/decks/${deckId}`} className="btn btn-secondary">
          Done
        </Link>
      </form>
    </div>
  );
}

export default AddCardScreen;