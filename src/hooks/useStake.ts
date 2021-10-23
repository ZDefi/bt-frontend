import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import {
  fetchFarmUserDataAsync,
  fetchPoolFarmUserDataAsync,
  fetchIloUserDataAsync,
  updateUserStakedBalance,
  updateUserBalance,
} from 'state/actions'
import { stake, stakeIlo, sousStake, sousStakeBnb, nfbStakeAll, nfbStake, stakeVdr } from 'utils/callHelpers'
import { useMasterchef, usePoolFramContract, useIloMasterchef, useSousChef, useNftFarmContract, useFlyNodeContract } from './useContract'

const useStake = (pid: number) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(masterChefContract, pid, amount, account)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefContract, pid],
  )

  return { onStake: handleStake }
}

export const usePoolStake = (pid: number) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const poolChefContract = usePoolFramContract()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(poolChefContract, pid, amount, account)
      dispatch(fetchPoolFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, poolChefContract, pid],
  )

  return { onStake: handleStake }
}
export const useStakeIlo = (pid: number) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useIloMasterchef()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stakeIlo(masterChefContract, pid, amount, account)
      dispatch(fetchIloUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefContract, pid],
  )

  return { onStake: handleStake }
}

export const useSousStake = (sousId: number, isUsingBnb = false) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()
  const sousChefContract = useSousChef(sousId)

  const handleStake = useCallback(
    async (amount: string, decimals: number) => {
      if (sousId === 0) {
        await stake(masterChefContract, 0, amount, account)
      } else if (isUsingBnb) {
        await sousStakeBnb(sousChefContract, amount, account)
      } else {
        await sousStake(sousChefContract, amount, decimals, account)
      }
      dispatch(updateUserStakedBalance(sousId, account))
      dispatch(updateUserBalance(sousId, account))
    },
    [account, dispatch, isUsingBnb, masterChefContract, sousChefContract, sousId],
  )

  return { onStake: handleStake }
}
// NFB Stake
export const useNftStakeALl = () => {
  const { account } = useWeb3React()
  const nftFarmContract = useNftFarmContract()

  const handleStake = useCallback(async (tokenIds, ids) => {
    await nfbStakeAll(nftFarmContract, account, tokenIds, ids)
  }, [account, nftFarmContract])

  return { onStake: handleStake }
}

export const useNftStake = (tokenId) => {
  const { account } = useWeb3React()
  const nftFarmContract = useNftFarmContract()

  const handleStake = useCallback(async (id) => {
    await nfbStake(nftFarmContract, account, tokenId, id)
  }, [account, nftFarmContract, tokenId])

  return { onStake: handleStake }
}

export const useStakeVdr = () => {
  const { account } = useWeb3React()
  const flyNodeContract = useFlyNodeContract()

  const handleStakeVdr = useCallback(async (amount: string) => {
    await stakeVdr(flyNodeContract, account, amount)
  }, [flyNodeContract, account])

  return { onStakeVdr: handleStakeVdr }
}

export default useStake
