import { MenuEntry } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Home'),
    icon: 'HomeIcon',
    href: '/',
  },
  // {
  //   label: 'ILO',
  //   icon: 'IloIcon',
  //   href: '/ilo',
  //   timeStamp: process.env.REACT_APP_TIMESTAMP || '1622642400',
  //   fixedTime: {
  //     timeStamp: "1622556000",
  //     text: "24:00:00"
  //   }
  // },
  {
    label: t('Trade'),
    icon: 'TradeIcon',
    items: [
      {
        label: t('Exchange'),
        href: 'https://exchange.btswap-finance.net/#/swap',
      },
      {
        label: t('Liquidity'),
        href: 'https://exchange.btswap-finance.net/#/pool',
      },
    ],
  },
  {
    label: t('Farms'),
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: t('Pools'),
    icon: 'PoolIcon',
    href: '/pools',
  },
  // {
  //   label: t('My node'),
  //   icon: 'MyNodeIcon',
  //   href: '/invitation',
  // },
  // {
  //   label: 'Prediction',
  //   icon: 'PredictionsIcon',
  //   href: '/prediction',
  //   status: {
  //     text: 'BETA',
  //     color: 'warning',
  //   },
  // },
  // {
  //   label: 'Lottery',
  //   icon: 'TicketIcon',
  //   href: '/lottery',
  // },
  // {
  //   label: 'NFB',
  //   icon: 'NftIcon',
  //   href: '/nfb',
  // },
  // {
  //   label: 'Team Battle',
  //   icon: 'TeamBattleIcon',
  //   href: '/competition',
  // },
  // {
  //   label: 'Teams & Profile',
  //   icon: 'GroupsIcon',
  //   items: [
  //     {
  //       label: 'Leaderboard',
  //       href: '/teams',
  //     },
  //     {
  //       label: 'Task Center',
  //       href: '/profile/tasks',
  //     },
  //     {
  //       label: 'Your Profile',
  //       href: '/profile',
  //     },
  //   ],
  // },
  // {
  //   label: 'Bottle',
  //   icon: 'Bottles',
  //   href: '/bottles',
  // },
  {
    label: t('Info'),
    icon: 'InfoIcon',
    href: '/info',
    // items: [
    //   {
    //     label: 'Overview',
    //     href: 'https://babyswap.info',
    //   },
    //   {
    //     label: 'Tokens',
    //     href: 'https://babyswap.info/tokens',
    //   },
    //   {
    //     label: 'Pairs',
    //     href: 'https://babyswap.info/pairs',
    //   },
    //   {
    //     label: 'Accounts',
    //     href: 'https://babyswap.info/accounts',
    //   },
    // ],
  },
  {
    label: "Audit",
    icon: "AutitIcon",
    href: "#",
  },
  {
    label: t('More'),
    icon: 'MoreIcon',
    items: [
      // {
      //   label: t('Contact'),
      //   href: 'https://docs.babyswap.finance/contact-us',
      // },
      // {
      //   label: 'Voting',
      //   href: 'https://voting.babyswap.finance',
      // },
      {
        label: t('Github'),
        href: '#',
      },
      {
        label: t('Docs'),
        href: '#',
      }
      // {
      //   label: t('Blog'),
      //   href: 'https://babyswap.medium.com/',
      // },
      // {
      //   label: 'Merch',
      //   href: 'https://babyswap.creator-spring.com/',
      // },
    ],
  },
]

export default config
