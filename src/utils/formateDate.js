export const formatDate = (dateString) => {
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour12: true,
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};
