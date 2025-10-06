import { TOrder } from "@utils-types";

export const mockOrders: TOrder[] = [
    {
      _id: '1',
      ingredients: ['ing1', 'ing2'],
      status: 'done',
      name: 'Test Order',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      number: 12345
    },
        {
      _id: '2',
      ingredients: ['ing3', 'ing4'],
      status: 'done',
      name: 'Test Order2',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      number: 12346
    }
  ];

export const mockOrder: TOrder = 
    {
      _id: '1',
      ingredients: [],
      status: 'done',
      name: 'Test Order',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      number: 12345
    }
  
