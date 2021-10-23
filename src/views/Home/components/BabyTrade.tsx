import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGetGlobal, getTradingVolume } from 'hooks/api'
import { useTranslation } from 'contexts/Localization'
// import useRefresh from 'hooks/useRefresh'
// import { usePriceBabyBusd } from 'state/hooks'
// import { BigNumber } from 'bignumber.js'
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
`

const RowMb = styled.div`
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

const TextString = styled.div`
    color: #FF7750;
    font-size: 24px;
    font-weight: 400;
    line-height: 1;
`

const BabyUserInfo = () => {
  const [dailyVolumeUSD, setDdailyVolumeUSD] = useState<any>()
  const [totalLiquidityUSD, pairs] = useGetGlobal()
  const { t } = useTranslation()
  // const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchData = async () => {
      const tv = await getTradingVolume()
      setDdailyVolumeUSD(tv.oneDayVolumeUSD)
    }
    fetchData()
  }, [])

  return (
    <StyledCard>
      <RowMb>
        <Col>
          <span>{t('24h Trading Volume')}</span>
          {/* <TextString>TBU</TextString> */}
          {/* <CardValue prefix="$" value={dailyVolumeUSD || 0}/> */}
          <CardValue prefix="$" value={0} />
        </Col>
        <RightCol>
          <span>{t('Coins')}</span>
          <TextString>50</TextString>
        </RightCol>
      </RowMb>
      <Row>
        <Col>
          <span>{t('Total Value Locked (TVL)')}</span>
          {/* <TextString>TBU</TextString> */}
          {/* <CardValue prefix="$" value={totalLiquidityUSD || 0}/> */}
          <CardValue prefix="$" value={0} />
        </Col>
        <RightCol>
          <span>{t('Pairs')}</span>
          {/* <TextString>{pairs}</TextString> */}
          <TextString>{15}</TextString>
        </RightCol>
      </Row>
    </StyledCard>
  )
}

export default BabyUserInfo
