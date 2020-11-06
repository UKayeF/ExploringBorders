import React from 'react';
import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';
import { ExploringBorders } from './Game';

const ExploringBordersClient = Client({
  game: ExploringBorders,
  multiplayer: Local(),
});

const App = () => (
  <div>
    <ExploringBordersClient playerID='0'/>
  </div>
)

export default App;
