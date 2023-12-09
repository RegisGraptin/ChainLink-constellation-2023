import type {
    QueryFunctionContext,
    UseQueryOptions,
  } from '@tanstack/react-query'
  import type { FetchEnsNameResult } from '@wagmi/core'
  import { getPublicClient } from '@wagmi/core'
  import { Address, getAddress } from 'viem'
  
  import { sepolia, useChainId, useQuery } from 'wagmi'
  
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
  
  export type FetchEnsNameArgs = {
    /** Address to lookup */
    address: Address
    /** Chain id to use for Public Client */
    chainId?: number
  }
  
  type UseEnsNameArgs = Partial<FetchEnsNameArgs>
  type UseEnsNameConfig = QueryConfig<FetchEnsNameResult, Error>
  
  type QueryKeyArgs = UseEnsNameArgs
  type QueryKeyConfig = Pick<UseEnsNameConfig, 'scopeKey'>
  
  async function fetchEnsName({
    address,
    chainId,
  }: FetchEnsNameArgs): Promise<FetchEnsNameResult> {
    const publicClient = getPublicClient({ chainId })
  
    if (chainId === sepolia.id) {
      return publicClient.getEnsName({
        address: getAddress(address),
        universalResolverAddress: '0x21B000Fd62a880b2125A61e36a284BB757b76025',
      })
    }
  
    return publicClient.getEnsName({
      address: getAddress(address),
    })
  }
  
  function queryKey({
    address,
    chainId,
    scopeKey,
  }: QueryKeyArgs & QueryKeyConfig) {
    return [{ entity: 'ensName', address, chainId, scopeKey }] as const
  }
  
  function queryFn({
    queryKey: [{ address, chainId }],
  }: QueryFunctionArgs<typeof queryKey>) {
    if (!address) throw new Error('address is required')
  
    return fetchEnsName({ address, chainId })
  }
  
  export function useEnsName({
    address,
    cacheTime,
    chainId: chainId_,
    enabled = true,
    scopeKey,
    staleTime = 1_000 * 60 * 60 * 24, // 24 hours
    suspense,
  }: UseEnsNameArgs & UseEnsNameConfig = {}) {
    const chainId = useChainId({ chainId: chainId_ })
  
    return useQuery(queryKey({ address, chainId, scopeKey }), queryFn, {
      cacheTime,
      enabled: Boolean(enabled && address && chainId),
      staleTime,
      suspense,
    })
  }