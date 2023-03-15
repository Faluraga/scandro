import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
//import { RootState } from '../store'

// Define a type for the slice state
interface Variable
{
    visible: boolean
}

// Define the initial state using that type
const initialState: Variable = {
    visible: false,
}

export const modalSlice = createSlice({
    name: 'counter',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {

       
        changeModalVisibility: (state, action: PayloadAction<boolean>) =>
        {
            state.visible = action.payload
        },
       
    },
})

export const { changeModalVisibility} = modalSlice.actions

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.counter.value

export default modalSlice.reducer