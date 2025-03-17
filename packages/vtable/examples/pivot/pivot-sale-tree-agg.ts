import * as VTable from '../../src';
const PivotTable = VTable.PivotTable;
const CONTAINER_ID = 'vTable';
const generateData = () => {
  const channels = ['线上'];
  const platforms = ['淘宝', '京东', '抖音'];
  const shops = ['旗舰店', '三方店'];
  const daysInMonth = 25;
  const data: any[] = [];
  const months = [3, 4];
  for (const month of months) {
    for (let day = 1; day <= daysInMonth; day++) {
      // const week = Math.ceil(day / 7);
      channels.forEach(channel => {
        platforms.forEach(platform => {
          shops.forEach(shop => {
            data.push({
              channel,
              platform,
              shop: `${platform}${shop}`,
              month,
              // week: week.toString(),
              day: day.toString(),
              curr_price: 3599 + Math.floor(Math.random() * 8) * 50
            });
            // 一个行列维度弄成有两个 curr_price，用来测试聚合
            // data.push({
            //   channel,
            //   platform,
            //   shop: `${platform}${shop}`,
            //   month,
            //   day: day.toString(),
            //   curr_price: 3599 + Math.floor(Math.random() * 8) * 50
            // });
            data.push({
              channel,
              platform,
              shop: `${platform}${shop}`,
              month,
              day: day.toString(),
              origin_price: 4099 + Math.floor(Math.random() * 3) * 100
            });
            data.push({
              channel,
              platform,
              shop: `${platform}${shop}`,
              month,
              day: day.toString(),
              sale_count: Math.floor(Math.random() * 100)
            });
          });
        });
      });
    }
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
      },
      {
        indicatorKey: 'avg_price',
        title: '均价'
      },
      {
        indicatorKey: 'discount',
        title: '优惠力度'
      },
      {
        indicatorKey: 'sale_count',
        title: '销量'
      }
    ],
    dataConfig: {
      // 过滤：剔除 3599 以下的，太便宜，不计入统计
      filterRules: [
        {
          filterFunc: (record: Record<string, any>) => {
            if (!record?.curr_price) {
              return true;
            }
            return Number(record.curr_price) >= 3699;
          }
        }
      ],
      // 排序
      sortRules: [
        {
          sortField: 'platform',
          sortBy: ['抖音', '淘宝', '京东']
        }
      ],
      // 聚合: avg
      aggregationRules: [
        {
          // 按当前配置，其实是会取这个维度下所有的 curr_price 进行聚合
          // 由于这个例子中只有一个 curr_price，所以直接等于 curr_price
          // 可以在 records 中让一个行列维度下有两个数据
          indicatorKey: 'avg_price',
          field: ['curr_price'],
          aggregationType: VTable.TYPES.AggregationType.AVG,
          formatFun: (value: number) => {
            return value.toFixed(1);
          }
        }
      ],
      // 小计
      totals: {
        row: {
          showGrandTotals: true,
          showSubTotals: true,
          subTotalsDimensions: ['month'],
          showGrandTotalsOnTop: false
        }
      },
      // 衍生字段：week
      derivedFieldRules: [
        {
          fieldName: 'week',
          derivedFunc: (record: Record<string, any>) => {
            return Math.ceil(Number(record.day) / 7);
          }
        }
      ],
      // 计算字段：优惠力度
      calculatedFieldRules: [
        {
          key: 'discount',
          dependIndicatorKeys: ['origin_price', 'curr_price'],
          calculateFun: (dependFieldsValue: any) => {
            return dependFieldsValue.origin_price - dependFieldsValue.curr_price;
          }
        }
      ]
    },
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
