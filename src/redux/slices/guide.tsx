import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
//import { RootState } from '../store'

// Define a type for the slice state
interface Variable
{
    visible: object
    
}

// Define the initial state using that type
const initialState: Variable = {
    visible: {},
}

export const guideSlice = createSlice({
    name: 'counter',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {

       
        changeGuide: (state, action: PayloadAction<object>) =>
        {
            state.visible = action.payload
        },
       
    },
})

export const { changeGuide} = guideSlice.actions

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.counter.value

export default guideSlice.reducer