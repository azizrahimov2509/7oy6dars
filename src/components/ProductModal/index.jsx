import React, { useState } from "react";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

function ProductModal({ setRefresh }) {
  const [productData, setProductData] = useState({
    name: "",
    desc: "",
    price: "",
    image: "",
    rating: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(productData);

    // Add a new document in collection "cities"
    const docRef = await addDoc(collection(db, "products"), {
      ...productData,
    });
    console.log(docRef);
    setProductData({
      name: "",
      desc: "",
      price: "",
      image: "",
      rating: "",
    });
    document.getElementById("my_modal_1").showModal();
    setRefresh((prev) => !prev);
    document.getElementById("my_modal_1").closest("dialog").close();
    window.location.reload();
  };
  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg mb-5 text-center">Create a product</h3>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Product Name</span>
            </div>
            <input
              value={productData.name}
              onChange={(e) =>
                setProductData({ ...productData, name: e.target.value })
              }
              type="text"
              placeholder="Enter product name..."
              className="input input-bordered input-md w-full max-w-xs input-primary"
            />
          </label>
          {/* Description */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Product Description</span>
            </div>
            <input
              value={productData.desc}
              onChange={(e) =>
                setProductData({ ...productData, desc: e.target.value })
              }
              type="text"
              placeholder="Enter product desc..."
              className="input input-bordered input-md w-full max-w-xs input-primary"
            />
          </label>
          {/* image */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Product Image Link</span>
            </div>
            <input
              value={productData.image}
              onChange={(e) =>
                setProductData({ ...productData, image: e.target.value })
              }
              type="text"
              placeholder="Enter product image link..."
              className="input input-bordered input-md w-full max-w-xs input-primary"
            />
          </label>
          {/* price */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Product Price</span>
            </div>
            <input
              value={productData.price}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  price: Number(e.target.value),
                })
              }
              type="number"
              placeholder="Enter product price..."
              className="input input-bordered input-md w-full max-w-xs input-primary"
            />
          </label>
          {/* rating */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Product Rating</span>
            </div>
            <div className="rating rating-lg rating-half">
              <input type="radio" name="rating-10" className="rating-hidden" />
              <input
                onChange={() => setProductData({ ...productData, rating: 0.5 })}
                type="radio"
                name="rating-10"
                className="bg-green-500 mask mask-star-2 mask-half-1"
              />
              <input
                onChange={() => setProductData({ ...productData, rating: 1 })}
                type="radio"
                name="rating-10"
                className="bg-green-500 mask mask-star-2 mask-half-2"
              />
              <input
                onChange={() => setProductData({ ...productData, rating: 1.5 })}
                type="radio"
                name="rating-10"
                className="bg-green-500 mask mask-star-2 mask-half-1"
              />
              <input
                onChange={() => setProductData({ ...productData, rating: 2 })}
                type="radio"
                name="rating-10"
                className="bg-green-500 mask mask-star-2 mask-half-2"
              />
              <input
                onChange={() => setProductData({ ...productData, rating: 2.5 })}
                type="radio"
                name="rating-10"
                className="bg-green-500 mask mask-star-2 mask-half-1"
              />
              <input
                onChange={() => setProductData({ ...productData, rating: 3 })}
                type="radio"
                name="rating-10"
                className="bg-green-500 mask mask-star-2 mask-half-2"
              />
              <input
                onChange={() => setProductData({ ...productData, rating: 3.5 })}
                type="radio"
                name="rating-10"
                className="bg-green-500 mask mask-star-2 mask-half-1"
              />
              <input
                onChange={() => setProductData({ ...productData, rating: 4 })}
                type="radio"
                name="rating-10"
                className="bg-green-500 mask mask-star-2 mask-half-2"
              />
              <input
                onChange={() => setProductData({ ...productData, rating: 4.5 })}
                type="radio"
                name="rating-10"
                className="bg-green-500 mask mask-star-2 mask-half-1"
              />
              <input
                onChange={() => setProductData({ ...productData, rating: 5 })}
                type="radio"
                name="rating-10"
                className="bg-green-500 mask mask-star-2 mask-half-2"
              />
            </div>
          </label>
          <button
            type="submit"
            className=" max-w-xs w-full mt-7 btn btn-outline btn-primary"
          >
            Create
          </button>
        </form>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box w-fit">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </dialog>
    </dialog>
  );
}

export default ProductModal;
