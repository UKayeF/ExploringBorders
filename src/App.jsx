import React from 'react';
import { Client } from 'boardgame.io/react';
import { ExploringBorders } from './Game';
import GamepadSpaceboard from './components/GamepadSpaceboard';

const ExploringBordersClient = Client({
  game: ExploringBorders,
  board: GamepadSpaceboard,
});

const App = () => (
  <div>
    <ExploringBordersClient/>
  </div>
)

export default App;
