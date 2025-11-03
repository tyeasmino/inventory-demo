export const getFetchErrorMessage = (data) => {
  const objError =
    typeof data === "object" &&
    !Array.isArray(data) &&
    Object.keys(data).length > 0 &&
    Object.entries(data)[0]?.[1]?.[0];

  const errorMessage =
    data?.detail ||
    data?.message ||
    data?.error ||
    objError ||
    data?.messages[0] ||
    data[0];

  return errorMessage;
};

export function getTimeDiffShort(dateStr) {
  const [day, month, year] = dateStr?.split("-") || [];
  const inputDate = new Date(`${year}-${month}-${day}T00:00:00`);
  const now = new Date();
  const diffMs = Math.abs(now.getTime() - inputDate.getTime());

  const minutes = Math.floor(diffMs / (1000 * 60));
  if (minutes < 60) return `${minutes} min`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr`;

  const days = Math.floor(hours / 24);
  return `${days} d`;
}
