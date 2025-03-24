'use client';

import { useParams, useRouter } from 'next/navigation';
import { Box } from '@/components/box';
import { BoxHeader } from '@/components/box-header';
import { ShortUrlForm } from '@/components/forms/short-url-form';
import { useMutation, useQuery } from '@apollo/client';
import { Loading } from '@/components/loading';
import { GET_SLUG } from '@/data/short-urls/get-slug.gql';
import { GetSlugQuery, UpdateSlugMutation } from '../../../../__generated__/gql/graphql';
import { M_UPDATE_SLUG } from '@/data/short-urls/update-slug.gql';
import { useEffect } from 'react';

export default function PageComponent() {
  const param = useParams().param as string;
  const { data, loading } = useQuery<GetSlugQuery>(GET_SLUG, { fetchPolicy: 'no-cache', variables: { id: param } });
  const [mutate, { data: updated, error }] = useMutation<UpdateSlugMutation>(M_UPDATE_SLUG);

  const router = useRouter();

  useEffect(() => {
    if (updated?.updateSlug) {
      router.push('/');
    }
  }, [data, router, updated?.updateSlug]);

  if (error) return <p>Erro: {error.message}</p>;

  return (
    <Box>
      <BoxHeader title="Edit" to="/list" toText="List" />
      {loading && <Loading />}
      {data && (
        <ShortUrlForm
          disable={false}
          onSubmit={(data) => mutate({ variables: { shortUrl: data.originalUrl, id: param } })}
          updateData={data?.getSlug}
          isCreate={false}
        />
      )}
    </Box>
  );
}
