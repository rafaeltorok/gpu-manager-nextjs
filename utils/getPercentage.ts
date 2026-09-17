export default function getPercentage(firstValue: number, secondValue: number) {
  const difference = secondValue / firstValue;

  if (difference > 1) {
    return `+${Math.round(difference * 100 - 100).toLocaleString("de-DE")}%`;
  } else if (difference === 1) {
    return "0%";
  } else {
    return `-${Math.round(100 - difference * 100)}%`;
  }
}
