import React, { useState } from "react";
import useGetData from "../../hooks/useGetData";
import ProductModal from "../../components/ProductModal";
import { updateDoc, arrayUnion, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";

export default function Products() {
  const [filter, setFilter] = useState("rating");
  const [refresh, setRefresh] = useState(false);
  const { data, isPending, error } = useGetData("products", refresh, filter);
  const [cartItems, setCartItems] = useState({});

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        document.getElementById("my_modal_1").showModal();
        await deleteDoc(doc(db, "products", id));
        setRefresh((prev) => !prev);
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

  const handleUpdateCart = async (id) => {
    const ref = doc(db, "cart", "Sq9hZ7Mo4guHBgvkeuMC");
    document.getElementById("my_modal_1").showModal();
    try {
      await updateDoc(ref, {
        products: arrayUnion({
          productId: id,
          count: cartItems[id],
        }),
      });
      document.getElementById("my_modal_1").closest("dialog").close();
      setRefresh((prev) => !prev);
      window.location.reload();
    } catch (error) {
      console.error("Error adding product to cart: ", error);
      document.getElementById("my_modal_1").closest("dialog").close();
    }
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
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="select select-sm select-bordered w-full max-w-xs"
            >
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

        {isPending && (
          <div className="mt-14 flex items-center justify-center">
            <span
              style={{ zoom: 2 }}
              className="loading loading-spinner loading-lg"
            ></span>
          </div>
        )}

        {!!data.length && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-14">
            {data.map(({ id, desc, price, image, stock, rating, name }) => (
              <div
                key={id}
                className="card card-compact w-[350px] bg-base-300 shadow-[0_2px_10px_0_rgba(255,255,255)] justify-self-center"
              >
                <figure>
                  <img width={250} height={250} src={image} alt={name} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-lg">{name}</h2>
                  <p>Price: {price}$</p>
                  <p>Rating: {rating}⭐</p>
                  <p>Description: {desc}</p>
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
                          onClick={() => handleUpdateCart(id)}
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
            ))}
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
