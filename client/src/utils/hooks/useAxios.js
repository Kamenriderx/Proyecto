import { useEffect, useState } from "react";
import { httpRequests } from "../helpers/httpRequests";
export default function useAxios(url,method,options = {}) {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const getData = async (url) => {
      try {
        let response = await httpRequests()[method](url,options);
        if (response.status !== 200) {
          throw {
            err: true,
            status: response.status,
            statusText: !response.statusText
              ? "Ocurrio un error"
              : response.statusText,
          };
        }

        setIsPending(false);
        setData(response.data);
        setError({ err: false });
      } catch (err) {
        setIsPending(true);
        setError(err);
      }
    };

    getData(url);
  }, [url]);
  return { data, isPending, error };
}
