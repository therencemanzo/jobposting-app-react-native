import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const api = 'https://8ee9-2a00-23ee-10f0-468d-4b5-e452-1d09-ff52.ngrok-free.app/api/v1/jobs';
//const api = 'http://127.0.0.1:8000/api/v1/jobs';


export const createJob = createAsyncThunk('jobs/create', async (job) => {

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

  return final;


});

export const updateJob = createAsyncThunk('jobs/update', async (job, { getState }) => {

  const state = getState();
  
  const requestOptions = {
    method: 'PUT',
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

  const res = await fetch(`${api}/${job.id}`, requestOptions);
  const final = await res.json();

  return final;


});


export const retrieveJobs = createAsyncThunk('jobs/retrieve', async (page) => {
  const res = await fetch(`${api}?page=${page}`);
  const final = await res.json();
  return final;
});

export const retrieveJob = createAsyncThunk('job/retrieve', async (id) => {
  const res = await fetch(`${api}/${id}`);
  const final = await res.json();
  return final;
});

export const deleteJob = createAsyncThunk('jobs/delete', async (id) => {

  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Origin': '',
    }
  };

  const res = await fetch(`${api}/${id}`, requestOptions);

});


const JobSlice = createSlice({
  name: 'products',
  initialState: {
    data: [],
    isLoading: false,
    isError: false,
    error: '',
    reload: 1,
    reFectch: 0,
  },
  extraReducers: builder => {
   
    builder.addCase(retrieveJobs.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(retrieveJob.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(retrieveJob.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.isLoading = false;
      
    });
    builder.addCase(createJob.fulfilled, (state, action) => {
      state.isLoading = false;
      
      
      if (action.payload.errors) {
        state.isError = true;
        state.error = action.payload.message;
      } else {
        state.data = [];
        state.reload += 1;
        state.reFectch += 1;
        state.isError = false;
      }

    });
    builder.addCase(deleteJob.pending, (state, action) => {

      state.isLoading = true;
      state.reFectch += 1;

    });
    builder.addCase(deleteJob.fulfilled, (state, action) => {
      state.data = [];
      state.reload += 1;
      state.reFectch += 1;
      state.isLoading = false;

    });
    builder.addCase(updateJob.pending, (state, action) => {
      state.isError = false;
      state.isLoading = true; 
      

    });
    builder.addCase(updateJob.fulfilled, (state, action) => {

      state.isLoading = false;

      if (action.payload.errors) {
        state.isError = true;
        state.error = action.payload.message;
      } else {
        state.reload += 1;
      }
    });
  },
});

export default JobSlice.reducer;