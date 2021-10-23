import React from 'react'
import { Image } from '@pancakeswap/uikit'
import styled from 'styled-components'

const StyleLink = styled.a`
  flex: 1 0 0;
  cursor: pointer;
`

const StyledCard = styled.div`
  // border: 1px solid #F0F4F6;
  width: 100%;
  box-sizing: border-box;
  /* box-shadow: 0px 3px 8px rgba(58, 126, 190, 0.09); */
  padding: 25px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgb(39, 38, 44);
  & > span {
    color: #FF7750;
    font-size: 18px;
    line-height: 29px;
    font-weight: 400;
  }
  &:hover {
    transform: scale(1.01);
  }
`

const StyledImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  // margin-top: 58px;
`

interface CardInfoProps {
  icon?: string
  name?: string
  href?: string
}

const CardImg: React.FC<CardInfoProps> = ({ icon, name, href }) => {
  return (
    <StyleLink href={href} target="_blank"  >
      <StyledCard>
        <StyledImage src={`/images/${icon}.png`} width={200} height={103} />
        <span>{name}</span>
      </StyledCard>
    </StyleLink>
  )
}

export default CardImg
