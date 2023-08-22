import { BSP_BALANCE, GET_ATTACHMENT_PERMISSION } from '../../graphql/queries/Account';

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

export const GET_ATTACHMENT_PERMISSION_MOCK = {
  request: {
    query: GET_ATTACHMENT_PERMISSION,
  },
  result: {
    data: {
      attachmentsEnabled: false,
    },
  },
};
