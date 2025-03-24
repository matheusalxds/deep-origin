'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { M_SHORT_URLS } from '@/data/short-urls/create-short-urls.gql';
import { Box } from '@/components/box';
import { CopyIcon } from 'lucide-react';
import { ShortUrlMutation } from '../../__generated__/gql/graphql';
import { BoxHeader } from '@/components/box-header';
import { AddShortUrlForm, ShortUrlForm } from '@/components/forms/short-url-form';

export default function Home() {
  const [copiedMsg, setCopiedMsg] = useState(false);

  const [mutate, { data }] = useMutation<ShortUrlMutation>(M_SHORT_URLS);

  const onSubmit = async (formData: AddShortUrlForm) => {
    await mutate({ variables: { input: formData } });
  };

  const copyText = async () => {
    try {
      if (data?.shortUrl.shortUrl) {
        await navigator.clipboard.writeText(data.shortUrl.shortUrl);
        setCopiedMsg(true);
        setTimeout(() => setCopiedMsg(false), 2000);
      }
    } catch (err) {
      console.error('Fail to copy: ', err);
    }
  };

  return (
    <Box>
      <BoxHeader title="URL Shortner" to="/list" toText="List" />
      <h2 className="mt-6">Enter the URL to shorten</h2>
      <ShortUrlForm disable={!!data} onSubmit={onSubmit} />
      {data && (
        <div className="mt-3 flex flex-col">
          <span className="text-green-800 italic my-3">Success! Here&#39;s your short URL:</span>
          <div>
            <span className="text-purple-700 mr-2">{data.shortUrl.shortUrl}</span>
            <button
              onClick={copyText}
              className="inline-flex items-center gap-2 px-4 py-1 rounded-sm border border-purple-700 text-purple-700 cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed"
            >
              <CopyIcon size={18} strokeWidth="3" /> Copy
            </button>
          </div>
        </div>
      )}
      {copiedMsg && <span className="text-green-800">Copied.</span>}
    </Box>
  );
}
