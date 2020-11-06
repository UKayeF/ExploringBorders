import { WIDTH } from '../Game';

export const getPositionFromIndex = (index) => ({
  y: Math.floor(index / WIDTH),
  x: index % WIDTH,

  /* Orientation Snake
     >-7-8-9-:>
     >-4-5-6->
     >-1-2-3->
   */
})
