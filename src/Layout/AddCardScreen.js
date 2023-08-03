import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormComponent from "./FormComponent";
import { readDeck } from "../utils/api";

function AddCardScreen() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);

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

  return <FormComponent isEdit={false} title="Add Card" deckName={deck?.name} />;
}

export default AddCardScreen;
