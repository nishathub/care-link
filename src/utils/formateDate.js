export const formatDate = (dateString) => {
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateString)
      .toLocaleDateString("en-US", options)
      .replace(",", "");
  };