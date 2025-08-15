import { useEffect, useRef, useState } from "react";

const useFetch = <T>(
  fetchFunction: () => Promise<T>,
  dependencies: any[] = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const isMounted = useRef(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchFunction();

      if (isMounted.current) {
        setData(result);
      }
    } catch (error) {
      if (isMounted.current) {
        setError(
          error instanceof Error ? error : new Error(`An error occurred`)
        );
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  useEffect(() => {
    isMounted.current = true;
    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, dependencies);

  return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;
