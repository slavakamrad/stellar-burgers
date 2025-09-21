import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchFeed } from '../../services/slices/feedSlice';
import { Preloader } from '../../components/ui/preloader/preloader';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector((state) => state.feed.orders);
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.feed.loading);

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  const userOrders = orders.filter((order) => order.name === user?.name);

  if (loading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={userOrders} />;
};
