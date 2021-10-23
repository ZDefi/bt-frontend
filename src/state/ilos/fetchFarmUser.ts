import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import iloMasterchefABI from 'config/abi/iloMasterchef.json'
import swapFactoryABI from 'config/abi/swapFactory.json'
import multicall from 'utils/multicall'
import { getAddress, getIloMasterChefAddress, getSwapFactoryAddress } from 'utils/addressHelpers'
import { FarmConfig } from 'config/constants/types'

export const fetchFarmUserAllowances = async (account: string, farmsToFetch: FarmConfig[]) => {
  const masterChefAddress = getIloMasterChefAddress()
  const swapFactoryAddress = getSwapFactoryAddress()

  const pairCalls = farmsToFetch.map((farm) => {
    return {
      address: swapFactoryAddress,
      name: 'getPair',
      params: [getAddress(farm.token.address), getAddress(farm.quoteToken.address)],
    }
  })
  const pairs = await multicall(swapFactoryABI, pairCalls)

  const calls = farmsToFetch.map((farm, index) => {
    const lpContractAddress =
      getAddress(farm.lpAddresses) === pairs[index][0] ? getAddress(farm.lpAddresses) : getAddress(farm.quoteToken.address)
    return { address: lpContractAddress, name: 'allowance', params: [account, masterChefAddress] }
  })

  const rawLpAllowances = await multicall(erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const fetchFarmUserTokenBalances = async (account: string, farmsToFetch: FarmConfig[]) => {
  const swapFactoryAddress = getSwapFactoryAddress()
  const pairCalls = farmsToFetch.map((farm) => {
    return {
      address: swapFactoryAddress,
      name: 'getPair',
      params: [getAddress(farm.token.address), getAddress(farm.quoteToken.address)],
    }
  })
  const pairs = await multicall(swapFactoryABI, pairCalls)

  const calls = farmsToFetch.map((farm, index) => {
    const lpContractAddress =
      getAddress(farm.lpAddresses) === pairs[index][0] ? getAddress(farm.lpAddresses) : getAddress(farm.quoteToken.address)
    return {
      address: lpContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall(erc20ABI, calls)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenBalances
}

export const fetchFarmUserStakedBalances = async (account: string, farmsToFetch: FarmConfig[]) => {
  const masterChefAddress = getIloMasterChefAddress()

  const calls = farmsToFetch.map((farm) => {
    return {
      address: masterChefAddress,
      name: 'userInfo',
      params: [farm.pid, account],
    }
  })

  const rawStakedBalances = await multicall(iloMasterchefABI, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}

export const fetchFarmUserEarnings = async (account: string, farmsToFetch: FarmConfig[]) => {
  const masterChefAddress = getIloMasterChefAddress()

  const calls = farmsToFetch.map((farm) => {
    return {
      address: masterChefAddress,
      name: 'pendingBT',
      params: [farm.pid, account],
    }
  })

  const rawEarnings = await multicall(iloMasterchefABI, calls)
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}
