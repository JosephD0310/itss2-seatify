import { useEffect, useState, useCallback } from "react";
import axios from 'axios';

const useFetch = <T,>(url: string) => {
    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axios.get<T>(url);
            setData(res.data);
            setError(null);
        } catch (err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, reFetch: fetchData };
};

export default useFetch;
