import styled from '@emotion/styled'
import { css } from '@emotion/react'
import dynamic from 'next/dynamic'
import Skeleton from '@components/shared/Skeleton'
import Account from '@components/home/Account'

const EventBanners = dynamic(() => import('@/components/home/EventBanners'), {
  ssr: false,
  loading: () => (
    <Skeleton width="100%" height={100} style={{ borderRadius: 8 }} />
  ),
})

export default function Home() {
  return (
    <>
      <EventBanners />
      <Account />
    </>
  )
}
