'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { twMerge } from 'tailwind-merge';

const addShortUrlFormSchema = z.object({
  originalUrl: z.string().url('Invalid URL'),
});

const updateSlugFormSchema = z.object({
  originalUrl: z.string(),
});

export type AddShortUrlForm = z.infer<typeof addShortUrlFormSchema>;

type Props = {
  onSubmit: (input: AddShortUrlForm) => void;
  disable: boolean;
  updateData?: string;
  isCreate?: boolean;
};

export const ShortUrlForm = ({ onSubmit, disable, updateData, isCreate = true }: Props) => {
  const preloadValues = {
    originalUrl: updateData,
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AddShortUrlForm>({
    defaultValues: preloadValues,
    resolver: zodResolver(isCreate ? addShortUrlFormSchema : updateSlugFormSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col w-full my-2">
        <label htmlFor="originalUrl">{isCreate ? 'URL' : 'New slug'}</label>
        <input
          className={twMerge(
            'border border-gray-400 p-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-500',
            errors?.originalUrl?.message && 'border-red-500 focus:ring-red-500',
          )}
          {...register('originalUrl')}
        />
        {errors.originalUrl && <span className="text-red-400">{errors.originalUrl.message}</span>}
      </div>
      <button
        className="px-6 py-2 rounded-sm bg-purple-700 text-white cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed"
        type="submit"
        disabled={disable}
      >
        {isCreate ? 'Shorten' : 'Update'}
      </button>
    </form>
  );
};
