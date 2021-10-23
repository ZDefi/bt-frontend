import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import {
  fetchFarmUserDataAsync,
  fetchIloUserDataAsync,
  updateUserBalance,
  updateUserPendingReward,
} from 'state/actions'
import { soushHarvest, soushHarvestBnb, harvest, harvestIlo, nfbClaim } from 'utils/callHelpers'
import { useMasterchef, usePoolFramContract, useIloMasterchef, useSousChef, useNftFarmContract } from './useContract'

export const useHarvestIlo = (farmPid: number) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useIloMasterchef()

  const handleHarvest = useCallback(async () => {
    const txHash = await harvestIlo(masterChefContract, farmPid, account)
    dispatch(fetchIloUserDataAsync(account))
    return txHash
  }, [account, dispatch, farmPid, masterChefContract])

  return { onReward: handleHarvest }
}

export const useHarvest = (farmPid: number) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    const txHash = await harvest(masterChefContract, farmPid, account)
    dispatch(fetchFarmUserDataAsync(account))
    return txHash
  }, [account, dispatch, farmPid, masterChefContract])

  return { onReward: handleHarvest }
}

export const usePoolHarvest = (farmPid: number) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const poolChefContract = usePoolFramContract()

  const handleHarvest = useCallback(async () => {
    const txHash = await harvest(poolChefContract, farmPid, account)
    dispatch(fetchFarmUserDataAsync(account))
    return txHash
  }, [account, dispatch, farmPid, poolChefContract])

  return { onReward: handleHarvest }
}

export const useAllHarvest = (farmPids: number[]) => {
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    const harvestPromises = farmPids.reduce((accum, pid) => {
      return [...accum, harvest(masterChefContract, pid, account)]
    }, [])

    return Promise.all(harvestPromises)
  }, [account, farmPids, masterChefContract])

  return { onReward: handleHarvest }
}

export const useSousHarvest = (sousId, isUsingBnb = false) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const sousChefContract = useSousChef(sousId)
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    if (sousId === 0) {
      await harvest(masterChefContract, 0, account)
    } else if (isUsingBnb) {
      await soushHarvestBnb(sousChefContract, account)
    } else {
      await soushHarvest(sousChefContract, account)
    }
    dispatch(updateUserPendingReward(sousId, account))
    dispatch(updateUserBalance(sousId, account))
  }, [account, dispatch, isUsingBnb, masterChefContract, sousChefContract, sousId])

  return { onReward: handleHarvest }
}

export const useNftHarvest = () => {
  // const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const nftFarmContract = useNftFarmContract()

  const handleHarvest = useCallback(async () => {
    await nfbClaim(nftFarmContract, account)
    // dispatch(updateUserPendingReward(sousId, account))
    // dispatch(updateUserBalance(sousId, account))
  }, [account, nftFarmContract])

  return { onClaim: handleHarvest }
}
