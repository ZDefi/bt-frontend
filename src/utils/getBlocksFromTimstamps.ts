import { blockClient } from 'apollo/client'
import { GET_BLOCKS } from 'apollo/queries'

export async function splitQuery(query, localClient, vars, list, skipCount = 100) {
    let fetchedData = {}
    let allFound = false
    let skip = 0
  
    while (!allFound) {
      let end = list.length
      if (skip + skipCount < list.length) {
        end = skip + skipCount
      }
      const sliced = list.slice(skip, end)
      const result = await localClient.query({
        query: query(...vars, sliced),
        fetchPolicy: 'cache-first',
      })
      fetchedData = {
        ...fetchedData,
        ...result.data,
      }
      if (Object.keys(result.data).length < skipCount || skip + skipCount > list.length) {
        allFound = true
      } else {
        skip += skipCount
      }
    }
  
    return fetchedData
  }
/**
 * @notice Fetches block objects for an array of timestamps.
 * @dev blocks are returned in chronological order (ASC) regardless of input.
 * @dev blocks are returned at string representations of Int
 * @dev timestamps are returns as they were provided; not the block time.
 * @param {Array} timestamps
 */
 export async function getBlocksFromTimestamps(timestamps, skipCount = 500) {
    if (timestamps?.length === 0) {
      return []
    }
  
    const fetchedData = await splitQuery(GET_BLOCKS, blockClient, [], timestamps, skipCount)
  
    const blocks = []
    if (fetchedData) {
      Object.keys(fetchedData).forEach(t => {
        if (fetchedData[t].length > 0) {
            blocks.push({
              timestamp: t.split('t')[1],
              number: fetchedData[t][0].number,
            })
          }
      })
    //   for (const t in fetchedData) {
    //     if (fetchedData[t].length > 0) {
    //       blocks.push({
    //         timestamp: t.split('t')[1],
    //         number: fetchedData[t][0].number,
    //       })
    //     }
    //   }
    }
    return blocks
  }
/**
 * gets the amoutn difference plus the % change in change itself (second order change)
 * @param {*} valueNow
 * @param {*} value24HoursAgo
 * @param {*} value48HoursAgo
 */
 export const get2DayPercentChange = (valueNow, value24HoursAgo) => {
    // get volume info for both 24 hour periods
    const currentChange = parseFloat(valueNow) - parseFloat(value24HoursAgo)
    // let previousChange = parseFloat(value24HoursAgo) - parseFloat(value48HoursAgo)
  
    // const adjustedPercentChange = (parseFloat(currentChange - previousChange) / parseFloat(previousChange)) * 100
  
    // if (isNaN(adjustedPercentChange) || !isFinite(adjustedPercentChange)) {
    //   return [currentChange, 0]
    // }
    return [currentChange]
  }