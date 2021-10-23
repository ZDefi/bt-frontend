import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { getBlocksFromTimestamps, get2DayPercentChange } from 'utils/getBlocksFromTimstamps'
import client from '../apollo/client'
import GLOBAL_DATA, { DAY_DATA } from '../apollo/queries'

/*
 * Due to Cors the api was forked and a proxy was created
 * @see https://github.com/pancakeswap/gatsby-pancake-api/commit/e811b67a43ccc41edd4a0fa1ee704b2f510aa0ba
 */
export const baseUrl = 'https://api.pancakeswap.com/api/v1'

/* eslint-disable camelcase */

export interface ApiTvlResponse {
  update_at: string
  '24h_total_volume': number
  total_value_locked: number
  total_value_locked_all: number
}

export const useGetStats = () => {
  const [data, setData] = useState<ApiTvlResponse | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/tvl`)
        const responseData: ApiTvlResponse = await response.json()

        setData(responseData)
      } catch (error) {
        console.error('Unable to fetch data:', error)
      }
    }

    fetchData()
  }, [setData])

  return data
}

export const useGetGlobal = () => {
  const [data, setData] = useState<number | null>(null)
  const [pairs, setPairs] = useState<number | null>(336)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.query({
          query: GLOBAL_DATA(),
          fetchPolicy: 'cache-first',
        })
        const responseData = result.data.pancakeFactories[0]
        // console.log("res", responseData)

        setData(responseData.totalLiquidityUSD)
        setPairs(responseData.totalPairs)
      } catch (error) {
        console.error('Unable to fetch data:', error)
      }
    }

    fetchData()
  }, [setData])

  return [data, pairs]
}

export const useGetTrideVolume = () => {
  const [data, setData] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.query({
          query: DAY_DATA(),
          fetchPolicy: 'cache-first',
        })
        const responseData = result.data.pancakeDayDatas[0]
        // console.log("res-DAY_DATA", responseData)

        setData(responseData.dailyVolumeUSD)
      } catch (error) {
        console.error('Unable to fetch data:', error)
      }
    }

    fetchData()
  }, [setData])

  return data
}

/**
 * Gets all the global data for the overview page.
 * Needs current eth price and the old eth price to get
 * 24 hour USD changes.
 * @param {*} ethPrice
 * @param {*} oldEthPrice
 */
export async function getTradingVolume() {
  // data for each day , historic data used for % changes
  let data = {
    totalVolumeUSD: 0,
    oneDayVolumeUSD: 0
  }
  let oneDayData = {
    totalVolumeUSD: 0
  }
  let twoDayData = {
    totalVolumeUSD: 0
  }

  try {
    // get timestamps for the days
    const utcCurrentTime = dayjs()
    const utcOneDayBack = utcCurrentTime.subtract(1, 'day').unix()
    const utcTwoDaysBack = utcCurrentTime.subtract(2, 'day').unix()
    const utcOneWeekBack = utcCurrentTime.subtract(1, 'week').unix()
    const utcTwoWeeksBack = utcCurrentTime.subtract(2, 'week').unix()

    // get the blocks needed for time travel queries
    const [oneDayBlock, twoDayBlock] = await getBlocksFromTimestamps([
      utcOneDayBack,
      utcTwoDaysBack,
      utcOneWeekBack,
      utcTwoWeeksBack,
    ])

    // fetch the global data
    const result = await client.query({
      query: GLOBAL_DATA(),
      fetchPolicy: 'cache-first',
    })
    data = result.data.pancakeFactories[0]

    // fetch the historical data
    const oneDayResult = await client.query({
      query: GLOBAL_DATA(oneDayBlock?.number),
      fetchPolicy: 'cache-first',
    })
    oneDayData = oneDayResult.data.pancakeFactories[0]

    const twoDayResult = await client.query({
      query: GLOBAL_DATA(twoDayBlock?.number),
      fetchPolicy: 'cache-first',
    })
    twoDayData = twoDayResult.data.pancakeFactories[0]

    // let oneWeekResult = await client.query({
    //   query: GLOBAL_DATA(oneWeekBlock?.number),
    //   fetchPolicy: 'cache-first',
    // })
    // const oneWeekData = oneWeekResult.data.pancakeFactories[0]

    // let twoWeekResult = await client.query({
    //   query: GLOBAL_DATA(twoWeekBlock?.number),
    //   fetchPolicy: 'cache-first',
    // })
    // const twoWeekData = twoWeekResult.data.pancakeFactories[0]

    if (data && oneDayData && twoDayData) {
      const [oneDayVolumeUSD] = get2DayPercentChange(
        data.totalVolumeUSD,
        oneDayData.totalVolumeUSD ? oneDayData.totalVolumeUSD : 0
      )

      data.oneDayVolumeUSD = oneDayVolumeUSD < 0 ? 0 : oneDayVolumeUSD

    }
  } catch (e) {
    return data
  }
  return data
}
