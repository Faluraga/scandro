import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
//import { RootState } from '../store'

// Define a type for the slice state
interface Variable
{
    value: string
}

// Define the initial state using that type
const initialState: Variable = {
    value: '',
}

export const varSlice = createSlice({
    name: 'counter',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {

        // Use the PayloadAction type to declare the contents of `action.payload`
        incrementByAmount: (state, action: PayloadAction<string>) =>
        {
            state.value = action.payload
        },
        resetByAmount: (state, action: PayloadAction<string>) =>
        {
            state.value = action.payload
        }


    },
})

export const { incrementByAmount ,resetByAmount} = varSlice.actions

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.counter.value

export default varSlice.reducer