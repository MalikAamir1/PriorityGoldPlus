import React from 'react';
import {View} from 'react-native';
import {PieChart} from 'react-native-chart-kit';

export const PieChartComponent = () => {
  const data = [
    {
      name: 'Platinum',
      population: 0.6,
      color: '#687161',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Gold',
      population: 0.8,
      color: '#828282',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Palladium',
      population: 0.4,
      color: '#A5B1AE',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Silver',
      population: 0.2,
      color: '#F8F8F8',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];

  const chartConfig = {
    backgroundColor: 'black',
    backgroundGradientFrom: 'black',
    backgroundGradientTo: 'black',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  return (
    <View>
      <PieChart
        data={data}
        width={300}
        height={200}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};
