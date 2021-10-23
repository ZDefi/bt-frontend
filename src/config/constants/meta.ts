import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'FlySwap',
  description:
    'USDT farms version of PancakeSwap. Discover FlySwap, the leading DEX on Binance Smart Chain (BSC) with trade mining and bottle grants for projects.',
  image: 'https://FlySwap.finance/images/hero.png',
}

export const customMeta: { [key: string]: PageMeta } = {
  '/': {
    title: 'FlySwap - The best AMM DEX for new born projects on Heco Chain',
  },
  '/ilo': {
    title: 'FlySwap ILO'
  },
  '/competition': {
    title: 'Trading Battle | FlySwap',
  },
  '/prediction': {
    title: 'Prediction | FlySwap',
  },
  '/farms': {
    title: 'FlySwap Farms',
    description: 'Stake LP tokens to earn VDR on FlySwap, the best AMM+NFT DEX for newborn projects on Binance Smart Chain.'
  },
  '/pools': {
    title: 'FlySwap Pools',
    description: 'Stake VDR to earn free tokens on FlySwap, the best AMM+NFT DEX for newborn projects on Binance Smart Chain.'
  },
  '/info': {
    title: 'FlySwap Info',
    description: 'View statistics for FlySwap.'
  },
  '/bottles': {
    title: 'FlySwap Bottles',
    description: 'Use VDR to vote for projects on FlySwap, the best AMM+NFT DEX for newborn projects on Binance Smart Chain.'
  },
  '/nfb': {
    title: 'FlySwap NFB',
    description: 'Your limited edition Non-Fungible VDR is here. Stake NFB to earn VDR and free tokens on FlySwap, the best AMM+NFT DEX for newborn projects on Binance Smart Chain.'
  },
  '/lottery': {
    title: 'Lottery | FlySwap',
  },
  '/collectibles': {
    title: 'Collectibles | FlySwap',
  },
  '/ifo': {
    title: 'Initial Farm Offering | FlySwap',
  },
  '/teams': {
    title: 'Leaderboard | FlySwap',
  },
  '/profile/tasks': {
    title: 'Task Center | FlySwap',
  },
  '/profile': {
    title: 'Your Profile | FlySwap',
  },
}
