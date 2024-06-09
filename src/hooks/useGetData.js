import React, { useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

export default function useGetData(collectionName, refresh, filter = "rating") {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState({ status: false, massage: "" });
  useEffect(() => {
    const getData = async () => {
      try {
        const documents = [];
        const querySnapshot = await getDocs(collection(db, collectionName));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          console.log({ id: doc.id, ...doc.data() });
          documents.push({ id: doc.id, ...doc.data() });
        });

        setData(documents);
      } catch (error) {
        setError({ status: true, message: error.message });
      } finally {
        setIsPending(false);
      }
    };
    getData();
  }, [refresh]);

  const filterData = useMemo(() => {
    if (filter === null) {
      return data;
    }
    if (filter === "name") {
      return data.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    }
    if (filter === "!name") {
      return data.sort(function (a, b) {
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0;
      });
    }
    return data.sort((a, b) => b[`${filter}`] - a[`${filter}`]);
  }, [filter, data]);
  return { data, filterData, isPending, error };
}
