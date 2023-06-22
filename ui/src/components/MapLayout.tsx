import { Box } from '@mui/material'
import { QueryClient } from '@tanstack/react-query'
import type { Map as LeafletMap } from 'leaflet'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { ReactElement, ReactNode, useEffect, useState } from 'react'

import { useFeedQuery, useFeedsQuery } from '@/graphql/generated'

import BottomNav from './BottomNav'
import Drawer from './Drawer'
import Header from './Header'
import Player from './Player'

const MapWithNoSSR = dynamic(() => import('./Map'), {
  ssr: false,
})

const feedFromSlug = (feedSlug: string) => ({
  id: feedSlug,
  name: feedSlug,
  slug: feedSlug,
  nodeName: feedSlug,
  // TODO: figure out which coordinates to use for dynamic feeds
  locationPoint: {
    coordinates: [47.6, -122.3],
  },
})

function MapLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const slug = router.query.feed as string

  const isDynamic = router.asPath.split('/')[1] === 'dynamic'
  // don't make feed request if there's no feed slug or is dynamic
  const feedFromQuery = useFeedQuery(
    { slug: slug },
    { enabled: !!slug || isDynamic }
  ).data?.feed
  const feed = isDynamic ? feedFromSlug(slug) : feedFromQuery

  const [currentFeed, setCurrentFeed] = useState(feed)
  const [map, setMap] = useState<LeafletMap>()
  const feeds = useFeedsQuery().data?.feeds ?? []

  // update the currentFeed only if there's a new feed
  useEffect(() => {
    if (feed && feed.slug !== currentFeed?.slug) {
      setCurrentFeed(feed)
      map?.panTo(feed.locationPoint.coordinates)
    }
  }, [feed, map, currentFeed])

  const invalidateSize = () => {
    if (map) {
      // wait 200ms before resizing so that drawer transition animations have a chance to finish
      // TODO: trigger resize directly from after transition instead of dead reckoning
      setTimeout(() => {
        map.invalidateSize({ pan: false })
      }, 200)
    }
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ flexGrow: 1, display: 'flex' }}>
        <Drawer onClose={invalidateSize} onOpen={invalidateSize}>
          {children}
        </Drawer>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <MapWithNoSSR
              setMap={setMap}
              currentFeed={currentFeed}
              feeds={feeds}
            />
          </Box>
          <Player currentFeed={currentFeed} />
        </Box>
      </Box>
      <BottomNav />
    </Box>
  )
}

export function getMapLayout(page: ReactElement) {
  return <MapLayout>{page}</MapLayout>
}

export async function getMapStaticProps(queryClient: QueryClient) {
  await queryClient.prefetchQuery(
    useFeedsQuery.getKey(),
    useFeedsQuery.fetcher()
  )
}
