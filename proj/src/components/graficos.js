import React,{useState} from 'react';
import { StyleSheet, Text, View, ImageBackground, requireNativeComponent } from 'react-native';
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'
export default function Graficos({XValues,YValues})
{
    const axesSvg = { fontSize: 10, fill: 'grey' };
    const verticalContentInset = { top: 10, bottom: 10 }
    const xAxisHeight = 30
    
    return(
        <View >
  <View style={{ height: 200, padding: 20, flexDirection: 'row' }}>
                <YAxis
                    data={YValues}
                    style={{ marginBottom: xAxisHeight }}
                    contentInset={verticalContentInset}
                    svg={axesSvg}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <LineChart
                        style={{ flex: 1 }}
                        data={YValues}
                        contentInset={verticalContentInset}
                        svg={{ stroke: 'rgb(134, 65, 244)' }}
                    >
                        <Grid/>
                    </LineChart>
                    <XAxis
                        style={{ marginHorizontal: -10, height: xAxisHeight }}
                        data={YValues}
                        formatLabel={(value, index) => XValues[index]}
                        contentInset={{ left: 10, right: 10 }}
                        svg={axesSvg}
                    />
                </View>
            </View>
    </View>
    );
}