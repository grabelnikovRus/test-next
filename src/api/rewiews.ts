import { queryOptions } from '@tanstack/react-query'
import { api } from './'

export const reviewsOptions = queryOptions({
  queryKey: ['reviews'],
  queryFn: api.getReviews,
});
