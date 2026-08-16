import microtownPic from "../assets/games/microtownpic.png";
import pianoTilesPic from "../assets/games/pianotilespic.png";
import snakeIoPic from "../assets/games/snakeiopic.png";
import watchPetPic from "../assets/games/watchpetpic.png";
import zendokuPic from "../assets/games/zendokupic.png";

export const projects = [
  {
    id: 1,
    name: "Piano Tiles",
    slug: "piano-tiles",
    icon: "🎹",
    image: pianoTilesPic,
    platforms: ["iOS", "Android", "Amazon"],
    lastUpdated: "Today",
  },
  {
    id: 2,
    name: "Snake.io",
    slug: "snake-io",
    icon: "🐍",
    image: snakeIoPic,
    platforms: ["iOS", "Android", "Amazon"],
    lastUpdated: "Today",
  },
  {
    id: 3,
    name: "Zendoku",
    slug: "zendoku",
    icon: "🧩",
    image: zendokuPic,
    platforms: ["iOS", "Android", "Amazon"],
    lastUpdated: "Yesterday",
  },
  {
    id: 4,
    name: "Watch Pet",
    slug: "watch-pet",
    icon: "🐶",
    image: watchPetPic,
    platforms: ["iOS", "Android", "Amazon"],
    lastUpdated: "2 days ago",
  },
  {
    id: 5,
    name: "MicroTown",
    slug: "microtown",
    icon: "🏙️",
    image: microtownPic,
    platforms: ["iOS", "Android", "Amazon"],
    lastUpdated: "Today",
  },
];