import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import {
  fetchFarmUserDataAsync,
  fetchIloUserDataAsync,
  updateUserStakedBalance,
  updateUserBalance,
  updateUserPendingReward,
} from 'state/actions'
import { unstake, unstakeIlo, sousUnstake, sousEmergencyUnstake, nfbUnstakeAll, nfbUnstake  } from 'utils/callHelpers'
import { useMasterchef, usePoolFramContract, useIloMasterchef, useSousChef, useNftFarmContract } from './useContract'

const useUnstake = (pid: number) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefContract, pid],
  )

  return { onUnstake: handleUnstake }
}

export const usePoolUnstake = (pid: number) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const poolChefContract = usePoolFramContract()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(poolChefContract, pid, amount, account)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, poolChefContract, pid],
  )

  return { onUnstake: handleUnstake }
}

export const useUnstakeIlo = (pid: number) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useIloMasterchef()

  const handleUnstake = useCallback(async () => {
    const txHash = await unstakeIlo(masterChefContract, pid, account)
    dispatch(fetchIloUserDataAsync(account))
    console.info(txHash)
  }, [account, dispatch, masterChefContract, pid])

  return { onUnstake: handleUnstake }
}

export const useSousUnstake = (sousId, enableEmergencyWithdraw = false) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()
  const sousChefContract = useSousChef(sousId)

  const handleUnstake = useCallback(
    async (amount: string, decimals: number) => {
      if (sousId === 0) {
        const txHash = await unstake(masterChefContract, 0, amount, account)
        console.info(txHash)
      } else if (enableEmergencyWithdraw) {
        const txHash = await sousEmergencyUnstake(sousChefContract, account)
        console.info(txHash)
      } else {
        const txHash = await sousUnstake(sousChefContract, amount, decimals, account)
        console.info(txHash)
      }
      dispatch(updateUserStakedBalance(sousId, account))
      dispatch(updateUserBalance(sousId, account))
      dispatch(updateUserPendingReward(sousId, account))
    },
    [account, dispatch, enableEmergencyWithdraw, masterChefContract, sousChefContract, sousId],
  )

  return { onUnstake: handleUnstake }
}

// NFB unStake
export const useNftUnstakeALl = () => {
  const { account } = useWeb3React()
  const nftFarmContract = useNftFarmContract()

  const handleStake = useCallback(async (tokenIds) => {
    await nfbUnstakeAll(nftFarmContract, account, tokenIds)
  }, [account, nftFarmContract])

  return { onUnstake: handleStake }
}

export const useNftUnstake = (tokenId) => {
  const { account } = useWeb3React()
  const nftFarmContract = useNftFarmContract()

  const handleStake = useCallback(async () => {
    await nfbUnstake(nftFarmContract, account, tokenId)
  }, [account, nftFarmContract, tokenId])

  return { onUnstake: handleStake }
}


export default useUnstake
