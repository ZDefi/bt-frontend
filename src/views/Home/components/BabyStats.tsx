import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { usePriceBabyBusd, useBlock } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { STSRT_MINING_BLOCK, BABY_INIT_MINING, BABY_PER_BLOCK } from 'config'
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
  & span {
    color: #164989;
  }
`

// const TextString = styled.div`
//     color: #164989;
//     font-size: 24px;
//     font-weight: 600;
//     line-height: 1;
// `
const BabyUserInfo = () => {
  const { t } = useTranslation()
  const totalSupply = new BigNumber(50000000)
  const [circulation, setCirculation] = useState<BigNumber>(new BigNumber(0))
  const block = useBlock()

  // 计算Baby折合USDT的价格
  const babyPriceBusd = usePriceBabyBusd()
  useEffect(() => {
    const mining = new BigNumber(block.currentBlock - STSRT_MINING_BLOCK).times(BABY_PER_BLOCK).plus(BABY_INIT_MINING)
    if (mining.isGreaterThan(0)) {
      setCirculation(mining)
    }
  }, [block])
  const babyMarketBusd = new BigNumber(babyPriceBusd).multipliedBy(circulation)

  return (
    <StyledCard>
      <RowMb>
        <Col>
          <span>{t('BEE Price')}</span>
          <CardValue prefix="$" value={babyPriceBusd.toNumber()} />
        </Col>
        <RightCol>
          <span>{t('BEE Market Cap')}</span>
          <CardValue prefix="$" value={babyMarketBusd.toNumber()} decimals={0} />
        </RightCol>
      </RowMb>
      <Row>
        <Col>
          <span>{t('BEE in Circulation')}</span>
          {/* <TextString>-</TextString> */}
          <CardValue value={circulation.toNumber()} decimals={0} />
        </Col>
        <RightCol>
            <span>{t('BEE Total Supply')}</span>
            {/* <TextString>-</TextString> */}
            <CardValue value={totalSupply.toNumber()} decimals={0} />
        </RightCol>
      </Row>
    </StyledCard>
  )
}

export default BabyUserInfo
