import React, { useCallback, useState, useMemo, useEffect } from 'react'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@web3-react/core'
import { BigNumber } from 'bignumber.js'
import { useStakeVdr } from 'hooks/useStake'
import { useERC20 } from 'hooks/useContract'
import { useFlyNodeApprove } from 'hooks/useApprove'
// import useToast from 'hooks/useToast'
// import useGetFlyNodeApprove from 'hooks/useGetFlyNodeApprove'
import { getVdrContract } from 'utils/contractHelpers'
import { getFlyNodeAddress, getAddress } from 'utils/addressHelpers'
import tokens from 'config/constants/tokens'
// import styled from 'styled-components'
import { Flex, Box, Text, Button, useModal } from '@pancakeswap/uikit'
import UnlockButton from 'components/UnlockButton'
import DepositModal from '../DepsitModal'

interface InfoData {
  bee: number,
  points: number,
  rward: number
}
interface PersionProps {
  info: InfoData
}

const PersionCard: React.FC<PersionProps> = ({ info }) => {
  const { t } = useTranslation()
  const [approve, setApprove] = useState('0')
  const [balance, setBalance] = useState('0')
  const [stake, setStake] = useState(false)
  const [requestedApproval, setRequestedApproval] = useState(false)

  const { onStakeVdr } = useStakeVdr()
  const tokenContaract = useERC20(getAddress(tokens.bee.address))
  const { onApprove } = useFlyNodeApprove(tokenContaract)
  // const { toastError } = useToast()
  const { account } = useWeb3React()
  
  
  // fetch account apprvoe
  useEffect(() => {
    const fetchApprove = async () => {
      if (account) {
        try {
          const flyNodeAddress = getFlyNodeAddress()
          const vdrContract = getVdrContract()
          const a = await vdrContract.methods.allowance(account, flyNodeAddress).call()
          setApprove(a)
        } catch (error) {
          console.error(error)
        }
      }
    }
    fetchApprove()
  }, [account, requestedApproval])

  // fetch account balance
 
  useEffect(() => {
    const fetchBalance = async () => {
      if (account) {
        try {
          const vdrContract = getVdrContract()
          const b = await vdrContract.methods.balanceOf(account).call()
          setBalance(b)
        } catch (error) {
          console.error(error)
        }
      }
    }
    fetchBalance()
  }, [account, stake])

  const tokenBalance = useMemo(() => {
    return new BigNumber(balance)
  }, [balance])

  const isApprove = useMemo(() => {
    return new BigNumber(approve).gt(0)
  }, [approve])

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove])

  const handleUpdate = () => {
    setStake(!stake)
  }

  const [onPresentDeposit] = useModal(
    <DepositModal max={tokenBalance} onConfirm={onStakeVdr} onUpdate={handleUpdate} tokenName="BEE" />,
  )

  const renderApprovalOrStakeButton = () => {
    return isApprove ? <Button width="188px" height="41px" onClick={onPresentDeposit}>{t("Buy node")}</Button> :
    <Button width="188px" height="41px" onClick={handleApprove}>{t("Approve")}</Button>
  }
  return (
    <Box pl="30px" pt="26px" pr="30px" pb="27px">
      <Flex justifyContent="space-between" >
        <div>
          <Box mb="14px">
            <Text color="#FF7750" fontSize="15px" fontWeight="500">{t("Node point")}</Text>
          </Box>
          <Box mb="26px">
            <Text color="#FFFFFF" fontSize="15px" fontWeight="500">{+info.points + (info.bee)}</Text>
          </Box>
        </div>
        <div>
          <Box mb="14px">
            <Text color="#FF7750" fontSize="15px" fontWeight="500">{t("My profit")}</Text>
          </Box>
          <Box mb="26px">
            <Text color="#FFFFFF" fontSize="15px" fontWeight="500" textAlign="right">{info.rward}</Text>
          </Box>
        </div>
        {/* <div>
          <Box mb="14px">
            <Text color="#FF7750" fontSize="15px" fontWeight="500">{t("My purchase")}</Text>
          </Box>
          <Box mb="26px">
            <Text color="#FFFFFF" fontSize="15px" fontWeight="500" textAlign="right">{info.bee}</Text>
          </Box>
        </div> */}
      </Flex>
      <Flex justifyContent="space-between" >
        <div>
          <Box mb="14px">
            <Text color="#FF7750" fontSize="15px" fontWeight="500">{t("Contribution")}</Text>
          </Box>
          <Box mb="26px">
            <Text color="#FFFFFF" fontSize="15px" fontWeight="500">{info.points}</Text>
          </Box>
        </div>
        {/* <div>
          <Box mb="14px">
            <Text color="#FF7750" fontSize="15px" fontWeight="500">{t("My profit")}</Text>
          </Box>
          <Box mb="26px">
            <Text color="#FFFFFF" fontSize="15px" fontWeight="500" textAlign="right">{info.rward}</Text>
          </Box>
        </div> */}
      </Flex>
      <Flex justifyContent="center">
        {!account && <UnlockButton mt="8px" width="100%" />}
        {/* {!account ? <UnlockButton mt="8px" width="100%" /> : renderApprovalOrStakeButton() } */}
      </Flex>
    </Box>
  )
}

export default PersionCard
