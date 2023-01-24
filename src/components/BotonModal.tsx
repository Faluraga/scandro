

import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'




const BotonModal = (params : any , color:string ) =>{


    return (
        <View>
            <TouchableOpacity style={{backgroundColor:color }}>
                <Text style ={{color:'white'}}>{params}</Text>
            </TouchableOpacity>
        </View>

      )
};
 
export default BotonModal;
