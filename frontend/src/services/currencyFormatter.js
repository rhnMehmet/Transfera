function trimNumber(value) {
  const numeric = Number(value);

  if (!Number.isFinite(numeric)) {
    return "-";
  }

  return numeric.toFixed(2).replace(/\.00$/, "").replace(/(\.\d)0$/, "$1");
}

function normalizeMillionAmount(value) {
  const numeric = Number(value);

  if (!Number.isFinite(numeric)) {
    return null;
  }

  if (Math.abs(numeric) >= 1_000_000) {
    return numeric / 1_000_000;
  }

  return numeric;
}

export function formatMillionValue(value, { spaced = false } = {}) {
  const millionAmount = normalizeMillionAmount(value);

  if (millionAmount == null) {
    return "-";
  }

  return `${trimNumber(millionAmount)}${spaced ? " " : ""}M EUR`;
}

export function formatCurrencyValue(value) {
  const numeric = Number(value);

  if (!Number.isFinite(numeric)) {
    return "-";
  }

  if (Math.abs(numeric) >= 1_000_000) {
    return formatMillionValue(numeric);
  }

  if (Math.abs(numeric) >= 1_000) {
    return `${trimNumber(numeric / 1_000)}K EUR`;
  }

  return `${trimNumber(numeric)} EUR`;
}
