import React, { useState } from "react";
import { View} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PaperProvider,Text,List, Modal,Portal} from "react-native-paper";
import { DatePickerModal } from 'react-native-paper-dates';



const Relat = () =>{ 
    const Navigation = useNavigation()
    const showModalStatus = () => setVisible(true);
    const hideModalStatus = () => setVisible(false);
    const [visible, setVisible] = React.useState(false);
    const [range, setRange] = React.useState({ startDate: undefined, endDate: undefined });
    const [open, setOpen] = React.useState(false);
    const listStatus= [
        {
            id: 1,
            valor: "Enviado"
        },
        {
            id: 2,
            valor: "Recebido"
        },
        {
            id:3,
            valor: "Processado"
        },
        {
            id:4,
            valor: "Cancelado"
        }
    ]
    const onDismiss = React.useCallback(() => {
        setOpen(false);
      }, [setOpen]);
    
      const onConfirm = React.useCallback(
        ({ startDate, endDate }) => {
            setOpen(false);
            setRange({ startDate, endDate });
            ini_year = startDate.getFullYear()
            ini_month = startDate.getMonth() + 1
            ini_day = startDate.getDate()
            if (ini_day < 10) {
                ini_day = "0" + ini_day
            }
            if (ini_month < 10) {
                ini_month = "0" + ini_month
            }
            data_ini = ini_year + "-" + ini_month + "-" + ini_day

            end_year = endDate.getFullYear()
            end_month = endDate.getMonth()+1
            end_day = endDate.getDate()
            if (end_day<10){
                end_day = "0"+end_day
            }
            if (end_month<10){
                end_month = "0"+end_month
            }
            data_end = end_year+"-"+end_month+"-"+end_day

            Navigation.navigate("ListaPedidos", {
                requestType: { Data: { data_ini, data_end } },
                perfil: Navigation.getState()["routes"][Navigation.getState()["index"]]["params"]
            })
        },
        [setOpen, setRange]
      );

    return (
        <View>
            <View style={{marginTop:10 }}>
                <Text variant="headlineMedium" 
                style={{textAlign:'center'}}>Relatorio de Pedidos</Text>
            </View>
            <View style={{ height:"2%", backgroundColor: "black",marginTop:10 }}/>
            <View>
                <List.Item 
                    title = "Relatorio por Data"
                    description = "Todos os pedidos em um Intervalo"
                    left={props => <List.Icon {...props} icon="calendar-range"/>}
                    onPress={() => setOpen(true)}
                    />
                <List.Item 
                    title = "Relatorio por Status"
                    description = "Todos os Pedidos de um Status"
                    left={props => <List.Icon {...props} icon="list-status"/>}
                    onPress={showModalStatus}
                    />
                    
                <List.Item 
                    title = "Relatorio Geral"
                    description = "Todos os pedidos"
                    left={props => <List.Icon {...props} icon="all-inclusive-box-outline"/>}
                    onPress={() => Navigation.navigate("ListaPedidos",{requestType:{"Geral":{}},
                    perfil:Navigation.getState()["routes"][Navigation.getState()["index"]]["params"]})}/>
            </View>
            <DatePickerModal
            locale="en"
            mode="range"
            visible={open}
            onDismiss={onDismiss}
            startDate={range.startDate}
            endDate={range.endDate}
            onConfirm={onConfirm}
            />
            <Portal>
                <Modal visible={visible} onDismiss={hideModalStatus} contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
                    <Text>Selecione um Status</Text>
                    {listStatus.map((listStatus)=>{
                    return (
                        <List.Item
                            key={listStatus.id}
                            title = {listStatus.valor}
                            onPress={() => Navigation.navigate("ListaPedidos",{requestType:{Status:listStatus},
                                perfil:Navigation.getState()["routes"][Navigation.getState()["index"]]["params"]})}/>
                    )})}
                </Modal>
            </Portal>
        </View>
    )
}


export default () => (
    <PaperProvider>
        <Relat/>
    </PaperProvider>
)
