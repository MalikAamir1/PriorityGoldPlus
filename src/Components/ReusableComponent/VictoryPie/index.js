import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {VictoryPie} from 'victory-native';

export default function VictoryDonutChart(props) {
  // console.log('props.sampleData', props.sampleData);
  const totalX = props.sampleData.reduce((sum, item) => sum + parseFloat(item.x), 0);

  const labelsData = props.sampleData.map(item => ({
    // x: `${item.metalName}\n${item.x}%`,
    x: `${item.metalName}\n${((parseFloat(item.x) / totalX) * 100).toFixed(
      1,
    )}%`, // Calculate percentage dynamically
    y: item.y,
  }));

  return (
    // console.log('props.sampleData', props.sampleData)
    <View style={{width: 0}}>
      <VictoryPie
        width={250}
        height={250}
        data={labelsData}
        colorScale={props.colors}
        labelRadius={({innerRadius}) => innerRadius + 35}
        innerRadius={0} // Adjust this value to increase or decrease the donut width
        style={{
          labels: {
            fill: 'black',
            fontSize: 8,
            fontWeight: 'bold',
          },
          parent: {
            flexGrow: 1,
            marginLeft: -30,
          },
        }}
      />
    </View>
  );
}

// import React from 'react';
// import {View, StyleSheet} from 'react-native';
// import {Text} from 'react-native-paper';
// import {VictoryPie} from 'victory-native';

// export default function VictoryPieChart(props) {
//   return (
//     <View style={{width: 0}}>
//       <VictoryPie
//         width={200}
//         height={180}
//         data={props.sampleData}
//         colorScale={props.colors}
//         labelRadius={({innerRadius}) => innerRadius + 12}
//         radius={({datum}) => 40 + datum.y * 4.3}
//         innerRadius={25}
//         style={{
//           labels: {
//             fill: 'black',
//             fontSize: 10,
//             fontWeight: 'bold',
//           },
//           parent: {
//             flexGrow: 1,
//           },
//         }}
//         // startAngle={30} // Rotate the chart by 90 degrees clockwise
//         // endAngle={400} // End angle to create a full circle (90 + 360)
//       />
//       <View
//         style={{
//           color: 'black',
//           backgroundColor: '#C1C1C1',
//           width: 65,
//           fontSize: 16,
//           // alignSelf:'center',
//           position: 'absolute',
//           top: 60,
//           left: 70,
//           padding: 10,
//           borderRadius: 50,
//         }}>
//         <Text
//           style={{
//             color: 'black',
//             textAlign: 'center',
//             fontSize: 11,
//             borderColor: 'black',
//             borderWidth: 1,
//             borderRadius: 20,
//             padding: 6,
//             // fontWeight:'bold'
//           }}>
//           {props.lossAndProfit}
//           {/* 20% Profit */}
//         </Text>
//       </View>
//     </View>
//   );
// }
