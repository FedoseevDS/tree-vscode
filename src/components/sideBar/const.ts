import { Node } from 'types';

export const data: Array<Node> = [
  {
    children: [
      {
        children: [
          {
            id: '1',
            name: '123124.txt',
            type: 'file',
          },
          {
            children: [
              {
                children: [
                  {
                    id: '2',
                    name: '123124.txt',
                    type: 'file',
                  },
                ],
                id: '3',
                name: 'asddf',
                type: 'folder',
              },
              {
                id: '4',
                name: 'asd123.txt',
                type: 'file',
              },
            ],
            id: '5',
            name: 'asddf',
            type: 'folder',
          },
        ],
        id: '6',
        name: 'asd',
        type: 'folder',
      },
      {
        children: [
          {
            id: '7',
            name: '123124.txt',
            type: 'file',
          },
        ],
        id: '8',
        name: 'asddf',
        type: 'folder',
      },
      {
        id: '9',
        name: 'asd123.txt',
        type: 'file',
      },
    ],
    id: '10',
    name: 'one array',
    type: 'folder',
  },
  {
    children: [
      {
        id: '11',
        name: 'adfadfadfaf.txt',
        type: 'file',
      },
    ],
    id: '12',
    name: 'two array',
    type: 'folder',
  },
  {
    children: [],
    id: '13',
    name: 'three array',
    type: 'folder',
  },
  {
    children: [],
    id: '14',
    name: 'four array',
    type: 'folder',
  },
];
