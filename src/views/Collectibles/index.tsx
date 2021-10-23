import React, { useState } from 'react'
import { useAppDispatch } from 'state'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { Heading, Text, ButtonMenu, ButtonMenuItem } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useGetCollectibles } from 'state/hooks'
import { fetchWalletNfts } from 'state/collectibles'
import { usePending, useIsApporveAll } from 'hooks/useNfbStaking'
import Page from 'components/layout/Page'
import PageHeader from 'components/PageHeader'
import FirstCard from './components/Card/FirstCard'
import SecondCard from './components/Card/SecondCard'
import ThirdCard from './components/Card/ThirdCard'
import SearchInput from './components/SearchInput'
import NftList from './components/NftList'

const StylePageHeader = styled(PageHeader)`
  background: linear-gradient(180deg, #FAD9E0 0%, #DDE8FF 100%);
`

const FilterContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 8px 0px;
  align-items: flex-start
  margin-top: 10px;
  flex-direction: column;

  & > div:nth-child(1) {
    margin-bottom: 12px;
    flex-wrap: wrap;
  }

  // ${({ theme }) => theme.mediaQueries.sm} {
  //   width: auto;
  //   padding: 0;
  // }

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
    padding: 0;

    & > div:nth-child(1) {
      margin-bottom: 0;
      flex-wrap: nowrap;
    }
  }
`

const LabelWrapper = styled.div`
  > ${Text} {
    font-size: 12px;
  }
`
const StyleHeading = styled(Heading)`
  text-shadow: 0px 4px 0px #ffffff;
  color: #CF6783;
`
const StyleHeadingFamily = styled(Heading)`
  font-size: 18px;
  line-height: 22px;
  color: #CF6783;
`

const StylePage = styled(Page)`
  position: relative;
`

const StyleRow = styled.div`
  display: flex;
  flex-direction: column;

  & > div:nth-child(1) {
    flex: 0 0 calc(25% - 10px)
  }
  & > div:nth-child(2) {
    flex: 0 0 calc(50% - 10px)
  }
  & > div:nth-child(3) {
    flex: 0 0 calc(25% - 10px)
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    justify-content: space-between;
  }
`

const Collectibles = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { tokenIds = [] } = useGetCollectibles()
  const { account } = useWeb3React()
  const [query, setQuery] = useState('')
  const [activec, setActive] = useState(0)
  const [category, setCategory] = useState('Owned')
  const [detail] = useState(false)
  const pending = usePending(tokenIds)
  const isApproved =  useIsApporveAll()

  const handleRefresh = () => {
    dispatch(fetchWalletNfts(account))
  }

  const handleClick = (newIndex) => {
    if (newIndex === 0) {
      setCategory("Owned")
    } else if (newIndex === 1) {
      setCategory("Mates")
    } else if (newIndex === 2) {
      setCategory("Friends")
    } else if (newIndex === 3) {
      setCategory("Family")
    } else if (newIndex === 4) {
      setCategory("Memories")
    } else if (newIndex === 5) {
      setCategory("Baby Squad")
    }
    setActive(newIndex)
  }

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }
  
  return (
    <>
      <StylePageHeader>
        <StyleHeading as="h1" scale="xl" color="textSubtle" mb="20px">
          {t('My NFB')}
        </StyleHeading>
        <StyleHeadingFamily scale="lg" color="textSubtle">
          {t('Your limited edition Non-fungible BABY is here!')}
        </StyleHeadingFamily>
      </StylePageHeader>
      <StylePage>
        <StyleRow>
          <FirstCard tokenIds={tokenIds} />
          <SecondCard tokenIds={tokenIds} refresh={handleRefresh} account={account} isApproved={isApproved} />
          <ThirdCard pending={pending} refresh={handleRefresh} />
        </StyleRow>
        <FilterContainer>
          <ButtonMenu activeIndex={activec} onItemClick={handleClick} scale="sm" variant="subtle">
            <ButtonMenuItem>Owned</ButtonMenuItem>
            <ButtonMenuItem>Mates</ButtonMenuItem>
            <ButtonMenuItem>Friends</ButtonMenuItem>
            <ButtonMenuItem>Family</ButtonMenuItem>
            <ButtonMenuItem>Memories</ButtonMenuItem>
            <ButtonMenuItem>Baby Squad</ButtonMenuItem>
          </ButtonMenu>
          <LabelWrapper >
            <SearchInput onChange={handleChangeQuery} />
          </LabelWrapper>
        </FilterContainer>
        <NftList isDetail={detail} tokenIds={tokenIds} query={query} category={category} isApproved={isApproved} refresh={handleRefresh} />
    </StylePage>
    </>
    
  )
}

export default Collectibles
