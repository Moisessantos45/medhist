export const parseDateToISO = (dateValue: unknown): unknown => {
  if (!dateValue) return dateValue;

  if (dateValue instanceof Date) {
    return isNaN(dateValue.getTime()) ? dateValue : dateValue.toISOString();
  }

  if (typeof dateValue === "string") {
    const dateString = dateValue.includes("T")
      ? dateValue
      : `${dateValue}T00:00:00.000Z`;
    const parsed = new Date(dateString);

    if (!isNaN(parsed.getTime())) {
      return parsed.toISOString();
    }

    const fallbackParsed = new Date(dateValue);
    if (!isNaN(fallbackParsed.getTime())) {
      return fallbackParsed.toISOString();
    }
  }

  return dateValue;
};
