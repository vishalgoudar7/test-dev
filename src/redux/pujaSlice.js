import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';

// ✅ Fetch all pujas with extended page size
export const fetchPujas = createAsyncThunk(
  'puja/fetchPujas',
  async (_, thunkAPI) => {
    const token = localStorage.getItem('token'); // Runtime token
    if (!token) {
      return thunkAPI.rejectWithValue("Token missing. Please log in.");
    }

    try {
      const response = await api.get('/api/v1/devotee/puja/?page_size=100', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return response.data.results;
    } catch (error) {
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
        state.error = '';
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
