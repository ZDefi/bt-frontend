import React, { useEffect, useState, useMemo } from 'react'
import orderBy from 'lodash/orderBy'
import { Image } from '@pancakeswap/uikit'
import styled from 'styled-components'
// import nfts from 'config/constants/nfts'
import { Nft } from 'config/constants/types'
import Nfts from 'config/constants/nfts'
import NftCard from './NftCard'
import NftGrid from './NftGrid'
// import BunnySpecialCard from './NftCard/BunnySpecialCard'
// import EasterNftCard from './NftCard/EasterNftCard'

const StyledImage = styled(Image)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 140px;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: 4px;
  }
`
interface NFTListProps {
  query?: string,
  tokenIds: Nft[]
  isApproved: boolean
  category: string
  refresh: () => void
  onDetail?: (index: string) => void
  isDetail?: boolean
}

const NftList:React.FC<NFTListProps> = ({ query, category, tokenIds, isApproved, isDetail, refresh }) => {
  const [filterIds, setFilterIds] = useState(tokenIds || [])
  const [detail, setDetail] = useState(isDetail)
  const [nid, setNid] = useState(-1)

  const handleDetail = (id) => {
    setDetail(true)
    setNid(id)
  }

  useEffect(() => {
    setNid(-1)
    setDetail(false)
  }, [category])

  useEffect(() => {
    if (query && tokenIds.length) {
      setFilterIds(tokenIds.filter(f => f.name.toLowerCase().indexOf(query.toLowerCase()) > -1))
    } else if (category &&  tokenIds.length) {
      setFilterIds(tokenIds.filter(f => f.category === category || category === 'Owned'))
    } else if (query === '') {
      setFilterIds(tokenIds)
    } 
  }, [tokenIds, query, category])

  const filterList = useMemo(() => {
    const result = {}
    for(let i = 0; i < Nfts.length; i++){
      result[Nfts[i].nid] = {...Nfts[i]};
    }
    const finalResult: Nft[] = Object.values(result)
    const filterResulst: Nft[] = []

    finalResult.forEach(item => {
      let owned = 0
      let token = item 
      filterIds.forEach(l => {
        if (l.nid === item.nid) {
          owned++
          token = l
        }
      })
      /* eslint no-param-reassign: ["error", { "props": false }] */
      filterResulst.push({ ...token, owned })
    })
    return filterResulst
  }, [filterIds])

  const ownedNft = !!filterList.filter(f => f.category === category || (category === 'Owned' && f.owned !== 0)).length
  const hasNft = !!tokenIds.filter(f => (f.category === category || category === 'Owned') && f.nid === nid).length

  return (
    <>
    {!detail ?
      <>
        {
          ownedNft && (
            <NftGrid>
              {orderBy(filterList, 'sortOrder').filter(f => f.category === category || (category === 'Owned' && f.owned !== 0)).map((nft) => {
                const Card = NftCard
                return (
                  <div key={nft.tokenId}>
                    <Card nft={nft} onDetail={handleDetail} isDetail={detail} category={category} tokenIds={tokenIds[nft.identifier]} refresh={refresh} isApproved={isApproved} />
                  </div>
                )
              })}
            </NftGrid>
          )
        }
        {
          !ownedNft && <StyledImage src="/images/no-nft.svg" alt="Pancake illustration" width={460} height={220} />
        }
      </> :
      <>
        {
          hasNft && (
            <NftGrid>
              {orderBy(tokenIds, 'sortOrder').filter(f => (f.category === category || category === 'Owned') && f.nid === nid).map((nft) => {
                const Card = NftCard
                return (
                  <div key={nft.tokenId}>
                    <Card nft={nft} isDetail={detail} tokenIds={tokenIds[nft.identifier]} refresh={refresh} isApproved={isApproved} />
                  </div>
                )
              })}
            </NftGrid>
          )
          }
          {
            !hasNft && <StyledImage src="/images/no-nft.svg" alt="Pancake illustration" width={460} height={220} />
          }
      </>
    }
    </>
  )
}

export default NftList
