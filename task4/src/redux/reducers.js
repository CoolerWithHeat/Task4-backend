import { createSlice, configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';


export const SelectedUsers = createSlice({
    name: 'selectedUsers',

    initialState: {
    All_IDs: [],
    Selected_IDs: [],
    all_selected: false,
    },
    
    reducers: {
    UpdateAll: (state, action) => {
        if (action.payload) {
        state.All_IDs = [...action.payload];
        
        }
    },
    UpdateSelected: (state, action) => {
        if (action.payload) {
        state.Selected_IDs = [...action.payload];
        state.all_selected = false
        }
    },

    Update_All_selected: (state, action) => {
        state.all_selected = action.payload
    },

    Reset_all_checkboxes: (state, action) => {
        state.all_selected = false
        state.Selected_IDs = []
    },
    },
});

export const Messages = createSlice({
    name: 'selectedUsers',

    initialState: {
        Error_message: null,
        Success_Message: null,
    },
    
    reducers: {
    UpdateErrorMessage: (state, action) => {
        
        if (action.payload == 'reset') {
            state.Error_message = null
        }

        else {
            if (action.payload)
                state.Error_message = action.payload
        }
    },

    UpdateSuccessMessage: (state, action) => {

        if (action.payload == 'reset') {
            state.Success_Message = null
        }
        else {
            if (action.payload)
                state.Success_Message = action.payload
        }
    }
    },
});


const StatesBase = combineReducers({
    SelectedUsers: SelectedUsers.reducer,
    Alerts: Messages.reducer,
});

export default StatesBase;