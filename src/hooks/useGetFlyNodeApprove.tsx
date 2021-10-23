import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { getVdrContract } from 'utils/contractHelpers'
import { getFlyNodeAddress } from 'utils/addressHelpers'
import useToast from './useToast'

const useGetFlyNodeApprove = () => {
  const [approve, setApprove] = useState('0')
  const { toastError } = useToast()
  const { account } = useWeb3React()

  useEffect(() => {
    const fetchApprove = async () => {
      try {
        const vdrContract = getVdrContract()
        const flyNodeAddress = getFlyNodeAddress()
        const a = await vdrContract.methods.allowance(account, flyNodeAddress).call()
        setApprove(a)
      } catch (error) {
        toastError('Error', 'Could not retrieve BEE apprvoe')
      }
    }
    fetchApprove()
  }, [toastError, account])

  return approve
}

export default useGetFlyNodeApprove
