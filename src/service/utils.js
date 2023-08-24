// Capitzalize string
export function capitalizeFirstLetter(string) {
  if (typeof string !== "string" || string.length === 0) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Get emoji corresponding to pokemon type

export function getEmojiForType(type) {
  switch (type.toLowerCase()) {
    case "normal":
      return "🔘";
    case "fire":
      return "🔥";
    case "water":
      return "💧";
    case "electric":
      return "⚡";
    case "grass":
      return "🌿";
    case "ice":
      return "❄️";
    case "fighting":
      return "🥊";
    case "poison":
      return "☠️";
    case "ground":
      return "⛰️";
    case "flying":
      return "🦅";
    case "psychic":
      return "🔮";
    case "bug":
      return "🐛";
    case "rock":
      return "🗿";
    case "ghost":
      return "👻";
    case "dark":
      return "🌑";
    case "dragon":
      return "🐉";
    case "steel":
      return "🔩";
    case "fairy":
      return "🧚";
    default:
      return "";
  }
}
