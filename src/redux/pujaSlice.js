import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';

const token = 'c91ae32509fa4ce4e8c21aa4a86118100f97c4f2'; // same token

export const fetchPujas = createAsyncThunk(
  'puja/fetchPujas',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/api/v1/devotee/puja/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log('Fetched pujas:', response.data.results);
      return response.data.results;
    } catch (error) {
      console.error('Fetch pujas error:', error);
      return thunkAPI.rejectWithValue('Failed to fetch pujas');
    }
  }
);

const pujaSlice = createSlice({
  name: 'puja',
  initialState: {
    pujas: [],
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPujas.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPujas.fulfilled, (state, action) => {
        state.loading = false;
        state.pujas = action.payload;
      })
      .addCase(fetchPujas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching pujas';
      });
  },
});

export default pujaSlice.reducer;
