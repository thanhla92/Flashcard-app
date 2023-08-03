import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import HomeScreen from "./HomeScreen";
import CreateDeckScreen from "./CreateDeckScreen";
import StudyScreen from "./StudyScreen";
import DeckScreen from "./DeckScreen";
import EditDeckScreen from "./EditDeckScreen";
import AddCardScreen from "./AddCardScreen";
import EditCardScreen from "./EditCardScreen";
import NotFound from "./NotFound"; 

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/decks/new">
            <CreateDeckScreen />
          </Route>
          <Route path="/decks/:deckId/study">
            <StudyScreen />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeckScreen />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCardScreen />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCardScreen />
          </Route>
          <Route path="/decks/:deckId">
            <DeckScreen />
          </Route>
          <Route path="/" exact>
            <HomeScreen />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;