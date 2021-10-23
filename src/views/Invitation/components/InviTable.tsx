import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { Flex, Box, Text } from '@pancakeswap/uikit'

interface ColItem {
  title: string,
  key: string
}
interface PersionProps {
  col: ColItem[],
  tableData: any[],
  more?: boolean
}

const InviTable: React.FC<PersionProps> = ({ col, tableData }) => {
  const { t } = useTranslation()
  function getStr(key: string, data: any): string {
    if (key === 'address') {
      const str = data[key]
      const start = str.substr(0, 5)
      const end = str.substring(str.length - 6)
      return str.length > 13 ? `${start}***${end}` : str
    } 
    if (key === 'nodePoint') {
      return (data.points + data.bee).toString()
    } 
    return data[key]
  }
  return (
    <Box pt="30px" pl="25px" pr="23px" pb="22px">
      <Flex justifyContent="space-between" >
        {
          col.map(item => (
            <div key={item.title}>
              <Text color="#FF7750" fontSize="15px">{t(item.title)}</Text>
              {tableData.map((it) => (
                <Box key={Math.random()} mt="26px" >
                  <Text color="#FFFFFF" fontSize="13px" textAlign="right">
                    {
                      getStr(item.key, it)
                    }
                </Text>
                </Box>
              ))}
            </div>
          ))
        }
      </Flex>
    </Box>
  )
}

export default InviTable
