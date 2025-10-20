export const mockFeedData = {
  success: true,
  orders: [
    {
      _id: '1',
      ingredients: ['ing1', 'ing2'],
      status: 'done',
      name: 'Order 1',
      number: 12345,
      createdAt: '2025-01-01',
      updatedAt: '2025-01-01'
    },
    {
      _id: '2',
      ingredients: ['ing3', 'ing4'],
      status: 'pending',
      name: 'Order 2',
      number: 12346,
      createdAt: '2025-01-02',
      updatedAt: '2025-01-02'
    }
  ],
  total: 100,
  totalToday: 10
};
