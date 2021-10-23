import gql from 'graphql-tag'

const FACTORY_ADDRESS = '0x86407bEa2078ea5f5EB5A52B2caA963bC1F889Da'

// const GLOBAL_DATA = () => {
//     const queryString = ` query pancakeFactories {
//         pancakeFactories {
//             id
//             totalPairs
//             totalLiquidityUSD
//         }
//     }`
//     return gql(queryString)
// }

const GLOBAL_DATA = (block) => {
    const queryString = ` query pancakeFactories {
        pancakeFactories(
         ${block ? `block: { number: ${block}}` : ``} 
         where: { id: "${FACTORY_ADDRESS}" }) {
          id
          totalVolumeUSD
          totalVolumeBNB
          untrackedVolumeUSD
          totalLiquidityUSD
          totalLiquidityBNB
          totalTransactions
          totalPairs
        }
      }`
    return gql(queryString)
  }

export const DAY_DATA = () => {
    const queryString = ` query pancakeDayDatas {
        pancakeDayDatas(orderBy: date, orderDirection: desc, first: 1) {
            id
            date
            dailyVolumeUSD
            totalLiquidityUSD
        }
    }`
    return gql(queryString)
}

export const GET_BLOCKS = (timestamps) => {
    let queryString = 'query blocks {'
    queryString += timestamps.map((timestamp) => {
        return `t${timestamp}:blocks(first: 1, orderBy: timestamp, orderDirection: desc, where: { timestamp_gt: ${timestamp}, timestamp_lt: ${timestamp + 600
        } }) {
        number
        }`
    })
    queryString += '}'
    return gql(queryString)
}

export default GLOBAL_DATA
