'use client';

import { useQuery } from '@apollo/client';
import Link from 'next/link';

import { SHORT_URLS, ShortUrlType } from '@/data/short-urls/get-short-urls.gql';
import { Box } from '@/components/box';
import { BoxHeader } from '@/components/box-header';
import { Loading } from '@/components/loading';

export default function Page() {
  const { data, loading } = useQuery<ShortUrlType>(SHORT_URLS, { fetchPolicy: 'no-cache' });

  return (
    <Box>
      <BoxHeader title="List of URLs" to="/" toText="Return" />
      {loading && <Loading />}
      {data?.shortUrls.map((item) => (
        <div key={item.shortUrl} className="underline">
          <Link href={`/list/${item.id}`}>{item.shortUrl}</Link>
        </div>
      ))}
    </Box>
  );
}
