"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const useUsers = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_CareLinkAPI}/allUsers`);
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
    fetchUsers();
  }, []);

  return {
    allUsers: data,
    isAllUsersLoading: isLoading,
    errorFetchUsersMessage: error,
    usersRefetch: fetchUsers,
  };
};

export default useUsers;
