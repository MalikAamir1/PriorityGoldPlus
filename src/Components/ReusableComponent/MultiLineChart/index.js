import React from 'react';
import {View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

const MultiLineChart = () => {
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
      '10:00',
      '11:00',
      '12:00',
    ],
    datasets: [
      {
        data: [2.5, 3, 4, 3, 2.8, 2.9, 4, 2.3, 3],
        color: (opacity = 1) => `rgba(255, 140, 0, ${opacity})`,
        strokeWidth: 2,
      },
      // Add more datasets for additional lines
      {
        data: [2.3, 3.2, 3.6, 2.5, 2.6, 2.2, 3.5, 2.1, 2.5],
        color: (opacity = 1) => `rgba(139, 69, 19, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: [1.5, 2.3, 2.6, 2, 2.1, 2, 3.1, 1.8, 2],
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: [1, 1.9, 2, 1.5, 1.8, 1.5, 2.5, 1.5, 1.8],
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const showDotIndex = 2; // Index of the data point where you want to show the dot

  const chartConfig = {
    backgroundGradientFrom: 0,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: 0,
    backgroundGradientToOpacity: 0,
    fillShadowGradientFrom: '#f7e58f',
    fillShadowGradientTo: '#ffffff00',
    fillShadowGradientFromOpacity: 0,
    fillShadowGradientToOpacity: 0,
    fillShadowGradientFromOffset: 0,
    fillShadowGradientToOffset: 1,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    // backgroundColor: 'transparent',
    // backgroundColor: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
    // strokeWidth: 2,
    // barPercentage: 100,
    propsForLabels: {
      fontSize: 8.5,
    },
    strokeWidth: 2,
  };

  return (
    <View>
      <LineChart
        data={data}
        // width={data.labels.length * 10 + 260}
        width={data.labels.length * 10 + 230}
        height={160}
        withInnerLines={false}
        chartConfig={chartConfig}
        bezier
        // withDots={false}
        yLabelsOffset={5}
        xLabelsOffset={-10}
        style={{
          //   marginTop: 40,
          marginLeft: 40,
          //   fontSize: 1,
        }}
        hidePointsAtIndex={Array.from({length: 9}, (v, k) =>
          k !== showDotIndex ? k : [],
        )}
        yAxisSuffix="k"></LineChart>
    </View>
  );
};

export default MultiLineChart;