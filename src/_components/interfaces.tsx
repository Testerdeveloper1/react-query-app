import React from 'react'
import { useStore } from 'zustand'
import { deviceStore } from '../stores/globaleStore'

const InterfacesType = () => {
    const {interfaces} = useStore(deviceStore);
    const {changeInterfaces} = useStore(deviceStore).actions;
    const handleChangeInterfaces = ( event:React.ChangeEvent<HTMLSelectElement>) =>{
        const newInterfaces = event.target.value;
        changeInterfaces(newInterfaces);
    }
  return (
    <select >
                <option value={"bluetooth"}>Bluetooth</option>
                <option value={"USB"}>USB</option>

    </select>
  )
}
export default InterfacesType