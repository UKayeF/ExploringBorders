import React from 'react';
import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';
import { ExploringBorders } from './Game';
import SpaceBoard from './components/SpaceBoard';
import GamepadSpaceboard from './components/GamepadSpaceboard';

const ExploringBordersClient = Client({
  game: ExploringBorders,
  board: GamepadSpaceboard,
  numPlayers: 1,
  multiplayer: false,
  // multiplayer: Local(),
});

const App = () => (
  <div>
    <ExploringBordersClient playerID='0'/>
  </div>
)

export default App;
