import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";

function HomeScreen() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    loadDecks();
  }, []);

  const loadDecks = async () => {
    try {
      const decksData = await listDecks();
      setDecks(decksData);
    } catch (error) {
      // Handle error
    }
  };

  const handleDelete = async (deckId) => {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      try {
        await deleteDeck(deckId);
        loadDecks();
      } catch (error) {
        // Handle error
      }
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <Link to="/decks/new" className="btn btn-primary">
        Create Deck
      </Link>
      <div>
        {decks.map((deck) => (
          <div key={deck.id} className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">{deck.name}</h5>
              <p className="card-text">{deck.description}</p>
              <p>{deck.cards.length} cards</p>
              <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-2">
                View
              </Link>
              <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mr-2">
                Study
              </Link>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(deck.id)}
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

export default HomeScreen;