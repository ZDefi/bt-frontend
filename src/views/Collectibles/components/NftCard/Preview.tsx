import React from 'react'
import styled from 'styled-components'
import { Nft } from 'config/constants/types'

interface PreviewProps {
  nft: Nft
  isOwned?: boolean
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.borderColor};
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-bottom: 100%;
  border-radius: 20px;
`

const StyledImage = styled.img`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  transition: opacity 1s linear;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`

const StyledVideo = styled.video`
  height: 100%;
  width: 100%;
  border-radius: 20px;
`

const Preview: React.FC<PreviewProps> = ({ nft, isOwned = false }) => {
  const { images, name, video } = nft
  // let previewImageSrc = `/images/nfts/${images.lg}`
  let previewImageSrc = images.sketch
  if (images?.ipfs && nft.owned !== 0) {
    previewImageSrc = images.ipfs
  }
  // const previewImageSrc = `/images/nfts/${images.lg}`

  if (video) {
    const videoComponent = (
      <StyledVideo autoPlay controls={false} loop muted poster={previewImageSrc}>
        {/* <source src={video.webm} type="video/webm" /> */}
        <source src={video.mp4} type="video/mp4" />
      </StyledVideo>
    )

    return isOwned ? (
      <a href={images.ipfs} target="_blank" rel="noreferrer noopener">
        {videoComponent}
      </a>
    ) : (
      videoComponent
    )
  }

  const previewImage = <StyledImage src={previewImageSrc} alt={name} />

  return (
    <Container>
      {isOwned ? (
        <a href={images.ipfs} target="_blank" rel="noreferrer noopener">
          {previewImage}
        </a>
      ) : (
        previewImage
      )}
    </Container>
  )
}

export default Preview
