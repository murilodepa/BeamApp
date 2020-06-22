import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, ImageBackground, requireNativeComponent, TextInput, TouchableOpacity } from 'react-native';
import Forca from './src/components/Forca';
import { Input } from 'react-native-elements';
import Chart from './src/components/graficos'
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'
import ButtonOp from './src/components/customButton';
import { Dimensions } from 'react-native';
import Modal, { ModalContent, SlideAnimation, ModalButton } from 'react-native-modals';

export default function Result({ navigation: { goBack }, route }) {
  var data = [];
  var datay = [];
  var datax = [];
  var dataxFletor = [];
  var datayFletor = [];
  var MomentoInercia=0;
  var TensaoMaxima=0;
  const axesSvg = { fontSize: 10, fill: 'grey' };
  const verticalContentInset = { top: 10, bottom: 10 }
  const xAxisHeight = 30
  let j = 0, i = 0, aux = 0, k = 0;
  const [Texto, setTexto] = useState("Cortante");
  const [CodButton, setCodButton] = useState(0);
  const [Charts, setCharts] = useState(0);
  const [Modal1, setModal] = useState(false);
  const [Posx, setPosx] = useState(-1);
  const [Tensao,setTensao]=useState(0);
  const [TextEx,setTextEx]=useState(0);
  const [EspessuraViga, setEspessuraViga] = useState(-1);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  while (aux < route.params.vetCortante.length) {
    for (j = 0; j < 2; j++) {
      if (j == 0) {
        datay[i + k] = route.params.vetCortante[i].Y;
        datax[i + k] = route.params.vetCortante[i].X;
      }
      else {
        if (aux != route.params.vetCortante.length - 1) {
          k++;
          datay[i + k] = route.params.vetCortante[i].Y;
          datax[i + k] = route.params.vetCortante[i + 1].X;
        }

      }
    }
    i++;
    aux++;
  }


  for (i = 0; i < route.params.vetFletor.length; i++) {
    dataxFletor[i] = route.params.vetFletor[i].X;
    datayFletor[i] = route.params.vetFletor[i].Y;
  }

  var calcular = () => {
    var j = 0;
    var calculoFletor = 0;
    while (parseFloat(route.params.vet[j].POS) < parseFloat(Posx)) {
      
      if(route.params.ContEngaste==1 && parseFloat(route.params.Dist) == parseFloat(route.params.vet[j].POS))
      {      
        calculoFletor+=parseFloat(route.params.MEngaste);
      }
      else
      {
        calculoFletor += parseFloat(route.params.vet[j].N * (Posx - route.params.vet[j].POS));
      }
      j++;
    }

    MomentoInercia = ((EspessuraViga * Math.pow(route.params.Altura, 3)) / 12);

    TensaoMaxima = ((calculoFletor * (route.params.Altura / 2)) / MomentoInercia).toFixed(3);
    setTensao(TensaoMaxima);
  }

  return (
    <View style={styles.container}>
      <Modal
        visible={Modal1}
        modalAnimation={new SlideAnimation({
          slideFrom: 'bottom',
        })}
        height={150}>
        <ModalContent style={styles.modal}>
          <View style={{ paddingTop: (windowHeight / 40), flexDirection: 'row', }}>
            <Text style={{ fontSize: 16, color: "#393D3F" }}>Valor Espessura: </Text>
            <TextInput placeholder="Digite um valor"
              keyboardType="numeric"
              Type='flat'
              style={{ height: 25, width: 100, borderColor: 'gray', borderBottomWidth: 3, borderBottomColor: "#6F9AA4" }}
              onChangeText={(texto) => {
                setEspessuraViga(parseFloat(texto));
              }
              }></TextInput>
          </View>
          <View style={{ paddingTop: (windowHeight / 40), flexDirection: 'row', }}>
            <Text style={{ fontSize: 16, color: "#393D3F" }}>Ponto específico: </Text>
            <TextInput placeholder="Digite um valor"
              keyboardType="numeric"
              Type='flat'
              style={{ height: 25, width: 100, borderColor: 'gray', borderBottomWidth: 3, borderBottomColor: "#6F9AA4" }}
              onChangeText={(texto) => {
                setPosx(parseFloat(texto));
              }
              }></TextInput>
          </View>
          <View style={{ paddingTop: windowHeight / 30 }}>
            <TouchableOpacity style={styles.button}
              onPress={() => { setModal(false); calcular(); setTextEx(1)}}>
              <Text style={{ color: "white" }}>Ok</Text>
            </TouchableOpacity>
          </View>
        </ModalContent>

      </Modal>



      <View style={styles.container2}>
        <Text style={styles.fonte_titulo} >BeamApp - Flexão de Vigas</Text>
      </View >
      <View style={styles.container3}>
        <View style={{ paddingBottom: windowHeight / 2 }}>
        {TextEx >= '1' &&
          <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
            <Text style={{fontSize:16}}>Tensão Máxima:{Tensao}Pa</Text>
            </View>}
          {Charts >= '1' && <Chart YValues={CodButton == 0 ? datay : datayFletor} XValues={CodButton == 0 ? datax : dataxFletor}></Chart>}
          {Charts >= '1' &&
          <View style={{paddingLeft:windowWidth/4.75}}>
          <Text>*Gráfico eixo X não possui escala.</Text>
          </View>}
        </View>

      </View>
      <View position="absolute" style={{ paddingTop: windowHeight / 2 }}>
        <ImageBackground style={{ height: (windowHeight) / 1.5, width: (windowWidth) }} source={require('./src/img/Bottombackground.png')}>
          <View style={{ flexDirection: "row", justifyContent: 'center', paddingTop: windowHeight / 20 }}>
            <Text style={{ fontSize: 18, color: "#6F9AA4" }}>{Texto}</Text>
          </View>
          <View style={{ paddingTop: windowHeight / 30 }}>
            <ButtonOp text={"Enviar"} windowHeight={windowHeight} windowWidth={windowWidth} onPressCen={() => {
              if (CodButton == 3) {
                goBack();
              }
              if (CodButton == 0) {
                setCharts(1);
              }

              if (CodButton == 1) {
                setCharts(1);
              }
              if (CodButton == 2) {
                setModal(true);
              }

            }}
              onPressEsq={() => {
                setCharts(0);
                setTextEx(0);
                if (CodButton - 1 < 0) {
                  setCodButton(3);
                  setTexto("Voltar");
                }
                else {
                  if (CodButton - 1 == 1) {
                    setCodButton(1);
                    setTexto("Fletor");
                  }
                  else {
                    if (CodButton - 1 == 0) {
                      setCodButton(0);
                      setTexto("Cortante")
                    }
                    else {
                      setCodButton(2);
                      setTexto("Ponto");
                    }
                  }
                }
              }}


              onPressDir={() => {
                setCharts(0);
                setTextEx(0);
                if (CodButton + 1 == 4) {
                  setCodButton(0);
                  setTexto("Cortante");
                }
                else {
                  if (CodButton + 1 == 1) {
                    setCodButton(1);
                    setTexto("Fletor");
                  }
                  else {
                    if (CodButton + 1 == 2) {
                      setCodButton(2);
                      setTexto("Ponto")
                    }
                    else {
                      setCodButton(3);
                      setTexto("Voltar");
                    }
                  }
                }
              }}

            ></ButtonOp>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: '#6F9AA4',
    justifyContent: 'space-evenly',
    alignItems: 'center'

  },
  chart: {
    width: 200,
    height: 200,
  },

  container2:
  {
    flexDirection: "column",
    justifyContent: 'flex-end',
    alignItems: "center",
    width: '100%',
    height: '8%',

  },

  container3: {
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: '#F5F5F5',
    width: '100%',
    height: '92%',
  },
  fonte_titulo:
  {
    fontSize: 18,
    color: 'white',

  },
  modal: {
    flexDirection: "column",
    backgroundColor: '#F5F5F5',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,

  },
  button: {
    height: 20,
    borderRadius: 10,
    backgroundColor: '#393D3F',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
  }

});