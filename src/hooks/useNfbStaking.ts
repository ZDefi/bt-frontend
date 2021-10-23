import { useCallback, useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useNftFarmContract, useNftTokenContract } from 'hooks/useContract'
import { getNftFarmAddress } from 'utils/addressHelpers'

const useNfbUserInfo = (tokenIds) => {
  const [userInfo, setUserInfo] = useState({amount: '0', pending: '0',  debt: '0'})
  const { account } = useWeb3React()
  const nfbFramContract = useNftFarmContract()

  const feechUserInfo = useCallback(async () => {
    const result = await nfbFramContract.methods.userInfo(account).call()
    setUserInfo(result)
  }, [account, nfbFramContract])

  useEffect(() => {
    if (account) {
      feechUserInfo()
    }
  }, [account, feechUserInfo, tokenIds])

  return userInfo
}

// 是否全部授权
export const useIsApporveAll = () => {
  const [approve, setApprove] = useState()
  const { account } = useWeb3React()
  const nftFarmAddress = getNftFarmAddress()
  const nftTokenContract = useNftTokenContract()
  const feechApprove = useCallback(async () => {
    const result = await nftTokenContract.methods.isApprovedForAll(account, nftFarmAddress).call()
    setApprove(result)
  }, [account, nftTokenContract, nftFarmAddress])

  useEffect(() => {
    if (account) {
      feechApprove()
    }
  }, [account, feechApprove])

  return approve
}
// Nfb 收益
export const usePending = (tokenIds) => {
  const [pending, setPending] = useState()
  const { account } = useWeb3React()
  const nftFarmContract = useNftFarmContract()
  const feechPending = useCallback(async () => {
    const result = await nftFarmContract.methods.pending(account).call()
    setPending(result)
  }, [account, nftFarmContract])

  useEffect(() => {
    if (account) {
      feechPending()
    }
  }, [account, feechPending, tokenIds])

  return pending
}

export default useNfbUserInfo
