import dynamic from 'next/dynamic'
import Account from '@components/home/Account'
import CreditScore from '@components/home/CreditScore'
import { BannerSkeleton } from '@components/home/EventBanners'

const EventBanners = dynamic(() => import('@components/home/EventBanners'), {
  ssr: false,
  loading: () => <BannerSkeleton />,
})

export default function Home() {
  return (
    <>
      <EventBanners />
      <Account />
      <CreditScore />
    </>
  )
}
