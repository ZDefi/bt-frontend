import React from 'react'
import styled from 'styled-components'
import {Text} from '@pancakeswap/uikit'

const StyledCard = styled.div`
  border-radius: 15px;
  background: #27262c;
  overflow: hidden;
`

const CardTitle = styled.div`
  height: 53px;
  text-align: center;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #FF7750;
  background: #27262c;
  // border-bottom: 1px solid #FF7750;
`

interface InviProps {
  title: string,
  children: any
}

const InviCard: React.FC<InviProps> = ({ title, children}) => {

  return (
    <StyledCard>
      <CardTitle>
        <Text fontSize="17px" color="#FF7750" lineHeight="53px">{title}</Text>
      </CardTitle>
      {children}
    </StyledCard>
  )
}

export default InviCard
