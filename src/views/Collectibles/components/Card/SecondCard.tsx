import React, { useMemo, useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { usePriceBabyBusd, usePoolFromPid } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import getBabyOfNftTokenIds from 'utils/getNfbBabyOfTokens'
import { useTranslation } from 'contexts/Localization'
import { Button, Flex, Text} from '@pancakeswap/uikit'
import { useNftApprove } from 'hooks/useApprove'
import { Nft } from 'config/constants/types'
import UnlockButton from 'components/UnlockButton'
import Balance from 'components/Balance'
import CardValue from './CardValue'
import StakeAction from './StakeAction'
import ApyRow from './ApyRow'

const StyledCard = styled.div`
  box-sizing: border-box;
  box-shadow: 0px 3px 8px rgba(58, 126, 190, 0.09);
  padding: 25px;
  border-radius: 30px;
  display: flex;
  flex-wrap: wrap;
  & > div {
    flex: 0 0 50%;
    flex-wrap: wrap;
  }

  & > div:nth-child(1) {
    margin-bottom: 12px;
  }
  & > div:nth-child(2) {
    margin-bottom: 12px;
  }

  // ${({ theme }) => theme.mediaQueries.sm}  {
  //   & > div {
  //     flex: 0 0 50%;
  //     flex-wrap: wrap;
  //   }
  // }

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-wrap: nowrap;
    & > div:nth-child(1) {
      flex: 0 0 20%;
    }
    & > div:nth-child(2) {
      flex: 0 0 30%;
    }
    & > div:nth-child(3) {
      flex: 0 0 30%;
    }
    & > div:nth-child(4) {
      flex: 0 0 20%;
    }
  }

`

const Col = styled.div`
  width: 100%;
  height: 100%;
  & > span:first-child {
    color: #FF7750;
    margin-bottom: 8px;
  }
`

const FlexCol = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
`

interface CardActionsProps {
  account?: string
  amount?: string
  tokenIds: Nft[]
  isApproved: boolean
  refresh?: () => void
}
const SecondCard: React.FC<CardActionsProps> = ({ account, tokenIds, isApproved, refresh }) => {
  const { t } = useTranslation()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const [approve, setApprove] = useState(isApproved)
  const { onApprove } = useNftApprove()
  const pool = usePoolFromPid(0)


  useEffect(() => {
    setApprove(isApproved)
  }, [isApproved])
  
  // const isStake = useMemo(() => {
  //   return isApproved && approve
  // }, [isApproved, approve])
 
  // const block = useBlock()
  // 计算Baby折合USDT的价格
  const babyPriceBusd = usePriceBabyBusd()
  const stakingTokenPrice = Number(babyPriceBusd)
  
  const stakeIds = useMemo(() => {
    return tokenIds.filter(f => !f.staked).map(d => Number(d.tokenId))
  }, [tokenIds])
  const unStakeIds = useMemo(() => {
    return tokenIds.filter(f => f.staked).map(d => Number(d.tokenId))
  }, [tokenIds])

  const stakedBaby = useMemo(() => {
    const price = getBabyOfNftTokenIds(tokenIds.filter(f => f.staked))
    return price
  }, [tokenIds])

  // const stakedBaby = useMemo(() => {
  //   if (tokenIds && tokenIds.length) {
  //     return getBabyOfNftTokenIds(tokenIds.filter(f => f.staked)))
  //   }
  //   return 0
  // }, [tokenIds])

  const babyValueBusd = useMemo(() => {
    return stakedBaby ? new BigNumber(stakedBaby).multipliedBy(babyPriceBusd).toNumber() : 0
  }, [stakedBaby, babyPriceBusd])

  const tokenName = "NFB"

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      refresh()
      setApprove(true)
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, refresh])

  const renderApprovalOrStakeButton = () => {
    const getNFB = "https://treasureland.market/assets?contract=0x9f0225d5c92b9cee4024f6406c4f13e546fd91a8"
    return approve ? (
      <StakeAction
        stakeIds={stakeIds}
        unStakeIds={unStakeIds}
        tokenName={tokenName}
        addLiquidityUrl={getNFB}
      />
    ) : (
      <Button mt="8px" width="100%" disabled={requestedApproval} onClick={handleApprove}>
        {t('Approve')}
      </Button>
    )
  }

  const hasEarnings = babyValueBusd > 0

  return (
    <StyledCard>
      <FlexCol>
        <Text color="#FF7750" fontSize="14px">APR</Text>
        <ApyRow pool={pool} stakingTokenPrice={stakingTokenPrice} />
        {/* {apy ?  <ApyButton /> : <Skeleton height={24} width={80} />} */}
        {/* <CardValue prefix="$" value={babyPriceBusd.toNumber()} /> */}
      </FlexCol>
      <FlexCol>
      <Text color="#FF7750" fontSize="14px">NFB Staked</Text>
        <CardValue value={unStakeIds.length} decimals={0} />
      </FlexCol>
      <FlexCol>
        <Text color="#FF7750" fontSize="14px">Value of BEE</Text>
        <CardValue value={Number(stakedBaby)} decimals={0} />
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
      </FlexCol>
      <Flex>{!account ? <UnlockButton mt="8px" width="100%" /> : renderApprovalOrStakeButton()}</Flex>
    </StyledCard>
  )
}

export default SecondCard
