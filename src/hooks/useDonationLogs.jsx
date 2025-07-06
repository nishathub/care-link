"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const useDonationLogs = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_CareLinkAPI}/donationLogs`);
      setData(res.data.data);
      setError(null);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return {
    allLogs: data,
    isAllLogsLoading: isLoading,
    errorFetchLogsMessage: error,
    logsRefetch: fetchLogs,
  };
};

export default useDonationLogs;
