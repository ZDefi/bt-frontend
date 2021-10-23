/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import farmsConfig from 'config/constants/poolfarms'
import isArchivedPid from 'utils/farmHelpers'
import fetchPoolFarms from './fetchFarms'
import {
  fetchPoolFarmUserEarnings,
  fetchPoolFarmUserAllowances,
  fetchPoolFarmUserTokenBalances,
  fetchPoolFarmUserStakedBalances,
} from './fetchFarmUser'
import { FarmsState, Farm } from '../types'

const nonArchivedFarms = farmsConfig.filter(({ pid }) => !isArchivedPid(pid))

const noAccountFarmConfig = farmsConfig.map((farm) => ({
  ...farm,
  userData: {
    allowance: '0',
    tokenBalance: '0',
    stakedBalance: '0',
    earnings: '0',
  },
}))

const initialState: FarmsState = { data: noAccountFarmConfig, loadArchivedFarmsData: false, userDataLoaded: false }

export const farmsSlice = createSlice({
  name: 'PoolFarms',
  initialState,
  reducers: {
    setFarmsPublicData: (state, action) => {
      const liveFarmsData: Farm[] = action.payload
      state.data = state.data.map((farm) => {
        const liveFarmData = liveFarmsData.find((f) => f.pid === farm.pid)
        return { ...farm, ...liveFarmData }
      })
    },
    setFarmUserData: (state, action) => {
      const { arrayOfUserDataObjects } = action.payload
      arrayOfUserDataObjects.forEach((userDataEl) => {
        const { pid } = userDataEl
        const index = state.data.findIndex((farm) => farm.pid === pid)
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
      state.userDataLoaded = true
    },
    setLoadArchivedFarmsData: (state, action) => {
      const loadArchivedFarmsData = action.payload
      state.loadArchivedFarmsData = loadArchivedFarmsData
    },
  },
})

// Actions
export const { setFarmsPublicData, setFarmUserData, setLoadArchivedFarmsData } = farmsSlice.actions

// Thunks
export const fetchPoolFarmsPublicDataAsync = () => async (dispatch, getState) => {
  const fetchArchived = getState().farms.loadArchivedFarmsData
  const farmsToFetch = fetchArchived ? farmsConfig : nonArchivedFarms
  const farms = await fetchPoolFarms(farmsToFetch)
  dispatch(setFarmsPublicData(farms))
}
export const fetchPoolFarmUserDataAsync = (account: string) => async (dispatch, getState) => {
  const fetchArchived = getState().farms.loadArchivedFarmsData
  const farmsToFetch = fetchArchived ? farmsConfig : nonArchivedFarms
  const userFarmAllowances = await fetchPoolFarmUserAllowances(account, farmsToFetch)
  const userFarmTokenBalances = await fetchPoolFarmUserTokenBalances(account, farmsToFetch)
  const userStakedBalances = await fetchPoolFarmUserStakedBalances(account, farmsToFetch)
  const userFarmEarnings = await fetchPoolFarmUserEarnings(account, farmsToFetch)

  const arrayOfUserDataObjects = userFarmAllowances.map((farmAllowance, index) => {
    return {
      pid: farmsToFetch[index].pid,
      allowance: userFarmAllowances[index],
      tokenBalance: userFarmTokenBalances[index],
      stakedBalance: userStakedBalances[index],
      earnings: userFarmEarnings[index],
    }
  })
  dispatch(setFarmUserData({ arrayOfUserDataObjects }))
}

export default farmsSlice.reducer
