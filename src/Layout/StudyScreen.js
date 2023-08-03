import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { readDeck } from '../utils/api';

function StudyScreen() {
  const [deck, setDeck] = useState({ cards: [] });
  const [cardNumber, setCardNumber] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const getDeck = async () => {
      const deckFromAPI = await readDeck(deckId);
      setDeck(deckFromAPI);
    };
    getDeck();
  }, [deckId]);

  if (deck.cards.length < 3) {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Study</li>
          </ol>
        </nav>
        <h2>{`Study: ${deck.name}`}</h2>
        <h3>Not enough cards.</h3>
        <p>{`You need at least 3 cards to study. There are ${deck.cards.length} cards in this deck.`}</p>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
          Add Cards
        </Link>
      </div>
    );
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (cardNumber < deck.cards.length - 1) {
      setCardNumber(cardNumber + 1);
    } else if (window.confirm('Restart cards?\n\nClick "Cancel" to return to the home page.')) {
      setCardNumber(0);
    } else {
      history.push('/');
    }
    setIsFlipped(false);
  };

  const { front, back } = deck.cards[cardNumber];

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Study</li>
        </ol>
      </nav>
      <h2>{`Study: ${deck.name}`}</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{`Card ${cardNumber + 1} of ${deck.cards.length}`}</h5>
          <p className="card-text">{isFlipped ? back : front}</p>
          <button className="btn btn-secondary" onClick={handleFlip}>Flip</button>
          {isFlipped && <button className="btn btn-primary" onClick={handleNext}>Next</button>}
        </div>
      </div>
    </div>
  );
}

export default StudyScreen;
