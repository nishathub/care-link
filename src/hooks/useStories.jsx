"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const useStories = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStories = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_CareLinkAPI}/impactStories`);
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
    fetchStories();
  }, []);

  return {
    allStories: data,
    isAllStoriesLoading: isLoading,
    errorFetchStoriesMessage: error,
    storiesRefetch: fetchStories,
  };
};

export default useStories;
