import offline_data from "../mock-data.json";

const initialStore = {
  volunteers: offline_data,
};

const reducer = (state = initialStore, action) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }
  if (action.type === "REMOVE") {
    return {
      ...state,
      cart: state.cart.filter((p) => p.id !== action.payload),
    };
  }
  if (action.type === "INCREASE") {
    return {
      ...state,
      cart: state.cart.map((p) => {
        if (p.id === action.payload) {
          return { ...p, amount: p.amount + 1 };
        } else return p;
      }),
    };
  }
  if (action.type === "DECREASE") {
    return {
      ...state,
      cart: state.cart.map((p) => {
        if (p.id === action.payload) {
          if (p.amount > 0) {
            return { ...p, amount: p.amount - 1 };
          } else return { ...p, amount: 0 };
        } else return p;
      }),
    };
  }
  if (action.type === "TOTAL") {
    let { amount, total } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemTotal = price * amount;
        cartTotal.amount += amount;
        cartTotal.total += itemTotal;
        return cartTotal;
      },
      {
        amount: 0,
        total: 0,
      }
    );
    total = total.toFixed(2);
    return {
      ...state,
      amount,
      total,
    };
  }
  return state;
};

export default reducer;
