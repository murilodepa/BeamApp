import Draggable from 'react-native-draggable';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal, { ModalContent, SlideAnimation, ModalButton } from 'react-native-modals';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';

class Forca extends Component {

    state = {
        forca: { posx: -1, posy: -1 },
        modal: this.props.modal,
        retornar: this.props.modal,
        posXAntiga: -1,
        posYAntiga: -1,
        imagem: require('./../img/seta_perfurante.png'),
        imagem2: require('./../img/vasouraEsquerda.png'),
    }

    enviar = state => {
        const { dispatch } = this.props;
        let geral = this.props.forca;
        let tipo = geral.substring(0, 1);
        num = parseInt(geral.substring(1, 2));

        if (tipo == 'f') {

            switch (num) {

                case 1:
                    tipo = 'att_Forca';
                    break;
                case 2:
                    tipo = 'att_Forca2';
                    break;
                case 3:
                    tipo = 'att_Forca3';
                    break;
                case 4:
                    tipo = 'att_Forca4';
                    break;
                case 5:
                    tipo = 'att_Forca5';
                    break;
            }
        }
        else {
            if (tipo == 'a') {
                switch (num) {
                    case 1:
                        tipo = 'att_suporteA';
                        break;
                    case 2:
                        tipo = 'att_suporteA2';
                        break;
                }
            }
            else {
                if (tipo == 'b') {
                    tipo = 'att_suporteB';
                }
            }
        }

        dispatch({
            type: tipo,
            state,
        }
        );
    }

    confirmar_envio = () => {
        this.enviar(this.state);
    }

    verificar = () => {
        if (this.props.forca.substring(0, 1) == 'f') {
            return this.state.imagem;
        }
        else {
            if (this.props.forca.substring(0, 1) == 'a') {
                return require('./../img/triangulo_1.png');
            }
            else {
                return this.state.imagem2;
            }
        }
    }
    render() {

        return (
            <View>
                <Draggable renderSize={20}
                    isCircle
                    renderText={this.props.forca}
                    minX={(this.props.dimension_x - 260) / 2}
                    minY={(this.props.dimension_y) / 50}
                    maxX={250 + ((this.props.dimension_x - 250) / 2)}
                    maxY={this.props.dimension_y / 6}
                    x={(this.props.dimension_x - 260) / 2}
                    y={(this.props.dimension_y / 16)}
                    imageSource={this.verificar()}
                    onShortPressRelease={() => {
                        if (this.props.forca.substring(0, 1) == 'f') {
                        alert("Eixo X: " + this.state.forca.posx + " M \n" +
                        "Eixo Y: " + this.state.forca.posy + " M \n" + "|F| = " +
                        this.props.ForcaModulo+ " N"
                    );
                        }
                        else
                        {
                            alert("Eixo X: " + this.state.forca.posx + " M \n" +
                        "Eixo Y: " + this.state.forca.posy + " M");
                        }
                    }}
                    onDragRelease={(e) => {

                        if (this.props.altura != '?' && this.props.largura != '?') {
                            let x = (((e.nativeEvent.pageX - ((this.props.dimension_x - 250) / 2)) * (parseInt(this.props.largura) / 250))).toFixed(2);
                            let y = ((((this.props.dimension_y - e.nativeEvent.pageY) - (this.props.dimension_y / 1.31))) * (parseInt(this.props.altura) / 30)).toFixed(2);

                            var copy = Object.assign({}, this.state);
                            if (x > parseInt(this.props.largura)) {
                                x = this.props.largura;
                            }

                            if (x < 0) {
                                x = 0;
                            }

                            if (y > parseInt(this.props.altura)) {
                                y = this.props.altura;
                            }

                            if (y < 0) {
                                y = 0;
                            }

                            copy.forca.posx = x;
                            copy.forca.posy = y;
                            copy.modal = true;
                            copy.posXAntiga = x;
                            copy.posYAntiga = y;

                            if (this.props.forca.substring(0, 1) == 'f') {
                                if (y == this.props.altura) {
                                    copy.imagem = require('./../img/seta_perfurante_invertida.png');
                                }
                                else {
                                    copy.imagem = require('./../img/seta_perfurante.png');
                                }
                            }

                            if (this.props.forca.substring(0, 1) == 'b') {
                                if (x == this.props.largura) {
                                    copy.imagem2 = require('./../img/vasouraDireita.png');
                                }
                                else {
                                    copy.imagem2 = require('./../img/vasouraEsquerda.png');
                                }
                            }

                            if (this.props.forca.substring(0, 1) == 'b') {
                                if (x != 0 && x != this.props.largura) {
                                    alert("Engaste pode ficar apenas nas extremidades, por favor atualizar sua posição");
                                }
                            }



                            this.setState(copy);


                        }
                        else {
                            alert("preencha as lacunas de altura e largura");
                        }
                    }}
                />

                <Modal
                    visible={this.state.modal}
                    modalAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                    height={150}
                >
                    <ModalContent style={styles.modal}>
                        <View>
                            <Text style={{ fontSize: 16, color: "#393D3F" }}>Confirmar Dados</Text>
                        </View>
                        <View style={{ flexDirection: "row", paddingBottom: 20 }}>
                            <Text style={{ fontSize: 16, color: "#393D3F" }}>posicao X(M):</Text>
                            <TextInput placeholder={this.state.posXAntiga + "cm"}
                                onChangeText={(texto) => {
                                    if (texto != (this.state.forca.posx + "cm")) {
                                        var dupe = Object.assign({}, this.state);
                                        dupe.forca.posx = texto;
                                        this.setState(dupe);
                                    }
                                }}
                                keyboardType="numeric"
                                Type='flat'
                                style={{ height: 25, width: 100, borderColor: 'gray', borderBottomWidth: 3, borderBottomColor: "#6F9AA4" }}

                            ></TextInput>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 16, color: "#393D3F" }}>posicao Y(M):</Text>
                            <TextInput placeholder={this.state.posYAntiga + "cm"}
                                onChangeText={(texto) => {
                                    if (texto != (this.state.forca.posy + "cm")) {
                                        var dupe = Object.assign({}, this.state);
                                        dupe.forca.posy = texto;
                                        this.setState(dupe);
                                    }
                                }}
                                keyboardType="numeric"
                                Type='flat'
                                style={{ height: 25, width: 100, borderColor: 'gray', borderBottomWidth: 3, borderBottomColor: "#6F9AA4" }}></TextInput>
                        </View>
                        <View style={{ paddingTop: 12 }}>
                            <TouchableOpacity style={styles.button}
                                onPress={() => {

                                    if (this.props.forca.substring(0, 1) == 'b') {
                                        if (this.state.forca.posx != 0 && this.state.forca.posx != this.props.largura) {
                                            alert("posição invalida para o engaste");
                                        }
                                        else {
                                            this.setState({ modal: false });
                                            this.confirmar_envio();
                                        }
                                    }
                                    else {
                                        this.setState({ modal: false });
                                        this.confirmar_envio();
                                    }
                                }}>
                                <Text style={{ color: "white" }}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </ModalContent>
                </Modal>
            </View>
        )
    }
}

export default connect()(Forca);

const styles = StyleSheet.create({

    modal: {
        flexDirection: "column",
        backgroundColor: '#F5F5F5',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
    },

    fonte_back:
    {
        color: 'white'
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