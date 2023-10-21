import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiServices from "../services/apiServices";


const api = 'https://9190-2a00-23ee-2208-5eae-9420-641e-230c-d32c.ngrok-free.app/api/v1/jobs';
//const api = 'http://127.0.0.1:8000/api/v1/jobs';


export const createJob = createAsyncThunk('jobs/create', async ( job ) => {

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
      },
      body: JSON.stringify(
        job
      )
    };

    const res = await fetch(api, requestOptions);
    const final = await res.json();
    
    const {
      status
    } = res;

   return final;

  
});

export const retrieveJobs = createAsyncThunk('jobs/retrieve', async (page) => {
  const res = await fetch(`${api}?page=${page}`);
  const final = await res.json();
  return final;
});

export const updateJob = createAsyncThunk(
  "jobs/update",
  async ({ id, data }) => {
    const res = await apiServices.update(id, data);
    return res.data;
  }
);

export const deleteJob = createAsyncThunk(
  "jobs/delete",
  async ({ id }) => {
    await apiServices.remove(id);
    return { id };
  }
);

const JobSlice = createSlice({
  name: 'products',
  initialState: {
    data: [],
    isLoading: false,
    isError: false,
    error: '',
    reload : 1,
    reFectch: 0,
  },
  extraReducers: builder => {
    builder.addCase(retrieveJobs.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(retrieveJobs.fulfilled, (state, action) => {
      state.isLoading = false;
      //return action.payload.data;
      // state.data = [...state.data, ...action.payload.data];
      // //console.log(action.payload.meta.current_page);
      // state.reload = action.payload.meta.current_page;

    });
    builder.addCase(retrieveJobs.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(createJob.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createJob.fulfilled, (state, action) => {
      state.isLoading = false;

      if(action.payload.errors){
        state.isError = true;
        state.error = action.payload.message;
      }else{
        state.data.push(action.payload.data);
        state.data = [];
        state.reload += 1;
        state.reFectch += 1;
      }

    });
    builder.addCase(createJob.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      //console.log(action);
      //state.error = 
    });
  },
});

export default JobSlice.reducer;