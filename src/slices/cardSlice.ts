import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';

export interface NewCard {
    image?: File | null;
    name: string;
    caption: string;
    grade: string;
    academicYear: string;
    campus: string;
    studentId: string;
    border: string;
}

const initialState = {
    image: null,
    name: "",
    caption: "",
    grade: '',
    academicYear: '',
    campus: '',
    studentId: '',
    border: '',
};

const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        setImage: (state, action) => {
            state.image = action.payload;
        },
        setCard: (state, action) => {
            if (action.payload?.name?.length > 35) {
                toast.warning('Name cannot be longer than 35 characters',{duration: 1500});
                return;
            }
            if(action.payload?.caption?.length > 300){
                toast.warning('Caption cannot be longer than 300 characters',{duration: 1500});
                return;
            }
            if(action.payload.studentId?.length > 15){
                toast.warning('Please Only Enter valid student ID',{duration: 1500});
                return;
            }

            return { ...state, ...action.payload };
        }
    },
});

export const { setImage, setCard } = cardSlice.actions;
export default cardSlice.reducer;
