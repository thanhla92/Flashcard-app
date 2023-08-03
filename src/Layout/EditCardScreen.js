import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormComponent from "./FormComponent";
import { readDeck, readCard } from "../utils/api";

function EditCardScreen() {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState({ front: "", back: "" });

  useEffect(() => {
    loadDeckAndCard();
  }, [deckId, cardId]);

  const loadDeckAndCard = async () => {
    try {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
      const loadedCard = await readCard(cardId);
      setCard(loadedCard);
    } catch (error) {
      // Handle error
    }
  };

  return <FormComponent isEdit={true} title={`Edit: ${card.front}`} deckName={deck?.name} />;
}

export default EditCardScreen;

