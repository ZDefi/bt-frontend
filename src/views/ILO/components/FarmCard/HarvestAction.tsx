import React, { useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useUnstakeIlo } from 'hooks/useUnstake'
import { getBalanceNumber } from 'utils/formatBalance'
import { useWeb3React } from '@web3-react/core'
import { usePriceBabyBusd, useBlock } from 'state/hooks'
import CardBusdValue from '../../../Home/components/CardBusdValue'

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
  startBlock?: string
  endBlock?: string
}

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid, startBlock, endBlock }) => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const [pendingTx, setPendingTx] = useState(false)
  const [harvest, setHarvest] = useState(false)
  const { onUnstake } = useUnstakeIlo(pid)
  const babyPrice = usePriceBabyBusd()
  const { currentBlock } = useBlock()

  useEffect(() => {
    const h = currentBlock ? currentBlock > Number(endBlock) : false
    setHarvest(h)
  }, [currentBlock, startBlock, endBlock])

  const rawEarningsBalance = account ? getBalanceNumber(earnings) : 0
  const displayBalance = rawEarningsBalance.toLocaleString()
  const earningsBusd = rawEarningsBalance ? new BigNumber(rawEarningsBalance).multipliedBy(babyPrice).toNumber() : 0

  return (
    <Flex mb="8px" justifyContent="space-between" alignItems="center">
      <Heading color={rawEarningsBalance === 0 ? 'textDisabled' : 'text'}>
        {displayBalance}
        {earningsBusd > 0 && <CardBusdValue value={earningsBusd} />}
      </Heading>
      <Button
        disabled={rawEarningsBalance === 0 || pendingTx || !harvest}
        onClick={async () => {
          setPendingTx(true)
          await onUnstake()
          setPendingTx(false)
        }}
      >
        {t('Harvest')}
      </Button>
    </Flex>
  )
}

export default HarvestAction
