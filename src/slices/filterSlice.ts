import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';
import {Filter} from "~/server/type";

interface Initial_Filter {
    filter: null | Filter
    limit: 6 | 12 ,
    page: number
}

const initialState: Initial_Filter = {
    filter: null,
    limit: 12,
    page: 0
};

const filterSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
      setLimit: (state, action) => {

        return state.limit = action.payload;
      },
      setFilter: (state, action) => {

        return {...state, filter: action.payload};
      },
        setPage: (state, action) => {

            return state.page = action.payload;
        }
    },
});

export const { setLimit, setFilter,setPage } = filterSlice.actions;
export default filterSlice.reducer;
