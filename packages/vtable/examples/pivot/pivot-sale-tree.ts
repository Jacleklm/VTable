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
