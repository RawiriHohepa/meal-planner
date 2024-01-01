import { useState, useEffect } from "react";
import axios from "axios";

const useCrud = <Type extends { [idProp: string]: string }>(
  baseUrl: string,
  initialState: Type[] = [],
  idProp: string = "_id"
) => {
  const [data, setData] = useState<Type[]>(initialState);
  const [isLoading, setLoading] = useState(false);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    (async () => {
      setLoading(true);
      axios
        .get<Type[]>(baseUrl)
        .then((response) => {
          setLoading(false);
          setData(response.data);
        })
        .catch((err) => {
          setLoading(false);
        });
    })();
  }, [baseUrl, version]);

  function reFetch() {
    setVersion(version + 1);
  }

  async function update(item: Type) {
    return axios
      .put(`${baseUrl}/${item[idProp]}`, item)
      .then((response) => {
        setData((existingData) =>
          existingData.map((d: Type) =>
            d[idProp] === item[idProp] ? { ...d, ...item } : d
          )
        );
      })
      .catch((err) => {
        // TODO error handling
      });
  }

  async function create(item: any) {
    return axios
      .post(baseUrl, item)
      .then((response) => {
        const newItem = response.data;
        setData((existingData) => [...existingData, newItem]);
        return newItem;
      })
      .catch((err) => {
        // TODO error handling
      });
  }

  async function deleteItem(item: any) {
    return axios
      .delete(`${baseUrl}/${item[idProp]}`)
      .then((response) => {
        setData((existingData) =>
          existingData.filter((d: any) => d[idProp] !== item[idProp])
        );
      })
      .catch((err) => {
        // TODO error handling
      });
  }

  return { data, idProp, isLoading, reFetch, update, create, deleteItem };
};

export default useCrud;
