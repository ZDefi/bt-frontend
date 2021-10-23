/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PriceApiResponse, PriceState } from 'state/types'

const HOST = process.env.REACT_APP_SERVER_HOST || 'https://api.flyswap.net'

const initialState: PriceState = {
  isLoading: false,
  lastUpdated: null,
  data: null,
}

// Thunks
export const fetchPrices = createAsyncThunk('prices/fetch', async () => {
  // const response = await fetch('https://api.flyswap.info/api/v2/tokens')
  const response = await fetch(`${HOST}/api/queryPrice`)
  const data = (await response.json()) as PriceApiResponse

  // Return normalized token names
  return {
    updated_at: new Date().getTime(),
    data: data.data.prices
  }
})

export const pricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPrices.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchPrices.fulfilled, (state, action) => {
      state.isLoading = false
      // state.lastUpdated = action.payload.updated_at
      state.data = action.payload.data
    })
  },
})

export default pricesSlice.reducer
