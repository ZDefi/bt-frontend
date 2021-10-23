import React from 'react'
import { CardHeader, Heading, Text, Flex, Image, HelpIcon, useTooltip, Box } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'

const Wrapper = styled(CardHeader)<{ isFinished?: boolean; background?: string; isPromotedPool?: boolean }>`
  background: ${({ isFinished, background, theme }) =>
    isFinished ? theme.colors.backgroundDisabled : theme.colors.gradients[background]};
  border-radius: ${({ theme, isPromotedPool }) =>
    isPromotedPool ? '31px 31px 0 0' : `${theme.radii.card} ${theme.radii.card} 0 0`};
`

const StyledCardHeader: React.FC<{
  earningTokenSymbol: string
  stakingTokenSymbol: string
  isAutoVault?: boolean
  isFinished?: boolean
  isStaking?: boolean
  isPromotedPool?: boolean
}> = ({
  earningTokenSymbol,
  stakingTokenSymbol,
  isFinished = false,
  isAutoVault = false,
  isStaking = false,
  isPromotedPool = false,
}) => {
  const { t } = useTranslation()
  const poolImageSrc = isAutoVault
    ? `cake-cakevault.svg`
    : `${earningTokenSymbol === 'bCOOP' ? 'coop' : earningTokenSymbol}-${stakingTokenSymbol}.svg`.toLocaleLowerCase()
  const isCakePool = earningTokenSymbol === 'CAKE' && stakingTokenSymbol === 'CAKE'
  const background = isStaking ? 'bubblegum' : 'cardHeader'
  const manualTooltipText = t('The mechanism of this token may conduct relatively high gas fees while unstaking and harveting. DYOR on the tokenomics and decide on when to take actions.')
  const manualTooltipTextWTW = t("Due to this token's mechanism, it is required to set your gas limit to 6,000,000 when you harvest or unstake. Harvest or unstake the tokens will conduct several transactions, so the gas fees may be relatively higher. Check on BSC Scan for the exact gas fees.")
  const getHeadingPrefix = () => {
    if (isAutoVault) {
      // vault
      return `${t('Auto')}`
    }
    if (isCakePool) {
      // manual cake
      return `${t('Manual')}`
    }
    // all other pools
    return `${t('Earn')}`
  }

  const getSubHeading = () => {
    if (isAutoVault) {
      return `${t('Automatic restaking')}`
    }
    if (isCakePool) {
      return `${t('Earn CAKE, stake CAKE')}`
    }
    return `${t('Stake')} ${stakingTokenSymbol==='BABY'?'BEE':stakingTokenSymbol}`
  }
  const tipsCoin: string[] = ['SHARK', 'WTW', 'ZABAKU', 'SHIBBY', 'BabyDoge']
  const index = tipsCoin.indexOf(earningTokenSymbol)
  
  const { targetRef, tooltip, tooltipVisible } = useTooltip( index !== 1 ? manualTooltipText : manualTooltipTextWTW, {
    placement: 'bottom-end',
  })

  
  
  return (
    <Wrapper isPromotedPool={isPromotedPool} isFinished={isFinished} background={background}>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex flexDirection="column">
          <Flex flexDirection="row">
            <Heading color={isFinished ? 'textDisabled' : 'body'} scale="lg">
              {`${getHeadingPrefix()} ${earningTokenSymbol}`}
            </Heading>
            {tooltipVisible && tooltip}
            {index > -1 ? 
            <Box ref={targetRef} style={{lineHeight: '30px'}}>
              <HelpIcon ml="4px" width="16px" height="16px" color="#6BB9B3" />
            </Box> : ''}
            
          </Flex>
          <Text color={isFinished ? 'textDisabled' : 'textSubtle'}>{getSubHeading()}</Text>
        </Flex>
        <Image src={`/images/pools/${poolImageSrc}`} alt={earningTokenSymbol} width={64} height={64} />
      </Flex>
    </Wrapper>
  )
}

export default StyledCardHeader
