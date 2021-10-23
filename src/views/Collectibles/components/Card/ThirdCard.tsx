import React, { useMemo, useCallback, useState } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { usePriceBabyBusd } from 'state/hooks'
import { Button, Text, Flex } from '@pancakeswap/uikit'
import { useNftHarvest } from 'hooks/useHarvest'
import { getFullDisplayBalance } from 'utils/formatBalance'
import Balance from 'components/Balance'
import CardValue from './CardValue'

const StyledCard = styled.div`
  // border: 1px solid #F0F4F6;
  box-sizing: border-box;
  box-shadow: 0px 3px 8px rgba(58, 126, 190, 0.09);
  padding: 25px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const RowMb = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  height: 100%;
`

interface CardActionsProps {
  pending: string
  refresh: () => void
}

const ThirdCard: React.FC<CardActionsProps> = ({ pending, refresh }) => {
  const babyPriceBusd = usePriceBabyBusd()
  const [requestedCalim, setRequestedCalim] = useState(false)
  const { onClaim } = useNftHarvest()

  const handleClaim = useCallback(async () => {
    try {
      setRequestedCalim(true)
      await onClaim()
      refresh()
      setRequestedCalim(false)
    } catch (e) {
      setRequestedCalim(false)
      console.error(e)
    }
  }, [onClaim, refresh])
  const earn = useMemo(() => {
    return getFullDisplayBalance(new BigNumber(pending))
  }, [pending])
  const babyValueBusd = useMemo(() => {
    return earn ? new BigNumber(earn).multipliedBy(babyPriceBusd).toNumber() : 0
  }, [babyPriceBusd, earn])
  const hasEarnings = babyValueBusd > 0

  return (
    <StyledCard>
      <RowMb>
        <Flex flexDirection="column" justifyContent="flex-start" height="100%">
          <Text color="#FF7750" fontSize="14px">BEE Earned</Text>
          {Number(earn) > 0 ? <CardValue value={Number(earn)} decimals={3} /> : <Text bold color="#164989" fontSize="24px">0.000</Text> }
          <Text fontSize="12px" color={hasEarnings ? 'textSubtle' : 'textDisabled'}>
            ~
            {hasEarnings ? (
              <Balance
                display="inline"
                fontSize="12px"
                color="textSubtle"
                decimals={2}
                value={babyValueBusd}
                unit=" USD"
              />
            ) : (
              '0 USD'
            )}
          </Text>
        </Flex>
        <Flex>
          <Button disabled={Number(earn) <= 0 || requestedCalim} onClick={handleClaim}>Collect</Button>
        </Flex>
      </RowMb>
    </StyledCard>
  )
}

export default ThirdCard
