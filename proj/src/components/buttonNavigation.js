import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function ButtonNavigate({ height, width, Forca, Suporte, alturaBarra, qtdForca, qtdSuporte, qtdEngaste, Engaste, Largura }) {
  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: "row", justifyContent: "center", paddingTop: height / 25 }}>
      <TouchableOpacity
        onPress={() => {

          if (qtdForca >= 1 && qtdSuporte >= 2) {
            var dist_suporte = 99999;
            var Va = 0, Vb = 0, calculoMomento = 0, calculoForcay = 0, j = 0, calculocortante = 0, calculoFletor = 0;
            var vet = [];
            var vetCortante = [];
            var vetFletor = [];
            var auxiliar;
            if (Suporte[0].posx != -1 && Suporte[1].posx != -1)
              if (Suporte[0].posx > Suporte[1].posx) {
                dist_suporte = Suporte[1].posx;
              }
              else {
                dist_suporte = Suporte[0].posx;
              }
            for (let i = 0; i < 5; i++) {
              if (Forca[i].posx != -1) {
                if (Forca[i].posy != alturaBarra) {
                  if (dist_suporte > Forca[i].posx) {
                    calculoMomento += parseFloat(Forca[i].forca * (dist_suporte - Forca[i].posx));
                  }
                  else {

                    calculoMomento += parseFloat(Forca[i].forca * (Forca[i].posx - dist_suporte));
                  }
                }
                else {
                  if (dist_suporte > Forca[i].posx) {
                    calculoMomento += parseFloat(-Forca[i].forca * (dist_suporte - Forca[i].posx));
                  }
                  else {
                    calculoMomento += parseFloat(-Forca[i].forca * (Forca[i].posx - dist_suporte));
                  }
                }
              }
            }
            if (Suporte[0].posx < Suporte[1].posx) {
              if (dist_suporte < Suporte[1].posx) {
                Vb = (calculoMomento * -1) / (Suporte[1].posx - dist_suporte);
              }
              else {
                Vb = (calculoMomento * -1) / (dist_suporte - Suporte[1].posx);
              }
            }
            else {
              if (dist_suporte < Suporte[0].posx) {
                Vb = (calculoMomento * -1) / (Suporte[0].posx - dist_suporte);
              }
              else {
                Vb = (calculoMomento * -1) / (dist_suporte - Suporte[0].posx);
              }
            }
            for (let i = 0; i < 5; i++) {
              if (Forca[i].posy != alturaBarra) {
                if (Forca[i].posx != -1) {
                  calculoForcay += parseFloat(Forca[i].forca);
                }
              }
              else {
                if (Forca[i].posx != -1) {
                  calculoForcay -= parseFloat(Forca[i].forca);
                }
              }
            }

            calculoForcay *= -1;
            if (Suporte[0].posx < Suporte[1].posx) {
              Va = calculoForcay - Vb;
            }
            else {
              Va = calculoForcay - Vb;
            }
            console.log("va" + Va + "vb" + Vb)
            if (Suporte[0].posx < Suporte[1].posx) {
              vet[0] = { N: Va, POS: Suporte[0].posx };
              vet[1] = { N: Vb, POS: Suporte[1].posx };
            }
            else {
              vet[0] = { N: Va, POS: Suporte[1].posx };
              vet[1] = { N: Vb, POS: Suporte[0].posx };
            }
            for (let i = 0; i < 5; i++) {
              if (Forca[i].posx != -1) {
                if (Forca[i].posy == alturaBarra) {
                  vet[i + 2] = { N: -Forca[i].forca, POS: parseFloat(Forca[i].posx) };
                }
                else {
                  vet[i + 2] = { N: Forca[i].forca, POS: parseFloat(Forca[i].posx) };
                }
              }
            }
            vet.sort(function compare(a, b) {
              if (a.POS < b.POS)
                return -1;
              else
                return 1;
            }
            );
            console.log(vet)
            for (let i = 0; i < vet.length; i++) {
              j = 0;
              while (j < vet.length && vet[j].POS <= vet[i].POS) {
                calculocortante += parseFloat(vet[j].N);
                calculoFletor += parseFloat(vet[j].N * (vet[i].POS - vet[j].POS));
                j++;
              }
              vetCortante[i] = { Y: calculocortante, X: vet[i].POS };
              vetFletor[i] = { Y: calculoFletor, X: vet[i].POS };
              calculocortante = 0;
              calculoFletor = 0;
              console.log(i)
            }

            vetFletor[vetFletor.length - 1].Y = 0;
            console.log(vetFletor)

            navigation.navigate("Resultados", {
              Forca: Forca, Suporte: Suporte, vetCortante: vetCortante, vetFletor: vetFletor, vet: vet, Altura: alturaBarra
            });
          }
          else {
            if (qtdForca >= 1 && qtdEngaste == 1) {
              var Va = 0, Ha = 0, calculoMomento = 0, calculoForcay = 0, calculocortante = 0, calculoFletor = 0;
              var vet = [];
              var dist_suporte = 99999, comprimento = 0;
              var vetCortante = [];
              var vetFletor = [];

              for (let i = 0; i < 5; i++) {

                if (Forca[i].posy != alturaBarra) {
                  if (Forca[i].posx != -1) {
                    Va += parseFloat(Forca[i].forca);
                  }
                }
                else {
                  if (Forca[i].posx != -1) {
                    Va -= parseFloat(Forca[i].forca);
                  }
                }
              }
              Va *= -1;

              dist_suporte = Engaste[0].posx;
              comprimento = Largura;

              for (let i = 0; i < 5; i++) {
                if (Forca[i].posx != -1) {
                  if (Forca[i].posy != alturaBarra) {
                    if (dist_suporte != comprimento) {
                      calculoMomento += parseFloat(Forca[i].forca * (Forca[i].posx - dist_suporte));
                    } else {
                      calculoMomento += parseFloat(Forca[i].forca * ((-1) * (Forca[i].posx - dist_suporte)));
                    }
                  }
                  else {
                    if (dist_suporte != comprimento) {
                      calculoMomento -= parseFloat(Forca[i].forca * (Forca[i].posx - dist_suporte));
                    } else {
                      calculoMomento -= parseFloat(Forca[i].forca * ((-1) * (Forca[i].posx - dist_suporte)));
                    }
                  }
                }
              }
              Vb = (calculoMomento * -1);

              vet[0] = { N: Va, POS: dist_suporte };

              for (let i = 0; i < 5; i++) {
                if (Forca[i].posx != -1) {
                  if (Forca[i].posy == alturaBarra) {
                    vet[i + 1] = { N: -Forca[i].forca, POS: Forca[i].posx };
                  }
                  else {
                    vet[i + 1] = { N: Forca[i].forca, POS: Forca[i].posx };
                  }
                }
              }


              vet.sort(function compare(a, b) {
                if (dist_suporte != comprimento) {
                  if (a.POS < b.POS)
                    return -1;
                  else
                    return 1;
                } else {
                  if (a.POS > b.POS)
                    return -1;
                  else
                    return 1;
                }
              }
              );

              for (let i = 0; i < vet.length; i++) {
                j = 0;

                if (dist_suporte != comprimento) {
                  while (j < vet.length && vet[j].POS <= vet[i].POS) {
                    calculocortante += parseFloat(vet[j].N);
  
                    if (vet[j].POS != dist_suporte) {
                      calculoFletor += parseFloat(vet[j].N * (vet[i].POS - vet[j].POS));
                    }
                    else {
                      calculoFletor += parseFloat(Vb);
                    }
                    j++;

                    console.log(calculoFletor)
                  }
                } else {
                  while (j < vet.length && vet[j].POS >= vet[i].POS) {
                    calculocortante += parseFloat(vet[j].N);
                    console.log("calculocortante: " + calculocortante)

                    if (vet[j].POS != dist_suporte) {
                      calculoFletor += parseFloat(vet[j].N * ((-1) * (vet[i].POS - vet[j].POS)));
                    }
                    else {
                      calculoFletor += parseFloat(Vb);
                    }
                    j++;

                    console.log(calculoFletor)
                  }
                }
                vetCortante[i] = { Y: calculocortante, X: vet[i].POS };
                vetFletor[i] = { Y: calculoFletor, X: vet[i].POS };
                calculocortante = 0;
                calculoFletor = 0;
              }

              vetFletor[vetFletor.length - 1].Y = 0;
              console.log(vetFletor);

              navigation.navigate("Resultados", {
                Forca: Forca, Suporte: Suporte, vetCortante: vetCortante, vetFletor: vetFletor, vet: vet, Altura: alturaBarra, MEngaste: Vb, Dist: dist_suporte, ContEngaste: qtdEngaste
              });
            }



            else {
              alert("Insira pelo menos 1 força e 2 suportes de 1 grau ou 1 engaste de 3 grau!");
            }
          }
        }}

      >
        <View style={{
          width: width / 3,
          height: 30,
          backgroundColor: '#393D3F',
          borderRadius: 5,
          flexDirection: "row",
          justifyContent: "center"
        }}>
          <Text style={{ color: "white", fontSize: 15 }}>Enviar</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}