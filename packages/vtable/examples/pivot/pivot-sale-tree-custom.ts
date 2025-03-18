import * as VTable from '../../src';

const PivotTable = VTable.PivotTable;
const CONTAINER_ID = 'vTable';

const generateData = () => {
  const channels = ['线上'];
  const platforms = ['淘宝', '京东', '抖音'];
  const shops = ['旗舰店', '三方店'];
  const daysInMonth = 25;

  const data: any[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const week = Math.ceil(day / 7);
    channels.forEach(channel => {
      platforms.forEach(platform => {
        shops.forEach(shop => {
          data.push({
            channel,
            platform,
            shop: `${platform}${shop}`,
            month: '3',
            week: week.toString(),
            day: day.toString(),
            origin_price: 4099 + Math.floor(Math.random() * 3) * 100
          });
          data.push({
            channel,
            platform,
            shop: `${platform}${shop}`,
            month: '3',
            week: week.toString(),
            day: day.toString(),
            curr_price: 3599 + Math.floor(Math.random() * 8) * 50
          });
        });
      });
    });
  }

  return data;
};

export function createTable() {
  const option: VTable.PivotTableConstructorOptions = {
    container: document.getElementById(CONTAINER_ID),
    records: generateData(),
    columns: [
      {
        dimensionKey: 'channel',
        title: '渠道'
      },
      {
        dimensionKey: 'platform',
        title: '平台'
      },
      {
        dimensionKey: 'shop',
        title: '店铺'
      }
    ],
    columnTree: [
      {
        value: '线上',
        dimensionKey: 'channel',
        children: [
          {
            value: '淘宝',
            dimensionKey: 'platform',
            children: [
              {
                value: '淘宝旗舰店',
                dimensionKey: 'shop',
                children: [
                  {
                    value: '原价',
                    indicatorKey: 'origin_price'
                  },
                  {
                    value: '券后价',
                    indicatorKey: 'curr_price'
                  }
                ]
              },
              {
                value: '淘宝三方店',
                dimensionKey: 'shop',
                children: [
                  {
                    value: '原价',
                    indicatorKey: 'origin_price'
                  },
                  {
                    value: '券后价',
                    indicatorKey: 'curr_price'
                  }
                ]
              }
            ]
          },
          {
            value: '京东',
            dimensionKey: 'platform',
            children: [
              {
                value: '京东旗舰店',
                dimensionKey: 'shop',
                children: [
                  {
                    value: '原价',
                    indicatorKey: 'origin_price'
                  },
                  {
                    value: '券后价',
                    indicatorKey: 'curr_price'
                  }
                ]
              },
              {
                value: '京东三方店',
                dimensionKey: 'shop',
                children: [
                  {
                    value: '原价',
                    indicatorKey: 'origin_price'
                  },
                  {
                    value: '券后价',
                    indicatorKey: 'curr_price'
                  }
                ]
              }
            ]
          },
          {
            value: '抖音',
            dimensionKey: 'platform',
            children: [
              {
                value: '抖音旗舰店',
                dimensionKey: 'shop',
                children: [
                  {
                    value: '原价',
                    indicatorKey: 'origin_price'
                  },
                  {
                    value: '券后价',
                    indicatorKey: 'curr_price'
                  }
                ]
              },
              {
                value: '抖音三方店',
                dimensionKey: 'shop',
                children: [
                  {
                    value: '原价',
                    indicatorKey: 'origin_price'
                  },
                  {
                    value: '券后价',
                    indicatorKey: 'curr_price'
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    rows: [
      {
        dimensionKey: 'month',
        title: '月',
        headerFormat: value => {
          return value + '月';
        }
      },
      {
        dimensionKey: 'week',
        title: 'week',
        headerFormat: value => {
          return 'week' + value;
        }
      },
      {
        dimensionKey: 'day',
        title: '日',
        headerFormat: value => {
          return value + '日';
        }
      }
    ],
    rowTree: [
      {
        value: '3',
        dimensionKey: 'month',
        children: [
          {
            value: '1',
            dimensionKey: 'week',
            children: [
              {
                value: '1',
                dimensionKey: 'day'
              },
              {
                value: '2',
                dimensionKey: 'day'
              },
              {
                value: '3',
                dimensionKey: 'day'
              },
              {
                value: '4',
                dimensionKey: 'day'
              },
              {
                value: '5',
                dimensionKey: 'day'
              },
              {
                value: '6',
                dimensionKey: 'day'
              },
              {
                value: '7',
                dimensionKey: 'day'
              }
            ]
          },
          {
            value: '2',
            dimensionKey: 'week',
            children: [
              {
                value: '8',
                dimensionKey: 'day'
              },
              {
                value: '9',
                dimensionKey: 'day'
              },
              {
                value: '10',
                dimensionKey: 'day'
              },
              {
                value: '11',
                dimensionKey: 'day'
              },
              {
                value: '12',
                dimensionKey: 'day'
              },
              {
                value: '13',
                dimensionKey: 'day'
              },
              {
                value: '14',
                dimensionKey: 'day'
              }
            ]
          },
          {
            value: '3',
            dimensionKey: 'week',
            children: [
              {
                value: '15',
                dimensionKey: 'day'
              },
              {
                value: '16',
                dimensionKey: 'day'
              },
              {
                value: '17',
                dimensionKey: 'day'
              },
              {
                value: '18',
                dimensionKey: 'day'
              },
              {
                value: '19',
                dimensionKey: 'day'
              },
              {
                value: '20',
                dimensionKey: 'day'
              },
              {
                value: '21',
                dimensionKey: 'day'
              }
            ]
          },
          {
            value: '4',
            dimensionKey: 'week',
            children: [
              {
                value: '22',
                dimensionKey: 'day'
              },
              {
                value: '23',
                dimensionKey: 'day'
              },
              {
                value: '24',
                dimensionKey: 'day'
              },
              {
                value: '25',
                dimensionKey: 'day'
              }
            ]
          }
        ]
      }
    ],
    indicators: [
      {
        indicatorKey: 'origin_price',
        title: '原价'
      },
      {
        indicatorKey: 'curr_price',
        title: '券后价'
      }
    ],
    corner: {
      titleOnDimension: 'column'
    },
    rowExpandLevel: 3,
    widthMode: 'autoWidth',
    rowHierarchyType: 'tree'
  };
  const tableInstance = new PivotTable(option);

  console.log('dataset', tableInstance.dataset);
  // 只为了方便控制太调试用，不要拷贝
  window.tableInstance = tableInstance;
}
