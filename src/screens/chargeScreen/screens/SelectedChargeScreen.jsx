import React, { useContext, useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { StateContext } from '../../../context/StateContext'
import { deleteType } from '../../../db/vehicleTypesDb'
import { ChargeCard } from '../components/ChargeCard'
import { NewNameModal } from '../components/NewNameModal'

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#B3B7EE'
  },
  padding: {
    padding: 8
  },
  divider: {
    color: '#000807',
    fontSize: 25,
    fontWeight: '600',
    marginVertical: 16
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  deleteBtn: {
    alignItems: 'center',
    backgroundColor: '#E27373',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8
  },
  deleteBtnTxt: {
    fontSize: 20,
    paddingHorizontal: 6,
    color: '#000807'
  },
  editBtn: {
    alignItems: 'center',
    backgroundColor: '#648DE5',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8
  },
  editBtnTxt: {
    fontSize: 20,
    paddingHorizontal: 6,
    color: '#000807'
  }
})

export const SelectedChargeScreen = ({ route, navigation }) => {
  const { updateVehicleTypes } = useContext(StateContext)
  const { name, minFee, hourCharge, timeCharge, firstHourCharge } = route.params
  const [showModal, setShowModal] = useState(false)

  const deleteVehicleType = async () => {
    try {
      await deleteType(name)
      updateVehicleTypes()
      navigation.navigate('VehicleTypesScreen')
    } catch (e) {
      console.error('Error at deleteVehicleType at SelectedChargeScreen: ', e)
    }
  }

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.padding}>
        <ChargeCard
          charge={timeCharge}
          title={'Cobrança por tempo.'}
          text={
            'A cobrança por tempo é baseado em quanto tempo o veículo está estacionado.'
          }
          endText={' por hora.'}
          name={name}
          chargeParam={'timeCharge'}
        />
        <ChargeCard
          charge={minFee}
          title={'Taxa mínima.'}
          text={
            'A taxa mínima é aplicada se um veículo ficar estacionado por menos de uma hora.'
          }
          endText={' de taxa mínima.'}
          name={name}
          chargeParam={'minFee'}
        />
        <Text style={styles.divider}>Cobrança por hora.</Text>
        <ChargeCard
          charge={firstHourCharge}
          title={'Cobrado na primeira hora.'}
          endText={' na primeira hora.'}
          name={name}
          chargeParam={'firstHourCharge'}
        />
        <ChargeCard
          charge={hourCharge}
          title={'Cobrado nas horas restantes.'}
          endText={' a cada hora.'}
          name={name}
          chargeParam={'hourCharge'}
        />
        <View style={styles.btnWrapper}>
          <TouchableOpacity
            style={styles.deleteBtn}
            activeOpacity={0.8}
            onPress={() => deleteVehicleType()}
          >
            <Text style={styles.deleteBtnTxt}>Excluir</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editBtn}
            activeOpacity={0.8}
            onPress={() => setShowModal(true)}
          >
            <Text style={styles.editBtnTxt}>Mudar nome</Text>
          </TouchableOpacity>
        </View>
      </View>
      {showModal && (
        <NewNameModal
          name={name}
          setShowModal={setShowModal}
          navigation={navigation}
        />
      )}
    </ScrollView>
  )
}
