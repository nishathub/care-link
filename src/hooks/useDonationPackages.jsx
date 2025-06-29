"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const useDonationPackages = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPackages = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_CareLinkAPI}/donationPackages`);
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
    fetchPackages();
  }, []);

  return {
    allPackages: data,
    isAllPackagesLoading: isLoading,
    errorFetchPackagesMessage: error,
    packagesRefetch: fetchPackages,
  };
};

export default useDonationPackages;
