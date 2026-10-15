// Uses comma as decimal separator and period for thousands
const LOCALE = "de-DE";

// Below 10%: up to 1 decimal
const smallFormatter = new Intl.NumberFormat(LOCALE, {
  maximumFractionDigits: 1,
  signDisplay: "exceptZero", // decides the sign AFTER rounding
});

// From 10% up: integer only
const largeFormatter = new Intl.NumberFormat(LOCALE, {
  maximumFractionDigits: 0,
  signDisplay: "exceptZero",
});

export default function getPercentage(firstValue: number, secondValue: number) {
  // Handles invalid values
  if (
    !Number.isFinite(firstValue) ||
    !Number.isFinite(secondValue) ||
    firstValue === 0
  ) {
    return "N/A";
  }

  // One signed percentage difference, computed once
  const percent = ((secondValue - firstValue) / firstValue) * 100;

  // Handles how will the decimal values be rounded
  const formatter = Math.abs(percent) < 10 ? smallFormatter : largeFormatter;

  return `${formatter.format(percent)}%`;
}
