import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

export default function CustomButton ({text, onPressCen,windowHeight,windowWidth,onPressEsq,onPressDir}) {
    return (
        <View style={{ flexDirection: "row", justifyContent: "space-evenly", paddingTop: windowHeight / 20 }}>
        <View style={{ paddingTop: windowHeight / 25 }}>
            <TouchableOpacity onPress={onPressEsq}>
          <View style={{
            borderRightWidth: windowWidth / 15, borderBottomWidth: 2 * windowWidth / 15, borderLeftWidth: windowWidth / 15, width: 0,
            height: 0,
            backgroundColor: 'transparent', borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: '#6F9AA4', transform: [
              { rotate: '270deg' }
            ]
          }}></View>
          </TouchableOpacity>
        </View>

        <View style={styles.circle}>
            <TouchableOpacity onPress={onPressCen}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{ text }</Text>
                </View>
            </TouchableOpacity>
        </View>

        <View style={{ paddingTop: windowHeight / 25 }}>
            <TouchableOpacity onPress={onPressDir}>
                <View style={{
                  borderRightWidth: windowWidth / 15, borderBottomWidth: 2 * windowWidth / 15, borderLeftWidth: windowWidth / 15, width: 0,
                  height: 0,
                  backgroundColor: 'transparent', borderLeftColor: 'transparent',
                  borderRightColor: 'transparent',
                  borderBottomColor: '#6F9AA4', transform: [
                    { rotate: '90deg' }
                  ]
                }}></View>
                </TouchableOpacity>
              </View>
        </View>
    );
};

const styles = StyleSheet.create({
    circle: {
		backgroundColor: '#393D3F',
		width: 100,
		height: 100,
		alignItems: 'center',
		justifyContent: 'center',
   		borderRadius: 100/2
	},
    button: {
        backgroundColor: '#E6E5DA',
        width: 80,
        height: 80,
        alignItems: 'center',
		justifyContent: 'center',
   		borderRadius: 100/2
    },
    buttonText: {
        color: '#6F9AA4',
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
});