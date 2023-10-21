import { configureStore,MiddlewareArray  } from '@reduxjs/toolkit'
import JobSlice  from '../slices/jobs';
import Loader from '../slices/loader';

export const store = configureStore({
  reducer: {
    jobs: JobSlice,
    loader : Loader
    
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
 
});