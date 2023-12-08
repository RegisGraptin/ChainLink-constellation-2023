// Placeholder until wagmi natively supports ENS Sepolia or adds a `universalResolverAddress` param
import type {
    QueryFunctionContext,
    UseQueryOptions,
  } from '@tanstack/react-query'
  import { getPublicClient } from '@wagmi/core'
  import { Address, useChainId, useQuery } from 'wagmi'
  
  type QueryFunctionArgs<T extends (...args: any) => any> = QueryFunctionContext<
    ReturnType<T>
  >
  
  type QueryConfig<TData, TError, TSelectData = TData> = Pick<
    UseQueryOptions<TData, TError, TSelectData>,
    | 'cacheTime'
    | 'enabled'
    | 'isDataEqual'
    | 'staleTime'
    | 'structuralSharing'
    | 'suspense'
  > & {
    /** Scope the cache to a given context. */
    scopeKey?: string
  }
  
  type UseEnsAddressArgs = Partial<FetchEnsAddressArgs>
  type UseEnsAddressConfig = QueryConfig<FetchEnsAddressResult, Error>
  
  type QueryKeyArgs = UseEnsAddressArgs
  type QueryKeyConfig = Pick<UseEnsAddressConfig, 'scopeKey'>
  
  type FetchEnsAddressArgs = {
    /** Name to lookup */
    name: string
    /** Chain id to use for Public Client */
    chainId?: number
    /** Universal Resolver address */
    universalResolverAddress?: Address | undefined
  }
  
  type FetchEnsAddressResult = string | null
  
  async function fetchEnsAddress({
    name,
    chainId,
    universalResolverAddress,
  }: FetchEnsAddressArgs): Promise<FetchEnsAddressResult> {
    const publicClient = getPublicClient({ chainId })
    return publicClient.getEnsAddress({
      name,
      universalResolverAddress,
    })
  }
  
  function queryKey({
    name,
    chainId,
    universalResolverAddress,
    scopeKey,
  }: QueryKeyArgs & QueryKeyConfig) {
    return [
      { entity: 'ensText', name, universalResolverAddress, chainId, scopeKey },
    ] as const
  }
  
  function queryFn({
    queryKey: [{ name, universalResolverAddress, chainId }],
  }: QueryFunctionArgs<typeof queryKey>) {
    if (!name) throw new Error('name is required')
    return fetchEnsAddress({ name, universalResolverAddress, chainId })
  }
  
  export function useEnsAddress({
    name,
    cacheTime,
    chainId: chainId_,
    enabled = true,
    scopeKey,
    staleTime = 1_000 * 60 * 60 * 24, // 24 hours
    suspense,
  }: UseEnsAddressArgs & UseEnsAddressConfig = {}) {
    const chainId = useChainId({ chainId: chainId_ })
    const universalResolverAddress = '0x21B000Fd62a880b2125A61e36a284BB757b76025'
  
    return useQuery(
      queryKey({ name, universalResolverAddress, chainId, scopeKey }),
      queryFn,
      {
        cacheTime,
        enabled: Boolean(enabled && name && chainId),
        staleTime,
        suspense,
      }
    )
  }