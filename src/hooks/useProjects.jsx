"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const useProjects = (apiSlug="") => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_CareLinkAPI}/ongoingProjects/${apiSlug}`);
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
    fetchProjects();
  }, []);

  return {
    allProjects: data,
    isAllProjectLoading: isLoading,
    errorFetchProjectsMessage: error,
    ProjectsRefetch: fetchProjects,
  };
};

export default useProjects;
