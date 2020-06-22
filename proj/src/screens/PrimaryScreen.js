import React, { Component } from 'react';
import { TouchableWithoutFeedback,Keyboard,StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, ImageBackground, Image, Plataform, Platform } from 'react-native';
import { RadioButton, Paragraph } from 'react-native-paper';
import Draggable from 'react-native-draggable';
import { Dimensions } from 'react-native';
import Modal, { ModalContent, SlideAnimation, ModalButton } from 'react-native-modals';
import ForcaArrastavel from '../components/Forca';
import { Provider, connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import ButtonOp from './../components/customButton';
import ButtonNavigation from '../components/buttonNavigation';

class Tela extends Component {
  state = {
    altura: "?",
    largura: "?",
    value1: 1,
    pos1: 0,
    pos2: 0,
    Num_forca: 0,
    modal: false,
    apoioA: 0,
    apoioB: 0,
    forca: [{ posx: -1, posy: -1, forca: 0 },
    { posx: -1, posy: -1, forca: 0 },
    { posx: -1, posy: -1, forca: 0 },
    { posx: -1, posy: -1, forca: 0 },
    { posx: -1, posy: -1, forca: 0 },
    ],
    suporte: [{ posx: -1, posy: -1 }, { posx: -1, posy: -1 }, { posx: -1, posy: -1 }, { posx: -1, posy: -1 }],
    engaste:[{posx:-1,posy:-1}],
    buttonText: "Forca",
    buttonContador: 0,
    textContent1:" ",
    textContent2:" ",
  }

  
  enviar = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "GlobalReset",
    }
   );
  }

  render() {
    const { navigation } = this.props;
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const { checked } = this.state.value1;
    let suporteA1 = { posx: -2, posy: -2 };
    let suporteA2 = { posx: -2, posy: -2 };

    if (typeof this.props.Forca[0] === 'object' && (this.props.Forca[0].forca.posx != this.state.forca[0].posx || this.props.Forca[0].forca.posy != this.state.forca[0].posy)) {
      let forcaNum1 = Object.assign(this.props.Forca[0].forca, { forca: this.state.forca[0].forca });
      var leblancState = Object.assign({}, this.state);
      leblancState.forca[0] = forcaNum1;
      this.setState(leblancState);
    }

    if (typeof this.props.Forca2[0] === 'object' && (this.props.Forca2[0].forca.posx != this.state.forca[1].posx || this.props.Forca2[0].forca.posy != this.state.forca[1].posy)) {
      let forcaNum2 = Object.assign(this.props.Forca2[0].forca, { forca: this.state.forca[1].forca });
      var leblancState = Object.assign({}, this.state);
      leblancState.forca[1] = forcaNum2;
      this.setState(leblancState);
    }

    if (typeof this.props.Forca3[0] === 'object' && (this.props.Forca3[0].forca.posx != this.state.forca[2].posx || this.props.Forca3[0].forca.posy != this.state.forca[2].posy)) {
      let forcaNum3 = Object.assign(this.props.Forca3[0].forca, { forca: this.state.forca[2].forca });
      var leblancState = Object.assign({}, this.state);
      leblancState.forca[2] = forcaNum3;
      this.setState(leblancState);
    }

    if (typeof this.props.Forca4[0] === 'object' && (this.props.Forca4[0].forca.posx != this.state.forca[3].posx || this.props.Forca4[0].forca.posy != this.state.forca[3].posy)) {
      let forcaNum4 = Object.assign(this.props.Forca4[0].forca, { forca: this.state.forca[3].forca });
      var leblancState = Object.assign({}, this.state);
      leblancState.forca[3] = forcaNum4;
      this.setState(leblancState);
    }

    if (typeof this.props.Forca5[0] === 'object' && (this.props.Forca5[0].forca.posx != this.state.forca[4].posx || this.props.Forca5[0].forca.posy != this.state.forca[4].posy)) {
      let forcaNum5 = Object.assign(this.props.Forca5[0].forca, { forca: this.state.forca[4].forca });
      var leblancState = Object.assign({}, this.state);
      leblancState.forca[4] = forcaNum5;
      this.setState(leblancState);
    }

    if (typeof this.props.suporteA[0] === 'object' && (this.props.suporteA[0].forca.posx != this.state.suporte[0].posx || this.props.suporteA[0].forca.posy != this.state.suporte[0].posy)) {
      var leblancState = Object.assign({}, this.state);
      leblancState.suporte[0] = this.props.suporteA[0].forca;
      this.setState(leblancState);
    }

    if (typeof this.props.suporteA2[0] === 'object' && (this.props.suporteA2[0].forca.posx != this.state.suporte[1].posx || this.props.suporteA2[0].forca.posy != this.state.suporte[1].posy)) {
      var leblancState = Object.assign({}, this.state);
      leblancState.suporte[1] = this.props.suporteA2[0].forca;
      this.setState(leblancState);
    }

    if (typeof this.props.suporteB[0] === 'object' && (this.props.suporteB[0].forca.posx != this.state.engaste[0].posx || this.props.suporteB[0].forca.posy != this.state.engaste[0].posy)) {
      var leblancState = Object.assign({}, this.state);
      leblancState.engaste[0] = this.props.suporteB[0].forca;
      this.setState(leblancState);
    }

    return (
      <KeyboardAvoidingView enabled={false} behavior="height" style={{ flex: 1 }}>
        
        <View style={styles.container}>
          
          <View style={styles.container2}>
            <Text style={styles.fonte_titulo} >BeamApp - Flexão de Vigas</Text>
          </View >
          <View style={styles.container3}>

              {this.state.Num_forca >= '1' &&

                < ForcaArrastavel
                  cor="black"
                  largura={this.state.largura}
                  altura={this.state.altura}
                  dimension_x={windowWidth}
                  dimension_y={windowHeight}
                  Num_forca={this.state.Num_forca}
                  forca='f1'
                  ForcaModulo={this.state.forca[0].forca}

                  modal={Platform.OS ==="android"?false:true}

                ></ForcaArrastavel>
              }

              {this.state.Num_forca >= '2' && < ForcaArrastavel
                cor="black"
                largura={this.state.largura}
                altura={this.state.altura}
                dimension_x={windowWidth}
                dimension_y={windowHeight}
                Num_forca={this.state.Num_forca}
                forca='f2'
                ForcaModulo={this.state.forca[1].forca}
                modal={Platform.OS ==="android"?false:true}
              ></ForcaArrastavel>}

              {this.state.Num_forca >= '3' && < ForcaArrastavel
                cor="black"
                largura={this.state.largura}
                altura={this.state.altura}
                dimension_x={windowWidth}
                dimension_y={windowHeight}
                Num_forca={this.state.Num_forca}
                forca='f3'
                ForcaModulo={this.state.forca[2].forca}
                modal={Platform.OS ==="android"?false:true}
              ></ForcaArrastavel>}

              {this.state.Num_forca >= '4' && < ForcaArrastavel
                cor="black"
                largura={this.state.largura}
                altura={this.state.altura}
                dimension_x={windowWidth}
                dimension_y={windowHeight}
                Num_forca={this.state.Num_forca}
                forca='f4'
                ForcaModulo={this.state.forca[3].forca}
                modal={Platform.OS ==="android"?false:true}
              ></ForcaArrastavel>}

              {this.state.Num_forca >= '5' && < ForcaArrastavel
                cor="black"
                largura={this.state.largura}
                altura={this.state.altura}
                dimension_x={windowWidth}
                dimension_y={windowHeight}
                Num_forca={this.state.Num_forca}
                forca='f5'
                ForcaModulo={this.state.forca[4].forca}
                modal={Platform.OS ==="android"?false:true}
              ></ForcaArrastavel>}

              {this.state.apoioA >= '1' && < ForcaArrastavel
                cor="blue"
                largura={this.state.largura}
                altura={this.state.altura}
                dimension_x={windowWidth}
                dimension_y={windowHeight}
                Num_forca={this.state.Num_forca}
                forca='a1'
                imagem={require('./../img/triangulo_1.png')}
                modal={Platform.OS ==="android"?false:true}
              ></ForcaArrastavel>}

              {this.state.apoioA >= '2' && < ForcaArrastavel
                cor="blue"
                largura={this.state.largura}
                altura={this.state.altura}
                dimension_x={windowWidth}
                dimension_y={windowHeight}
                Num_forca={this.state.Num_forca}
                forca='a2'
                imagem={require('./../img/triangulo_1.png')}
                modal={Platform.OS ==="android"?false:true}
              ></ForcaArrastavel>}

                {this.state.apoioB >= '1' && < ForcaArrastavel
                cor="blue"
                largura={this.state.largura}
                altura={this.state.altura}
                dimension_x={windowWidth}
                dimension_y={windowHeight}
                Num_forca={this.state.Num_forca}
                forca='b1'
                imagem={require('./../img/vasouraDireita.png')}
                modal={Platform.OS ==="android"?false:true}
              ></ForcaArrastavel>}

            <View style={{ paddingBottom: windowHeight / 1.55 }}>
              <View style={{ paddingLeft: (windowWidth / 7) }}>
                <Text>{this.state.altura}M</Text>
              </View>
              <View style={{ paddingBottom: (windowHeight / 50) }}>
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                  <View style={styles.rectangle}></View>
                </View>
                <View style={{ flexDirection: "row", paddingLeft: (windowWidth / 6.5) }}>
                  <Text>0M</Text>
                  <View style={{ paddingLeft: (windowWidth / 1.7) }}>
                    <Text>{this.state.largura}M</Text>
                  </View>
                </View >
              </View>
            </View>
          </View>
        </View>
        <View position="absolute" style={{ paddingTop: windowHeight / 2 }}>
          <ImageBackground style={{ height: (windowHeight) / 1.5, width: (windowWidth) }} source={require('./../img/Bottombackground.png')}>
            <View style={{ paddingTop: windowHeight / 20, paddingLeft: windowWidth / 3.8, flexDirection: "row" }}>
              <Text style={{ fontSize: 17, color: "gray" }}>Largura</Text>
              <View style={{ paddingLeft: windowWidth / 6.5 }}>
                <Text style={{ fontSize: 17, color: "gray" }}>Altura</Text>
              </View>
              <View style={{ paddingLeft: windowWidth / 20 }}>
                <TouchableOpacity onPress={
                  () => {
                    var GambiA="";
                    var GambiB=" ";
                    var reset = {
                      altura: "?",
                      largura: "?",
                      value1: 1,
                      pos1: 0,
                      pos2: 0,
                      Num_forca: 0,
                      modal: false,
                      apoioA: 0,
                      apoioB: 0,
                      forca: [{ posx: -1, posy: -1, forca: 0 },
                      { posx: -1, posy: -1, forca: 0 },
                      { posx: -1, posy: -1, forca: 0 },
                      { posx: -1, posy: -1, forca: 0 },
                      { posx: -1, posy: -1, forca: 0 },
                      ],
                      suporte: [{ posx: -1, posy: -1 }, { posx: -1, posy: -1 }, { posx: -1, posy: -1 }, { posx: -1, posy: -1 }],
                      engaste:[{posx:-1,posy:-1}],
                      buttonText: "Forca",
                      buttonContador: 0,
                      textContent1: this.state.textContent1==""?GambiB:GambiA,
                      textContent2:  this.state.textContent1==""?GambiB:GambiA,
                    }
                    this.setState(reset);
                    this.enviar();
                  }
                }>
                  <Image source={require('./../img/seta_circular.png')} style={{ height: 30, width: 30 }}></Image>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ paddingTop: windowHeight / 30, flexDirection: "row", justifyContent: "space-evenly" }}>
              <TextInput placeholder={this.state.textContent1}
                keyboardType="numeric"
                Type='flat'
                maxLength={5}
                textAlign="center"
                style={{ height: 25, width: 100, borderColor: 'gray', borderBottomWidth: 1, borderBottomWidth: 3, borderBottomColor: "#6F9AA4" }}
                onChangeText={(texto) => {
                  this.setState({ largura: texto })
                }}>
              </TextInput>
              <TextInput placeholder={this.state.textContent2}
                keyboardType="numeric"
                Type='flat'
                maxLength={5}
                textAlign="center"
                style={{ height: 25, width: 100, borderColor: 'gray', borderBottomWidth: 3, borderBottomColor: "#6F9AA4" }}
                onChangeText={(texto) => {
                  this.setState({ altura: texto })
                }}>
              </TextInput>
            </View>
            <ButtonOp text={this.state.buttonText} windowHeight={windowHeight} windowWidth={windowWidth} onPressCen=
              {() => {
                if (this.state.buttonContador == 0) {
                  if (this.state.Num_forca < 5) {
                    this.setState({ Num_forca: this.state.Num_forca + 1 });
                    this.setState({ modal: true })
                  }
                  else {
                    alert("limite de forças atingido");
                  }
                }
                else {
                  if(this.state.buttonContador==2)
                  {
                   if(this.state.apoioA == 0 && this.state.apoioB==0)
                   {
                    this.setState({ apoioB: this.state.apoioB + 1 });
                   }
                   else
                   {
                     alert("limites de suporte atingidos");
                   }
                  }
                  else
                  {
                  if (this.state.buttonContador == 1) {
                    if (this.state.apoioA != 2 && this.state.apoioB==0) {
                      this.setState({ apoioA: this.state.apoioA + 1 });
                    }
                    else {
                      alert("dois suportes atingidos");
                    }
                  }
                }
                }
              }}
              onPressDir=
              {() => {
                if (this.state.buttonContador + 1 > 2) {
                  this.setState({ buttonContador: 0, buttonText: "Força" })
                }
                else {
                  if (this.state.buttonContador + 1 == 1) {


                    this.setState({ buttonContador: this.state.buttonContador + 1, buttonText: "1Grau" });
                  }
                  else
                  {
                    if(this.state.buttonContador+1==2)
                    {
                      this.setState({ buttonContador: this.state.buttonContador + 1, buttonText: "3Grau" });
                    }
                  }
                }
              }
              }
              onPressEsq=
              {() => {
                if (this.state.buttonContador - 1 < 0) {
                  this.setState({ buttonContador: 2, buttonText: "3Grau" })
                }
                else {
                  if (this.state.buttonContador - 1 == 0)
                    this.setState({ buttonContador: this.state.buttonContador - 1, buttonText: "Força" });
                    else
                    {
                      if(this.state.buttonContador-1==1)
                      {
                        this.setState({ buttonContador: 1, buttonText: "1Grau" })
                      }
                    }
                }
              }
              }
            ></ButtonOp>
            <ButtonNavigation width={windowWidth} height={windowHeight} Suporte={this.state.suporte}
              Forca={this.state.forca} alturaBarra={this.state.altura} qtdForca={this.state.Num_forca} qtdSuporte={this.state.apoioA} qtdEngaste={this.state.apoioB}
              Engaste={this.state.engaste}  Largura={this.state.largura}></ButtonNavigation>
          </ImageBackground>
        </View>
        <Modal
          visible={this.state.modal}
          modalAnimation={new SlideAnimation({
            slideFrom: 'bottom',
          })}
          height={150}>
          <ModalContent style={styles.modal}>
            <View style={{ paddingTop: (windowHeight / 40), flexDirection: 'row', }}>
              <Text style={{ fontSize: 16, color: "#393D3F" }}>Valor Força: </Text>
              <TextInput placeholder="Digite um valor"
                keyboardType="numeric"
                Type='flat'
                style={{ height: 25, width: 100, borderColor: 'gray', borderBottomWidth: 3, borderBottomColor: "#6F9AA4" }}
                onChangeText={
                  (texto) => {
                    var indice = this.state.Num_forca - 1;
                    var disguesedState = Object.assign({}, this.state);
                    switch (indice) {
                      case 0:
                        let forcaNum1 = Object.assign({ posx: this.state.forca[0].posx, posy: this.state.forca[0].posy }, { forca: texto, angulo: this.state.forca[0].angulo });
                        var leblancState = Object.assign({}, this.state);
                        leblancState.forca[0] = forcaNum1;
                        this.setState(leblancState);
                        break;
                      case 1:
                        let forcaNum2 = Object.assign({ posx: this.state.forca[1].posx, posy: this.state.forca[1].posy }, { forca: texto, angulo: this.state.forca[1].angulo });
                        var leblancState = Object.assign({}, this.state);
                        leblancState.forca[1] = forcaNum2;
                        this.setState(leblancState);
                        break;
                      case 2:
                        let forcaNum3 = Object.assign({ posx: this.state.forca[2].posx, posy: this.state.forca[2].posy }, { forca: texto, angulo: this.state.forca[2].angulo });
                        var leblancState = Object.assign({}, this.state);
                        leblancState.forca[2] = forcaNum3;
                        this.setState(leblancState);
                        break;
                      case 3:
                        let forcaNum4 = Object.assign({ posx: this.state.forca[3].posx, posy: this.state.forca[3].posy }, { forca: texto, angulo: this.state.forca[3].angulo });
                        var leblancState = Object.assign({}, this.state);
                        leblancState.forca[3] = forcaNum4;
                        this.setState(leblancState);
                        break;
                      case 4:
                        let forcaNum5 = Object.assign({ posx: this.state.forca[4].posx, posy: this.state.forca[4].posy }, { forca: texto, angulo: this.state.forca[4].angulo });
                        var leblancState = Object.assign({}, this.state);
                        leblancState.forca[4] = forcaNum5;
                        this.setState(leblancState);
                        break;
                    }
                  }}></TextInput>
            </View>
            <TouchableOpacity style={styles.button}
              onPress={() => { this.setState({ modal: false }); }}>
              <Text style={{ color: "white" }}>Ok</Text>
            </TouchableOpacity>
          </ModalContent>
        </Modal>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: '#6F9AA4',
    justifyContent: 'space-evenly',
    alignItems: 'center'

  },
  modal: {
    flexDirection: "column",
    backgroundColor: '#F5F5F5',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,

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
    flex:1, 
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
  rectangle: {
    width: 250,
    height: 30,
    backgroundColor: '#6F9AA4',
    borderBottomWidth: 4,
    borderBottomColor: 'gray',

  },
  button: {
    height: 20,
    borderRadius: 10,
    backgroundColor: '#393D3F',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
  },
});
const mapState = state => ({
  Forca: state.reducerF,
  Forca2: state.reducerF2,
  Forca3: state.reducerF3,
  Forca4: state.reducerF4,
  Forca5: state.reducerF5,
  suporteA: state.reducerSuporteA,
  suporteA2: state.reducerSuporteA2,
  suporteB: state.reducerSuporteB,
})

export default connect(mapState)(Tela);