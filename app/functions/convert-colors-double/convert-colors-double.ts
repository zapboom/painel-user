export default function convertColorsDouble(colors: number[]) {
  let colors_converted = "";

  for (const color of colors) {
    const convertedColor = verifyNumberColorDoubleAndReturnColor(color);

    colors_converted += convertedColor;
  }

  return colors_converted;
}

export function verifyNumberColorDoubleAndReturnColor(color: number) {
  if (color === 0) {
    return "⚪";
  } else if (color === 1) {
    return "🟡";
  } else if (color === 2) {
    return "🔵";
  } else {
    return "⚫";
  }
}
