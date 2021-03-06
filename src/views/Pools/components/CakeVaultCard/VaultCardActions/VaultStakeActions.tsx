import React from 'react'
import { Flex, Button, useModal, Skeleton } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { Pool } from 'state/types'
// import NotEnoughTokensModal from '../../PoolCard/Modals/NotEnoughTokensModal'
import VaultStakeModal from '../VaultStakeModal'
import HasSharesActions from './HasSharesActions'

interface VaultStakeActionsProps {
  pool: Pool
  stakingTokenBalance: BigNumber
  stakingTokenPrice: number
  accountHasSharesStaked: boolean
  isLoading?: boolean
}

const VaultStakeActions: React.FC<VaultStakeActionsProps> = ({
  pool,
  stakingTokenBalance,
  stakingTokenPrice,
  accountHasSharesStaked,
  isLoading = false,
}) => {
  const { stakingToken } = pool
  const { t } = useTranslation()
  // const [onPresentTokenRequired] = useModal(<NotEnoughTokensModal tokenSymbol={stakingToken.symbol} />)
  const [onPresentStake] = useModal(
    <VaultStakeModal stakingMax={stakingTokenBalance} stakingTokenPrice={stakingTokenPrice} pool={pool} />,
  )

  const renderStakeAction = () => {
    return accountHasSharesStaked ? (
      <HasSharesActions pool={pool} stakingTokenBalance={stakingTokenBalance} stakingTokenPrice={stakingTokenPrice} />
    ) : (
      // <Button onClick={stakingTokenBalance.gt(0) ? onPresentStake : onPresentTokenRequired}>{t('Stake')}</Button>
      <Button onClick={onPresentStake}>{t('Stake')}</Button>
    )
  }

  return <Flex flexDirection="column">{isLoading ? <Skeleton width="100%" height="52px" /> : renderStakeAction()}</Flex>
}

export default VaultStakeActions
