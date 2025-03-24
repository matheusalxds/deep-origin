'use client';

import { usePathname, useRouter } from 'next/navigation';
import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { Loading } from '@/components/loading';

const GET_DATA = gql`
  query ShortUrls($shortUrl: String!) {
    originalUrl(shortUrl: $shortUrl)
  }
`;

export default function PageComponent() {
  const pathname = usePathname();
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_DATA, {
    variables: { shortUrl: window.location.href },
    skip: !pathname,
  });

  useEffect(() => {
    if (data?.originalUrl) {
      router.push(data.originalUrl);
    }
  }, [data, router]);

  if (loading) return <Loading />;
  if (error) return <p>Erro: {error.message}</p>;

  return (
    <div>
      <h1>Redirecionando...</h1>
      <p>
        Se não for redirecionado automaticamente, clique <a href={data.originalUrl}>aqui</a>.
      </p>
    </div>
  );
}
