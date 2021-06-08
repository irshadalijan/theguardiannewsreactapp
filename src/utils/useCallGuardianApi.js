import { useState, useEffect } from "react";
import AppConsts from "./App_Consts";

export default function useCallGuardianApi(param, filterText = "") {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const url =
    AppConsts.apiUrl +
    param +
    "?api-key=" +
    AppConsts.apiKey +
    "&show-fields=all" +
    "&" +
    filterText;

  useEffect(() => {
    if (filterText !== "") {
      fetch(url)
        .then((res) => res.json())
        .then(
          (result) => {
            setData(result.response);
            setIsLoaded(true);
          },
          (err) => {
            setError("Data Cannnot be Fetched");
            setIsLoaded(true);
          }
        );
    } else {
      setIsLoaded(true);
    }
    return () => {
      setIsLoaded(false);
    };
  }, [url]);

  return { error, isLoaded, data };
}
