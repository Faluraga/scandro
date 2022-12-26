

import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'




const BOTONEXAMPLE = (params : any) =>{


const [luis,setLuis]= useState(0)    


async function suma() {
    setLuis(luis+1)
}


    return (
        <View>
            <TouchableOpacity style={{backgroundColor:'red'}} onPress = {()=>suma()}>
                <Text style ={{color:'white'}}>AGREGAR</Text>
            </TouchableOpacity>
            <Text>{luis}</Text>
        </View>

      )
};
 
export default BOTONEXAMPLE;
