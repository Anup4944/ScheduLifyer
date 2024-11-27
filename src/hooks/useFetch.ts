import { useState } from "react";

export const useFetch = (callback: any) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const updateUserNameFn = async (...args: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await callback(...args);
      setData(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, updateUserNameFn };
};
