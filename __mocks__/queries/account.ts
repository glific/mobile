import { BSP_BALANCE } from '../../graphql/queries/Account';

export const BSP_BALANCE_MOCK = [
  {
    request: {
      query: BSP_BALANCE,
    },
    result: {
      data: {
        bspbalance: '{"balance":10.04}',
      },
    },
  },
];
