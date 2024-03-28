import { getSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'
import { QueryClient, dehydrate } from 'react-query'
import dynamic from 'next/dynamic'
import Spacing from '@shared/Spacing'
import Account from '@components/home/Account'
import CreditScore from '@components/home/CreditScore'
import { BannerSkeleton } from '@components/home/EventBanners'
import { CardListSkeleton } from '@components/home/CardList'
import { getAccount } from '@remote/account'
import { User } from '@models/user'

const EventBanners = dynamic(() => import('@components/home/EventBanners'), {
  ssr: false,
  loading: () => <BannerSkeleton />,
})
const CardList = dynamic(() => import('@components/home/CardList'), {
  ssr: false,
  loading: () => <CardListSkeleton />,
})

export default function Home() {
  return (
    <>
      <EventBanners />
      <Account />
      <Spacing size={8} backgroundColor="gray100" />
      <CreditScore />
      <Spacing size={8} backgroundColor="gray100" />
      <CardList />
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (session != null && session.user != null) {
    const client = new QueryClient()

    await client.prefetchQuery(['account', (session.user as User).id], () =>
      getAccount((session.user as User).id),
    )

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
      },
    }
  }

  return {
    props: {},
  }
}
