const arc_constellation = Array(22).fill('arc_constellation');
const space_y_constellation = Array(1).fill('space_y_constellation');
const lambda_constellation = Array(22).fill('lambda_constellation');
const silky_way = Array(1).fill('silky_way');
const supernova = Array(4).fill('supernova');
const green_planet = Array(3).fill('green_planet');
const red_planet = Array(3).fill('red_planet');
const solar_system = Array(1).fill('solar_system');
const black_hole = Array(1).fill('black_hole_purple');
const white_hole = Array(1).fill('white_hole');

/* Idea: tie potential event types and their likelihoods to map tiles
  e.g. supernova -> high likelihood of "escape the explosion"-event
       green_planet -> refit & rearm option
       red_planet -> alien encounter?

 */

export default [
  ...arc_constellation,
  ...space_y_constellation,
  ...lambda_constellation,
  ...silky_way,
  ...supernova,
  ...green_planet,
  ...red_planet,
  ...solar_system,
  ...black_hole,
  ...white_hole,
]
