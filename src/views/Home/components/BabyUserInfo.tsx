import React, { useCallback, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Button } from '@pancakeswap/uikit'
import styled from 'styled-components'
import useTokenBalance from 'hooks/useTokenBalance'
import useAllEarnings from 'hooks/useAllEarnings'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import { useTranslation } from 'contexts/Localization'
import { getBabyAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
// import { usePriceBabyBusd } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import UnlockButton from 'components/UnlockButton'
import CardValue from './CardValue'

const StyledCard = styled.div`
  // border: 1px solid #F0F4F6;
  box-sizing: border-box;
  box-shadow: 0px 3px 8px rgba(58, 126, 190, 0.09);
  padding: 25px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: rgb(39, 38, 44)!important;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 40px;
`

const Col = styled.div`
  & > span:first-child {
    color: #FF7750;
    margin-bottom: 12px;
  }
  & > span:last-child {
    color: #164989;
    font-size: 24px;
    display: flex;
    flex-direction: column;
    font-weight: 500;
    line-height: 38px;
  }
`
const RightCol = styled(Col)`
  text-align: right;
`

const Actions = styled.div`
//   margin-top: 24px;
`

const BabyUserInfo = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWeb3React()
  const { t } = useTranslation()
  // 计算账户Baby余额
  const babyBalance = useTokenBalance(getBabyAddress())
  // 计算折合USDT的价格
  // const babyPriceBusd = usePriceBabyBusd()
  // const busdBalance = new BigNumber(getBalanceNumber(babyBalance)).multipliedBy(babyPriceBusd).toNumber()
  
  const allEarnings = useAllEarnings()
  const earningsSum = allEarnings.reduce((accum, earning) => {
    const earningNumber = new BigNumber(earning)
    if (earningNumber.eq(0)) {
      return accum
    }
    return accum + earningNumber.div(DEFAULT_TOKEN_DECIMAL).toNumber()
  }, 0)
  // const earingSumIlo = allEarningsIlo.reduce((accum, earning) => {
  //   const earningNumber = new BigNumber(earning)
  //   if (earningNumber.eq(0)) {
  //     return accum
  //   }
  //   return accum + earningNumber.div(DEFAULT_TOKEN_DECIMAL).toNumber()
  // }, 0)
  const earingTotal = new BigNumber(earningsSum)

  // 计算折合USD的价格
  // const earningsBusd = new BigNumber(earningsSum).multipliedBy(babyBalance).toNumber()
  const farmsWithBalance = useFarmsWithBalance()
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)
  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward])
  return (
    <StyledCard>
      <Row>
        <Col>
          <span>{t('BEE to Harvest')}</span>
          <CardValue value={earingTotal.toNumber()} decimals={5} />
        </Col>
        <RightCol>
          <span>{t('BEE in Wallet')}</span>
          <CardValue value={getBalanceNumber(babyBalance)}/>
        </RightCol>
      </Row>
      <Actions>
          {account ? (
            <Button
                id="harvest-all"
                disabled={balancesWithValue.length <= 0 || pendingTx}
                onClick={harvestAllFarms}
                width="100%"
                >
                {pendingTx
                    ? t('Collecting BEE')
                    : `${t('Harvest Farm')} (${balancesWithValue.length})`
                }
            </Button>
          ) : (
            <UnlockButton width="100%" />
          )}
        </Actions>
    </StyledCard>
  )
}

export default BabyUserInfo
