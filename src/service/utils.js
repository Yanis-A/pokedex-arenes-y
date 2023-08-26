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

// Get color corresponding to pokemon type (with opacity)
export function getColorForType(type, opacity) {
  switch (type.toLowerCase()) {
    case "normal":
      return `rgba(168, 168, 120, ${opacity})`;
    case "fire":
      return `rgba(240, 128, 48, ${opacity})`;
    case "water":
      return `rgba(104, 144, 240, ${opacity})`;
    case "electric":
      return `rgba(248, 208, 48, ${opacity})`;
    case "grass":
      return `rgba(120, 200, 80, ${opacity})`;
    case "ice":
      return `rgba(152, 216, 216, ${opacity})`;
    case "fighting":
      return `rgba(192, 48, 40, ${opacity})`;
    case "poison":
      return `rgba(160, 64, 160, ${opacity})`;
    case "ground":
      return `rgba(224, 192, 104, ${opacity})`;
    case "flying":
      return `rgba(168, 144, 240, ${opacity})`;
    case "psychic":
      return `rgba(248, 88, 136, ${opacity})`;
    case "bug":
      return `rgba(168, 184, 32, ${opacity})`;
    case "rock":
      return `rgba(184, 160, 56, ${opacity})`;
    case "ghost":
      return `rgba(112, 88, 152, ${opacity})`;
    case "dark":
      return `rgba(112, 88, 72, ${opacity})`;
    case "dragon":
      return `rgba(112, 56, 248, ${opacity})`;
    case "steel":
      return `rgba(184, 184, 208, ${opacity})`;
    case "fairy":
      return `rgba(238, 153, 172, ${opacity})`;
    default:
      return "";
  }
}

// Get first english flavor text available
export const getEnglishFlavorText = (flavorTexts) => {
  const englishEntries = flavorTexts.filter(
    (entry) => entry.language.name === "en"
  );
  if (englishEntries.length > 0) {
    // eslint-disable-next-line no-control-regex
    return englishEntries[0].flavor_text.replace(/[\u000c\n]/g, " ");
  } else {
    return null;
  }
}
