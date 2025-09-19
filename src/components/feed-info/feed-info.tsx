import { FC } from 'react';
import { useSelector } from 'react-redux';
import { TOrder, TOrdersData } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import {
  selectFeedOrders,
  selectFeedTotal,
  selectFeedTotalToday
} from '../../services/selectors/selectors';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useSelector(selectFeedOrders);
  const total: number = useSelector(selectFeedTotal);
  const totalToday: number = useSelector(selectFeedTotalToday);

  const feed: TOrdersData = {
    orders,
    total,
    totalToday
  };

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
