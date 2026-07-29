export function formatGameName(game) {
  const gameNames = {
    "snake-io": "Snake.io",
    "piano-tiles-2": "Piano Tiles 2",
    "watch-pet": "Watch Pet",
    "stacky-bird": "Stacky Bird",
    "helix-stack-jump": "Helix Stack Jump",
    "mr-jump": "Mr Jump",
    "microtown-io": "MicroTown.io",
    "zendoku": "Zendoku",
  };

  return gameNames[game] || game;
}