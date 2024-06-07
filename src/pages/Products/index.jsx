import React, { useEffect, useState } from "react";
import useGetData from "../../hooks/useGetData";
import ProductModal from "../../components/ProductModal";
import { set } from "firebase/database";

export default function Products() {
  const [refresh, setRefresh] = useState(false);
  const { data, isPending, error } = useGetData("products", refresh);

  return (
    <section>
      <div className="container ">
        <div className="flex items-center justify-between pb-3 border-b-2 mb-10">
          <h2 className="text-2xl">Products</h2>
          <button
            className="btn btn-outline btn-sm"
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
            {data.map(({ id, desc, price, image, stock, rating }) => {
              return (
                <div
                  key={id}
                  className="card card-compact w-96 bg-base-300 shadow-[0_2px_10px_0_rgba(255,255,255)]"
                >
                  <figure>
                    <img src={image} alt="Shoes" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>{desc}</p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary">Buy Now</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ProductModal setRefresh={setRefresh} />
    </section>
  );
}
