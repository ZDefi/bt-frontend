export default function getBabyOfNftTokenIds (tokenIds) {
    let totalPriceForBaby = 0
    if (Array.isArray(tokenIds) && tokenIds.length) {
        tokenIds.forEach(token => {
            const price = token.vaule.split(" ")
            totalPriceForBaby += Number(price[0])
        })
    }
    return totalPriceForBaby
}

export function getIdByTokenId (tokenId) {
    let id = 0
    if (tokenId >= 10001 && tokenId <= 57852)  {
        id = 0
    } else if (tokenId >= 57853 && tokenId <= 57995) {
        id = 1
    } else if (tokenId >= 57996 && tokenId <= 62031) {
        id = 2
    } else if (tokenId >= 62032 && tokenId <= 70000) {
        id = 3
    } else if (tokenId >= 2000001 && tokenId <= 2001451) {
        id = 4
    } else if (tokenId >= 7000001 && tokenId <= 7000200) {
        id = 5
    }
    return id
}