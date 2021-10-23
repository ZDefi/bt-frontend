import React from 'react'
import { Button } from '@pancakeswap/uikit'
import styled from 'styled-components'
import CardValue from './CardValue'

const StyledCard = styled.div`
  // border: 1px solid #F0F4F6;
  box-sizing: border-box;
  box-shadow: 0px 3px 8px rgba(58, 126, 190, 0.09);
  padding: 25px;
  border-radius: 30px;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 30px;
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
// const Item = styled.div`
//   display: flex;
// `

const RightCol = styled(Col)`
  text-align: right;
`

interface CardInfoProps {
  button?: boolean
  title1?: string
  title2?: string
  title3?: string
  title4?: string
  value1?: string
  value2?: number
  value3?: string
  value4?: string
}

const CardInfo: React.FC<CardInfoProps> = ({
  button,
  title1,
  title2,
  title3,
  title4,
  value1,
  value2,
  value3,
  value4,
}) => {
  return (
    <StyledCard>
      <Row>
        <Col>
          <span>{title1}</span>
          <span>{value1}</span>
          
        </Col>
        <RightCol>
          <span>{title2}</span>
          {/* <span>{value2}</span> */}
          <CardValue value={value2} decimals={0} />
        </RightCol>
      </Row>
      {button ? (
        <Button disabled width="100%">Harvest all </Button>
      ) : (
        <Row>
          <Col>
            <span>{title3}</span>
            <span>{value3}</span>
          </Col>
          <RightCol>
            <span>{title4}</span>
            <span>{value4}</span>
          </RightCol>
        </Row>
      )}
    </StyledCard>
  )
}

export default CardInfo
