import React, { useEffect, useState } from "react";
import useGetData from "../../hooks/useGetData";
import ProductModal from "../../components/ProductModal";
import { deleteDoc, doc } from "firebase/firestore"; // Adjust import as per your Firestore setup
import { db } from "../../firebase/config"; // Adjust import as per your Firebase config

export default function Products() {
  const [refresh, setRefresh] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const { data, isPending, error } = useGetData("products", refresh);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, "products", id));
        setRefresh((prev) => !prev);
      } catch (error) {
        console.error("Error deleting product: ", error);
      }
    }
  };

  return (
    <section>
      <div className="container ">
        <div className="flex items-center justify-between pb-3 border-b-2 mb-10">
          <h2 className="text-2xl">Products</h2>
          <button
            className="btn btn-success  btn-sm"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            Add
          </button>
        </div>

        {isPending && (
          <div className=" mt-14 flex items-center justify-center">
            <span
              style={{ zoom: 2 }}
              className="loading loading-spinner loading-lg"
            ></span>
          </div>
        )}

        {!!data.length && (
          <div className="flex items-center justify-between gap-10 flex-wrap">
            {data.map(({ id, desc, price, image, stock, rating, name }) => (
              <div
                key={id}
                className="card card-compact w-96 bg-base-300 shadow-[0_2px_10px_0_rgba(255,255,255)]"
              >
                <figure>
                  <img src={image} alt={name} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{name}</h2>
                  <p>{desc}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                    <button
                      className="btn btn-error"
                      onClick={() => handleDelete(id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ProductModal setRefresh={setRefresh} />
    </section>
  );
}
