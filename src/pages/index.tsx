import styled from '@emotion/styled'
import { css } from '@emotion/react'
import dynamic from 'next/dynamic'
import Skeleton from '@components/shared/Skeleton'

const EventBanners = dynamic(() => import('@/components/home/EventBanners'), {
  ssr: false,
  loading: () => (
    <Skeleton width="100%" height={100} style={{ borderRadius: 8 }} />
  ),
})

export default function Home() {
  return (
    <Container>
      <EventBanners />
    </Container>
  )
}

const Container = styled.div``

const bold = css`
  font-weight: bold;
`
