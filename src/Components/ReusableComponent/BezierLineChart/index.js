import React from 'react';
import {View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

export const BezierLineChart = () => {
  const data = {
    labels: [
      '1:00',
      '2:00',
      '3:00',
      '4:00',
      '5:00',
      '6:00',
      '7:00',
      '8:00',
      '9:00',
    ],
    datasets: [
      {
        data: [50, 60, 15, 20, 25, 30, 28, 70],
        color: () => `#E5E4E2`,
        strokeWidth: 2,
      },
      {
        data: [40, 30, 65, 30, 85, 40, 30, 60],
        color: (opacity = 6) => `#E5E4E2`,
        strokeWidth: 2,
      },
      {
        data: [20, 15, 30, 10, 20, 60, 30, 40],
        color: (opacity = 7) => `#FFD700`,
        strokeWidth: 2,
      },
      {
        data: [5, 2, 25, 27, 39, 17, 20],
        color: (opacity = 8) => `#E5E4E2`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: 'white',
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    color: (opacity = 1) => `#C48614`,
  };

  return (
    <View style={{flex: 1, width: '100%', marginTop: 10}}>
      <LineChart
        data={data}
        width={350}
        height={200}
        chartConfig={chartConfig}
        bezier
        style={{borderRadius: 16}}
        withDots={false}
        withInnerLines={false}
        withOuterLines={false}

        // getDotColor={'pink'}
      />
    </View>
  );
};
