import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract } from 'web3-eth-contract'
import { ethers } from 'ethers'
import { useAppDispatch } from 'state'
import { updateUserAllowance, fetchFarmUserDataAsync, fetchPoolFarmUserDataAsync, fetchIloUserDataAsync } from 'state/actions'
import { approve } from 'utils/callHelpers'
import { getNftFarmAddress, getFlyNodeAddress } from 'utils/addressHelpers'
import { useMasterchef, usePoolFramContract, useIloMasterchef, useCake, useSousChef, useLottery, useNftTokenContract } from './useContract'

// Approve a ILO
export const useIloApprove = (lpContract: Contract) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useIloMasterchef()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract, account)
      dispatch(fetchIloUserDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [account, dispatch, lpContract, masterChefContract])

  return { onApprove: handleApprove }
}
// Approve a Farm
export const useApprove = (lpContract: Contract) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract, account)
      dispatch(fetchFarmUserDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [account, dispatch, lpContract, masterChefContract])

  return { onApprove: handleApprove }
}

// Approve a PoolFarm
export const usePoolApprove = (lpContract: Contract) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const poolChefContract = usePoolFramContract()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, poolChefContract, account)
      dispatch(fetchPoolFarmUserDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [account, dispatch, lpContract, poolChefContract])

  return { onApprove: handleApprove }
}

// Approve a Pool
export const useSousApprove = (lpContract: Contract, sousId) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const sousChefContract = useSousChef(sousId)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, sousChefContract, account)
      dispatch(updateUserAllowance(sousId, account))
      return tx
    } catch (e) {
      return false
    }
  }, [account, dispatch, lpContract, sousChefContract, sousId])

  return { onApprove: handleApprove }
}

// Approve the lottery
export const useLotteryApprove = () => {
  const { account } = useWeb3React()
  const cakeContract = useCake()
  const lotteryContract = useLottery()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(cakeContract, lotteryContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, cakeContract, lotteryContract])

  return { onApprove: handleApprove }
}

// Approve an IFO
export const useIfoApprove = (tokenContract: Contract, spenderAddress: string) => {
  const { account } = useWeb3React()
  const onApprove = useCallback(async () => {
    const tx = await tokenContract.methods.approve(spenderAddress, ethers.constants.MaxUint256).send({ from: account })
    return tx
  }, [account, spenderAddress, tokenContract])

  return onApprove
}

export const useNftApprove = () => {
  const { account } = useWeb3React()
  const nftContract = useNftTokenContract()
  const operator = getNftFarmAddress()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await nftContract.methods.setApprovalForAll(operator, true).send({ from: account })
      return tx
    } catch (e) {
      return false
    }
  }, [account, operator, nftContract])

  return { onApprove: handleApprove }
}

export const useNftApproveOne = (tokenId) => {
  const { account } = useWeb3React()
  const nftContract = useNftTokenContract()
  const operator = getNftFarmAddress()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await nftContract.methods.approve(operator, tokenId).send({ from: account })
      return tx
    } catch (e) {
      return false
    }
  }, [account, operator, nftContract, tokenId])

  return { onApproveOne: handleApprove }
}

export const useFlyNodeApprove = (tokenContract: Contract) => {
  const { account } = useWeb3React()
  const spenderAddress = getFlyNodeAddress()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await tokenContract.methods.approve(spenderAddress, ethers.constants.MaxUint256).send({ from: account })
      return tx
    } catch (e) {
      return false
    }
  }, [account, spenderAddress, tokenContract])

  return { onApprove: handleApprove }
}
