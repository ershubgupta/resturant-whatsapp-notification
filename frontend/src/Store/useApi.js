import React, { useEffect, useState } from "react";
import axios from "../axios";

export default function useApi(url) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(true)

  async function fetchItemList() {
    try {
      const res = await axios.get(url);
      setItems(res.data);
      setError("");
      setLoading(false);
    } catch (error) {
      setError({
        title: error.response.statusText,
        message: error.response.data,
      });
      console.log(error.response.data);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItemList();
  }, [error, loading]);
  return [items, error, loading];
}

