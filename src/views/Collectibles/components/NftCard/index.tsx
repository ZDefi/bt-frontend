import React, { useState, useCallback } from 'react'
import { PromiEvent } from 'web3-core'
import { Contract } from 'web3-eth-contract'
import styled from 'styled-components'
import {
  Card,
  CardBody,
  Heading,
  Button,
  Text,
  useModal,
  Flex,
} from '@pancakeswap/uikit'
import { useNftStake } from 'hooks/useStake'
import { useNftUnstake } from 'hooks/useUnstake'
import { useNftApproveOne } from 'hooks/useApprove'
import { useTranslation } from 'contexts/Localization'
import { Nft } from 'config/constants/types'
import { getIdByTokenId } from 'utils/getNfbBabyOfTokens'
import InfoRow from '../InfoRow'
import TransferNftModal from '../TransferNftModal'
import Preview from './Preview'

export interface NftCardProps {
  nft: Nft
  canClaim?: boolean
  tokenIds?: number[]
  onClaim?: () => PromiEvent<Contract>
  refresh: () => void
  isDetail?: boolean
  category?: string
  onDetail?: (category: string) => void
  isApproved: boolean
}

const StyleCard = styled(Card)`
  box-shadow: -3px 3px 11px rgba(130, 255, 227, 0.29), 3px -3px 13px rgba(73, 102, 255, 0.22);
  border: 1px solid #93CFFA;
  padding: 12px;
`

const Header = styled(InfoRow)`
  min-height: 28px;
  display: flex;
  justify-content: center;
`

const StyleValue = styled.div`
  margin: 26px auto 12px;
`

const NftCard: React.FC<NftCardProps> = ({ nft, tokenIds = [], refresh, isApproved, isDetail, onDetail }) => {
  const { t } = useTranslation()
  const [requestedStake, setRequestedStake] = useState(false)
  const [requestedUnstake, setRequestedUnstake] = useState(false)
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { name, tokenId, staked } = nft
  const { onStake } = useNftStake(tokenId)
  const { onUnstake } = useNftUnstake(tokenId)
  const { onApproveOne } = useNftApproveOne(tokenId)
  const walletOwnsNft = tokenIds.length > 0

  const handleSuccess = () => {
    refresh()
  }

  const handleStake = useCallback(async () => {
    try {
      setRequestedStake(true)
      const id = getIdByTokenId(tokenId)
      await onStake(id)
      refresh()
      setRequestedStake(false)
    } catch (e) {
      setRequestedStake(false)
      console.error(e)
    }
  }, [onStake, refresh, tokenId])

  const handleUnstake = useCallback(async () => {
    try {
      setRequestedUnstake(true)
      await onUnstake()
      refresh()
      setRequestedUnstake(false)
    } catch (e) {
      setRequestedUnstake(false)
      console.error(e)
    }
  }, [onUnstake, refresh])

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApproveOne()
      refresh()
      setRequestedApproval(false)
    } catch (e) {
      setRequestedApproval(false)
      console.error(e)
    }
  }, [onApproveOne, refresh])

  const handleDetail = useCallback((nid) => {
    onDetail(nid)
  }, [onDetail])

  const value = nft.vaule ?? "10 BABY"
  const id = nft.tokenId ?? ''

  const [onPresentTransferModal] = useModal(
    <TransferNftModal nft={nft} tokenIds={tokenIds} onSuccess={handleSuccess} />,
  )

  const renderStakingButtons = () => {
    return !staked ? (
      <Button disabled={requestedStake} onClick={handleStake}>{t('Stake')}</Button>
    ) : (
      <Button disabled={requestedUnstake} onClick={handleUnstake}>{t('Unstake')}</Button>
    )
  }

  const renderButtons = () => {
    return (
      nft?.owned === 0 ? 
        <Button padding="0" width="100%" disabled>
          {t(`Oops.. You don't have this one`)}
        </Button> :
        <>
          <Button disabled={nft.staked} onClick={onPresentTransferModal}>
            {t('Transfer')}
          </Button>
          {isApproved || nft.allowance ? renderStakingButtons() :
            <Button disabled={requestedApproval} onClick={handleApprove}>
              {t('Approve')}
            </Button>
          }
        </>
    )
  }

  return (
    <StyleCard isActive={walletOwnsNft}>
      <Preview nft={nft} isOwned={walletOwnsNft} />
      <CardBody>
        <Header>
          <Heading>{name}</Heading>
        </Header>
        <StyleValue>
          <Flex justifyContent="space-between" mb="12px">
            <Text>{t('Value')}:</Text>
            <Text bold>{value}</Text>
          </Flex>
          <Flex justifyContent="space-between" mb="12px">
            <Text>{t('Category')}:</Text>
            <Text bold>{nft?.category}</Text>
          </Flex>
          {isDetail &&
            <Flex justifyContent="space-between" mb="12px">
              <Text>{t('ID')}:</Text>
              <Text bold>{id}</Text>
            </Flex>
          }
          {(nft?.owned || nft.owned === 0) &&
            <Flex justifyContent="space-between" mb="12px">
              <Text>{t('Quantity')}:</Text>
              <Text bold>{nft.quantity}</Text>
             </Flex>
          }
          {!isDetail && 
            <Flex justifyContent="space-between" mb="12px">
              <Text>{t('Owned')}:</Text>
              <Text bold>{nft.owned}</Text>
            </Flex>
          }
        </StyleValue>
        <Flex justifyContent="space-between" mt="12px">
          {nft?.owned ? 
            <Button width="100%" onClick={() => handleDetail(nft.nid)}>
              {t('Detail')}
            </Button> : renderButtons()
          }
        </Flex>
      </CardBody>
    </StyleCard>
  )
}

export default NftCard
