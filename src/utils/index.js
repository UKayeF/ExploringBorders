import { TILES_PER_ROW } from '../Game';

export const getPositionFromIndex = (index) => ({
  y: Math.floor(index / TILES_PER_ROW),
  x: index % TILES_PER_ROW,

  /* Orientation Snake
     >-7-8-9-:>
     >-4-5-6->
     >-1-2-3->
   */
})

export const inRange = ({ min, max, bottomOpen = false, topOpen = false }) =>
  number => {
    const isGreaterThanOrEqualsMin = bottomOpen ? number > min : number >= min;
    const isSmallerThanOrEqualsMax = topOpen ? number < max : number <= max;
    return isGreaterThanOrEqualsMin && isSmallerThanOrEqualsMax;
  }
