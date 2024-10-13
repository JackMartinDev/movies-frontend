export const queryBuilder = (
  params: Record<string, string | number | undefined>,
) => {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value != null) {
      query.append(key, String(value));
    }
  }
  return query.toString() ? `?${query.toString()}` : "";
};
