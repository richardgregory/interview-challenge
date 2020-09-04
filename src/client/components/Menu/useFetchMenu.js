import { useEffect, useState } from "react";

export const useFetchMenu = (search) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      setLoading(true);

      try {
        const response = await fetch("http://localhost:3000/api/items");
        const json = await response.json();
        setLoading(false);

        if (search) {
          const result = json.items.filter((item) =>
            item.name.toLowerCase().includes(search)
          );
          return setData({ items: result });
        }

        setData(json);
      } catch (e) {
        console.error(e);
        setLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, [search]);

  return { loading, error, data };
};

export default useFetchMenu;
