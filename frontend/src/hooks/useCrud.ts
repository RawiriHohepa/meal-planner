import { useState, useEffect } from "react";
import axios from "axios";

export type CrudHookType<Type> = {
  items: Type[];
  initialiseItems: (initialItems: Type[]) => void;
  addItem: (item: Type) => void;
  addItems: (items: Type[]) => void;
  removeItem: (itemToRemove: Type) => void;
  updateItem: (updatedItem: Type) => void;
};

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
      })
      .catch((err) => {
        // TODO error handling
      });
  }

  async function deleteItem(item: any) {
    return axios
      .delete(`${baseUrl}/${item.id}`)
      .then((response) => {
        setData((existingData) =>
          existingData.filter((d: any) => d[idProp] !== item[idProp])
        );
      })
      .catch((err) => {
        // TODO error handling
      });
  }

  return { data, isLoading, reFetch, update, create, deleteItem };
};

export default useCrud;
