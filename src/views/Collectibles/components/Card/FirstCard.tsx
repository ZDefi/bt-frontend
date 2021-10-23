import React, { useMemo } from 'react'
// import { useWeb3React } from '@web3-react/core'
import { Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
// import { useAllHarvest } from 'hooks/useHarvest'
// import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
// import { getBabyAddress } from 'utils/addressHelpers'
import { usePriceBabyBusd } from 'state/hooks'
// import { usePriceBabyBusd } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import Balance from 'components/Balance'
import getBabyOfNftTokenIds from 'utils/getNfbBabyOfTokens'
import { Nft } from 'config/constants/types'
import CardValue from './CardValue'

const StyledCard = styled.div`
  box-sizing: border-box;
  box-shadow: 0px 3px 8px rgba(58, 126, 190, 0.09);
  padding: 25px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  height: 100%;
`

const Col = styled.div`
  width: 100%;
  height: 100%;
  & > span:first-child {
    color: #FF7750;
    margin-bottom: 8px;
  }
`
const LeftCol = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: start;
`

interface Props {
  tokenIds: Nft[]
}


const FirstCard: React.FC<Props> = ({ tokenIds }) => {
  const babyPrice = usePriceBabyBusd()
  const owned = useMemo(() => {
    return tokenIds.length
  }, [tokenIds])

  const ownedBaby = useMemo(() => {
    const price = getBabyOfNftTokenIds(tokenIds)
    return price
  }, [tokenIds])

  const ownedPriceBusd = useMemo(() => {
    return ownedBaby ? new BigNumber(ownedBaby).multipliedBy(babyPrice).toNumber() : 0
  }, [ownedBaby, babyPrice])

  const hasEarnings = ownedPriceBusd > 0

  return (
    <StyledCard>
      <Row>
        <LeftCol>
          <Text color="#FF7750" fontSize="14px">NFB Owned</Text>
          <CardValue value={owned} decimals={0} />
        </LeftCol>
        <LeftCol>
        <Text color="#FF7750" fontSize="14px">Value of BEE</Text>
          <CardValue value={ownedBaby} decimals={0}/>
          <Text fontSize="12px" color={hasEarnings ? 'textSubtle' : 'textDisabled'}>
            ~
            {hasEarnings ? (
              <Balance
                display="inline"
                fontSize="12px"
                color="textSubtle"
                decimals={2}
                value={ownedPriceBusd}
                unit=" USD"
              />
            ) : (
              '0 USD'
            )}
          </Text>
        </LeftCol>
      </Row>
    </StyledCard>
  )
}

export default FirstCard
