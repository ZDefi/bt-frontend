import React from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { Button, Flex, IconButton, AddIcon, MinusIcon, useModal } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useNftStakeALl } from 'hooks/useStake'
import { useNftUnstakeALl } from 'hooks/useUnstake'
import { useAppDispatch } from 'state'
// import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import { fetchWalletNfts } from 'state/collectibles'
import DepositModal from '../Modal/DepositModal'
import WithdrawModal from '../Modal/WithdrawModal'

interface FarmCardActionsProps {
  tokenName?: string
  addLiquidityUrl?: string
  stakeIds: number []
  unStakeIds: number []
}

const IconButtonWrapper = styled.div`
  display: flex;

  & > button {
    width: 76px;
    height: 38px;
  }
  
  ${({ theme }) => theme.mediaQueries.lg}  {
    flex-direction: column;
    & > button {
      width: 100px;
    }
  }
  svg {
    width: 20px;
  }
`

const StakeAction: React.FC<FarmCardActionsProps> = ({
  tokenName,
  stakeIds,
  unStakeIds,
  addLiquidityUrl,
}) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const { onStake } = useNftStakeALl()
  const { onUnstake } = useNftUnstakeALl()

  // 余额
  const tokenBalance = new BigNumber(stakeIds.length)
  // stake
  const stakedBalance = new BigNumber(unStakeIds.length)

  // const displayBalance = useCallback(() => {
  //   const stakedBalanceNumber = getBalanceNumber(stakedBalance, 1)
  //   if (stakedBalanceNumber > 0 && stakedBalanceNumber < 0.0001) {
  //     return getFullDisplayBalance(stakedBalance).toLocaleString()
  //   }
  //   return stakedBalanceNumber.toLocaleString()
  // }, [stakedBalance])

  const handleRefresh = () => {
    dispatch(fetchWalletNfts(account))
  }

  const [onPresentDeposit] = useModal(
    <DepositModal max={tokenBalance} onConfirm={onStake} refresh={handleRefresh} ids={stakeIds} tokenName={tokenName} addLiquidityUrl={addLiquidityUrl} />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={onUnstake} refresh={handleRefresh} ids={unStakeIds} tokenName={tokenName} />,
  )

  const renderStakingButtons = () => {
    return stakedBalance.eq(0) ? (
      <Button onClick={onPresentDeposit}>
        {t('Stake')}
      </Button>
    ) : (
      <IconButtonWrapper>
        <IconButton
          mb="4px"
          mr="4px"
          onClick={onPresentDeposit}
        >
          <AddIcon color="#FFFFFF" width="14px" />
        </IconButton>
        <IconButton onClick={onPresentWithdraw}>
          <MinusIcon color="#FFFFFF" width="14px" />
        </IconButton>
      </IconButtonWrapper>
    )
  }

  return (
    <Flex justifyContent="space-between" alignItems="center">
      {renderStakingButtons()}
    </Flex>
  )
}

export default StakeAction
