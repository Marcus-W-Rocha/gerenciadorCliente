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
          Navigation.navigate("ListaPedidos",{requestType:{Data:{ startDate, endDate} }, 
          perfil:Navigation.getState()["routes"][Navigation.getState()["index"]]["params"]})
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
            locale="pt"
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
