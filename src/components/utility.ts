export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  const month = date.toLocaleDateString("en-GB", { month: "short" });
  const year = date.getFullYear();
  return `${day}${suffix} ${month}, ${year}`;
};

export const formatTime = (timeString: string) => {
  const [hour, minutes] = timeString.split(":").map(Number);
  return new Date(0, 0, 0, hour, minutes)
    .toLocaleTimeString("en-GB", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toUpperCase();
};
