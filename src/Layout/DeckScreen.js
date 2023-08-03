import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, deleteDeck } from "../utils/api";

function DeckScreen() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    loadDeck();
  }, []);

  const loadDeck = async () => {
    try {
      const deckData = await readDeck(deckId);
      setDeck(deckData);
    } catch (error) {
      // Handle error
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      try {
        await deleteDeck(deckId);
        history.push("/");
      } catch (error) {
        // Handle error
      }
    }
  };

  if (!deck) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mb-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {deck.name}
            </li>
          </ol>
        </nav>
      </div>
      <div className="mb-3">
        <h4>{deck.name}</h4>
        <p>{deck.description}</p>
      </div>
      <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary mr-2">
        Edit
      </Link>
      <Link to={`/decks/${deckId}/study`} className="btn btn-primary mr-2">
        Study
      </Link>
      <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary mr-2">
        Add Cards
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
      <h3 className="mt-4">Cards</h3>
      <div>
        {deck.cards.map((card) => (
          <div key={card.id} className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">
                <span>Question: </span>
                <span>{card.front}</span>
              </h5>
              <p className="card-text">
                <span>Answer: </span>
                <span>{card.back}</span>
              </p>
              <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-secondary mr-2">
                Edit
              </Link>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(card.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeckScreen;