import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalQuantity: 0,  // Keep track of the total quantity

  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      const parsedCost = parseFloat(cost.replace('$', '')); // Convert "$15" to 15

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost: parsedCost, quantity: 1 });
      }
      state.totalQuantity += 1;  // Increment total quantity

    },
    removeItem: (state, action) => {
      const itemToRemove = state.items.find(item => item.name === action.payload);
    
      if (itemToRemove) {
        // Decrease totalQuantity by the quantity of the removed item
        state.totalQuantity -= itemToRemove.quantity;
        // Filter out the item from the cart
        state.items = state.items.filter(item => item.name !== action.payload);
      }

    },
    updateQuantity: (state, action) => {
      
      const { id, quantity } = action.payload;  // Using id and quantity
      const itemToUpdate = state.items.find(item => item.id === id);  // Find item by id
      
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;  // Update the quantity
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
