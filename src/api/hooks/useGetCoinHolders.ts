import {useQuery as useGraphqlQuery} from "@apollo/client/react/hooks/useQuery";
import {gql} from "@apollo/client";

export type CoinHolder = {
  owner_address: string;
  amount: number;
};

export function useGetCoinHolders(coin_type: string): {
  isLoading: boolean;
  error: any;
  data: CoinHolder[] | undefined;
} {
  const {loading, error, data} = useGraphqlQuery<{
    current_fungible_asset_balances: CoinHolder[];
  }>(
    gql`
      query GetFungibleAssetBalances($coin_type: String!) {
        current_fungible_asset_balances(
          where: {asset_type: {_eq: $coin_type}}
          limit: 100
          order_by: {amount: desc}
        ) {
          owner_address
          amount
        }
      }
    `,
    {variables: {coin_type}},
  );

  return {
    isLoading: loading,
    error,
    data: data?.current_fungible_asset_balances,
  };
}