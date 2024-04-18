import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  id: string | null;
};

const initialState: UserState = {
  id: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
