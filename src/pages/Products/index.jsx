import React, { useEffect, useState } from "react";
import useGetData from "../../hooks/useGetData";
import ProductModal from "../../components/ProductModal";
import { updateDoc, arrayUnion, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductByNameQuery } from "../../products/productsApi";
import { getData, searchData } from "../../products/productsSlice";
import { filterData } from "../../products/productsSlice";
import { useAsyncError } from "react-router-dom";
import { addToCart } from "../../cart/cartSlice";

export default function Products() {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(filterData(filter));
  }, [filter]);

  useEffect(() => {
    dispatch(searchData(search));
  }, [search]);

  const [cartItems, setCartItems] = useState({});
  const { data, error, isLoading, isSuccess } = useGetProductByNameQuery();

  const { filteredData } = useSelector((state) => state.products);

  useEffect(() => {
    if (isSuccess) {
      dispatch(getData(data));
    }
  }, [isSuccess, data, dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        document.getElementById("my_modal_1").showModal();
        await deleteDoc(doc(db, "products", id));
        document.getElementById("my_modal_1").closest("dialog").close();
        window.location.reload();
      } catch (error) {
        console.error("Error deleting product: ", error);
      }
    }
  };

  const handleAddToCart = (id) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleUpdateCart = async (item) => {
    document.getElementById("my_modal_1").showModal();
    dispatch(addToCart(item));
    document.getElementById("my_modal_1").closest("dialog").close();
  };

  const handleIncrement = (id) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleDecrement = (id) => {
    setCartItems((prev) => {
      const newCount = (prev[id] || 0) - 1;
      if (newCount < 1) {
        const { [id]: _, ...rest } = prev;
        return rest;
      } else {
        return {
          ...prev,
          [id]: newCount,
        };
      }
    });
  };

  return (
    <section>
      <div className="container">
        <div className="flex items-center justify-between pb-3 border-b-2 mb-10">
          <h2 className="text-2xl">Products</h2>
          <div className="flex items-center gap-4">
            <label className="input input-sm input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="select select-sm select-bordered w-full max-w-xs"
            >
              <option value="">Filter</option>
              <option value="rating">Rating⭐</option>
              <option value="price">Price $</option>
              <option value={"name"}>A-Z</option>
              <option value={"!name"}>Z-A</option>
            </select>
            <button
              className="btn btn-success btn-sm"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Add
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="mt-14 flex items-center justify-center">
            <span
              style={{ zoom: 2 }}
              className="loading loading-spinner loading-lg"
            ></span>
          </div>
        )}

        {!!filteredData?.length && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-14">
            {filteredData.map((item) => {
              const {
                id,
                description,
                price,
                image,
                stock,
                rating: { rate },
                title,
              } = item;
              return (
                <div
                  key={id}
                  className="card card-compact w-[350px] bg-base-300 shadow-[0_2px_10px_0_rgba(255,255,255)] justify-self-center"
                >
                  <figure>
                    <img
                      style={{
                        width: "310px",
                        height: "200px",
                        objectFit: "cover",
                      }}
                      src={image}
                      alt={title}
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title text-lg">{title}</h2>
                    <p>Price: {price}$</p>
                    <p>Rating: {rate}⭐</p>
                    <p>Description: {description}</p>
                    <div className="card-actions justify-end">
                      {cartItems[id] ? (
                        <div className="flex items-center">
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => handleDecrement(id)}
                            disabled={cartItems[id] <= 1}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={cartItems[id]}
                            readOnly
                            className="mx-2 w-12 text-center"
                          />
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => handleIncrement(id)}
                          >
                            +
                          </button>
                          <button
                            className="btn btn-sm btn-primary ml-2"
                            onClick={() => handleUpdateCart(item)}
                          >
                            Add to Cart
                          </button>
                        </div>
                      ) : (
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleAddToCart(id)}
                        >
                          Buy Now
                        </button>
                      )}
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => handleDelete(id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ProductModal setRefresh={setRefresh} />
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box w-fit">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </dialog>
    </section>
  );
}
