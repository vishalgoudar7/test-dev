
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api'; // Axios instance

// 🔥 Token from Postman response (temporary hardcoded for now)
const token = '91ae32509fa4ce4e8c21aa4a86118100f97c4f2f';

// ✅ Async thunk with authorization
export const fetchTemples = createAsyncThunk('temple/fetchTemples', async (_, thunkAPI) => {
  try {
    const response = await api.get('/api/v1/devotee/temple/', {
      headers: {
        Authorization: `Token ${token}`, // ✅ token auth required
      },
    });

    console.log('API Response:', response.data);
    return response.data.results;
  } catch (error) {
    console.error('Fetch Temples Error:', error);
    return thunkAPI.rejectWithValue('Failed to fetch temples');
  }
});

const templeSlice = createSlice({
  name: 'temple',
  initialState: {
    temples: [],
    loading: false,
    error: '',
    search: '',
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemples.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTemples.fulfilled, (state, action) => {
        state.loading = false;
        state.temples = action.payload;
      })
      .addCase(fetchTemples.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearch } = templeSlice.actions;
export default templeSlice.reducer;
