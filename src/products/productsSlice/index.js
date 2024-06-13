import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  filteredData: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getData: (state, action) => {
      state.data = action.payload;
      state.filteredData = action.payload;
    },
    filterData: (state, action) => {
      switch (action.payload) {
        case "rating":
          state.filteredData = state.filteredData.sort(
            (a, b) => b.rating.rate - a.rating.rate
          );
          break;
        case "price":
          state.filteredData = state.filteredData.sort(
            (a, b) => b.price - a.price
          );
          break;
        case "name":
          state.filteredData = state.filteredData.sort(function (a, b) {
            if (a.title < b.title) {
              return -1;
            }
            if (a.title > b.title) {
              return 1;
            }
            return 0;
          });
          break;
        case "!name":
          state.filteredData = state.filteredData.sort(function (a, b) {
            if (a.title < b.title) {
              return 1;
            }
            if (a.title > b.title) {
              return -1;
            }
            return 0;
          });
          break;
      }
    },
    searchData: (state, action) => {
      state.filteredData = [
        ...state.data.filter(({ title }) =>
          title.toLowerCase().includes(action.payload.toLowerCase())
        ),
      ];
    },
  },
});

export const { getData, filterData, searchData } = productsSlice.actions;

export default productsSlice.reducer;
