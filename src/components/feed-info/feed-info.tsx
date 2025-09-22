import { FeedInfoUI, Preloader } from '@ui';
import { TOrder } from '@utils-types';
import { FC } from 'react';

import { useSelector } from '../../services/store';

import { selectFeed } from '../../services/selectors/selectors';

export const FeedInfo: FC = () => {
  const getOrders = (orders: TOrder[], status: string): number[] =>
    orders
      .filter((item) => item.status === status)
      .map((item) => item.number)
      .slice(0, 20);

  const { orders, total, totalToday } = useSelector(selectFeed);
  const loading = useSelector((state) => state.feed.loading);
  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  const feed = {
    total,
    totalToday
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
