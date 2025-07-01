"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const useNews = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_CareLinkAPI}/news`);
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
    fetchNews();
  }, []);

  return {
    allNews: data,
    isAllNewsLoading: isLoading,
    errorFetchNewsMessage: error,
    NewsRefetch: fetchNews,
  };
};

export default useNews;
