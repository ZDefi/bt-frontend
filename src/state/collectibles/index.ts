/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CollectiblesState } from 'state/types'
import Nfts, { nftSources } from 'config/constants/nfts'
import { Nft, NftType } from 'config/constants/types'
import { getAddress, getNftFarmAddress } from 'utils/addressHelpers'
import { getErc721Contract, getNftFarmContract } from 'utils/contractHelpers'

// import { getNftByTokenId } from 'utils/collectibles'

const initialState: CollectiblesState = {
  isInitialized: false,
  isLoading: true,
  tokenIds: [],
  data: {},
}

// type NftSourceItem = [number, string]

// Thunks
export const fetchWalletNfts = createAsyncThunk<Nft [], string>(
  'collectibles/fetchWalletNfts',
  async (account) => {
    // For each nft source get nft data
    const nftSourcePromises = Object.keys(nftSources).map(async (nftSourceType) => {
      const { address: addressObj } = nftSources[nftSourceType as NftType]
      const nftFarmAddress =  getNftFarmAddress()
      const address = getAddress(addressObj)
      const contract = getErc721Contract(address)
      const nftFarmContract = getNftFarmContract()
      
      const getTokenIdAndData = async (type = 'token', index: number) => {
        try {
          let tokenId = 0
          if (type === 'token') {
            tokenId = await contract.methods.tokenOfOwnerByIndex(account, index).call()
          } else if (type === 'farm') {
            tokenId = await nftFarmContract.methods.tokenOfOwnerByIndex(account, index).call()
          }

          const allowanceAddress = await contract.methods.getApproved(tokenId).call()
          // const walletNft = await getNftByTokenId(address, tokenId)
          let walletNft = {...Nfts[0], tokenId}
          if (Number(tokenId) >= 28681 && Number(tokenId) <= 36405) {
            walletNft = {...Nfts[1], tokenId}
          } else if (Number(tokenId) >= 36406 && Number(tokenId) <= 45612) {
            walletNft = {...Nfts[2], tokenId}
          } else if (Number(tokenId) >= 45613 && Number(tokenId) <= 57852) {
            walletNft = {...Nfts[11], tokenId}
          } else if (Number(tokenId) >= 57853 && Number(tokenId) <= 57995) {
            walletNft = {...Nfts[16], tokenId}
          } else if (Number(tokenId) >= 57996 && Number(tokenId) <= 62031) {
            walletNft = {...Nfts[17], tokenId}
          } else if (Number(tokenId) >= 62032 && Number(tokenId) <= 62174) {
            walletNft = {...Nfts[18], tokenId}
          } else if (Number(tokenId) >= 62175 && Number(tokenId) <= 62317) {
            walletNft = {...Nfts[19], tokenId}
          } else if (Number(tokenId) >= 62318 && Number(tokenId) <= 62460) {
            walletNft = {...Nfts[22], tokenId}
          } else if (Number(tokenId) >= 62461 && Number(tokenId) <= 62603) {
            walletNft = {...Nfts[23], tokenId}
          } else if (Number(tokenId) >= 62604 && Number(tokenId) <= 62746) {
            walletNft = {...Nfts[24], tokenId}
          } else if (Number(tokenId) >= 2000001 && Number(tokenId) <= 2000125) {
            walletNft = {...Nfts[3], tokenId}
          } else if (Number(tokenId) >= 2000126 && Number(tokenId) <= 2000250) {
            walletNft = {...Nfts[4], tokenId}
          } else if (Number(tokenId) >= 2000251 && Number(tokenId) <= 2000375) {
            walletNft = {...Nfts[5], tokenId}
          } else if (Number(tokenId) >= 2000376 && Number(tokenId) <= 2000500) {
            walletNft = {...Nfts[6], tokenId}
          } else if (Number(tokenId) >= 2000501 && Number(tokenId) <= 2000625) {
            walletNft = {...Nfts[7], tokenId}
          } else if (Number(tokenId) >= 2000625 && Number(tokenId) <= 2000750) {
            walletNft = {...Nfts[8], tokenId}
          } else if (Number(tokenId) >= 2000751 && Number(tokenId) <= 2000875) {
            walletNft = {...Nfts[9], tokenId}
          } else if (Number(tokenId) >= 2000876 && Number(tokenId) <= 2001000) {
            walletNft = {...Nfts[10], tokenId}
          } else if (Number(tokenId) >= 2001001 && Number(tokenId) <= 2001156) {
            walletNft = {...Nfts[12], tokenId}
          } else if (Number(tokenId) >= 2001157 && Number(tokenId) <= 2001271) {
            walletNft = {...Nfts[13], tokenId}
          } else if (Number(tokenId) >= 2001272 && Number(tokenId) <= 2001369) {
            walletNft = {...Nfts[14], tokenId}
          } else if (Number(tokenId) >= 2001370 && Number(tokenId) <= 2001451) {
            walletNft = {...Nfts[15], tokenId}
          } else if (Number(tokenId) >= 7000001 && Number(tokenId) <= 7000150) {
            walletNft = {...Nfts[20], tokenId}
          } else if (Number(tokenId) >= 7000151 && Number(tokenId) <= 7000200) {
            walletNft = {...Nfts[21], tokenId}
          }
          
          return {...walletNft, staked: type === 'farm', allowance: allowanceAddress === nftFarmAddress}
          // return [Number(tokenId), walletNft]
        } catch (error) {
          return null
        }
      }
      
      const balanceOfResponse = await contract.methods.balanceOf(account).call()
      const farmBalanceOfResponse = await nftFarmContract.methods.balanceOf(account).call()
      const balanceOf = Number(balanceOfResponse)
      const framBalancOf = Number(farmBalanceOfResponse)

      if (balanceOf === 0 && framBalancOf === 0) {
        return []
      }

      const nftDataFetchPromises = []
      const nftStakeDataFetchPromises = []

      // For each index get the tokenId and data associated with it
      for (let i = 0; i < balanceOf; i++) {
        nftDataFetchPromises.push(getTokenIdAndData('token', i))
      }
      for (let i = 0; i < framBalancOf; i++) {
        nftStakeDataFetchPromises.push(getTokenIdAndData('farm', i))
      }

      const nftData = await Promise.all(nftDataFetchPromises)
      const nftStakeData = await Promise.all(nftStakeDataFetchPromises)
      return [...nftData, ...nftStakeData]
    })

    const nftSourceData = await Promise.all(nftSourcePromises)

    return nftSourceData.flat()
  },
)

export const collectiblesSlice = createSlice({
  name: 'collectibles',
  initialState,
  reducers: {
    // setNftUserData: (state, action) => {
    //   const { arrayOfUserDataObjects } = action.payload
      // if (arrayOfUserDataObjects.length) {
      //   arrayOfUserDataObjects.forEach((userDataEl) => {
      //     const { tokenId } = userDataEl
      //     console.log("state", state.tokenIds)
      //     const index = state.tokenIds.findIndex((d) => d.tokenId === tokenId)
      //     state.tokenIds[index] = { ...state.tokenIds[index], userData: userDataEl }
      //   })
      // }
      // state.userDataLoaded = true
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWalletNfts.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchWalletNfts.fulfilled, (state, action) => {
      state.isLoading = false
      state.isInitialized = true
      const liveToekensData = action.payload
      state.tokenIds = liveToekensData
      // if (state.tokenIds.length) {
      //   state.tokenIds = state.tokenIds.map((token) => {
      //     const liveTokenData = liveToekensData.find((f) => f.tokenId === token.tokenId)
      //     return { ...token, ...liveTokenData }
      //   })
      // } else {
      //   state.tokenIds = liveToekensData
      // }
    })
  },
})

// export const { setNftUserData  } = collectiblesSlice.actions

// export const fetchNftUserDataAsync = (account: string) => async (dispatch, getState) => {
//   const tokenIds = getState().collectibles.tokenIds
//   // const nfbs = Object.keys(nftSources).map(d => ({address: nftSources[d].address}))
//   const userNftAllowances = await fetchNftUserAllowances(tokenIds)
//   console.log("userNftAllowances", userNftAllowances)

//   const arrayOfUserDataObjects = userNftAllowances.map((farmAllowance, index) => {
//     return {
//       tokenid: tokenIds[index].tokenId,
//       allowance: userNftAllowances[index] === account,
//     }
//   })

//   dispatch(setNftUserData({ arrayOfUserDataObjects }))
// }

export default collectiblesSlice.reducer
