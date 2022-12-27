

import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'




const BotonExample = (params : any) =>{


const [count,setCount]= useState(0)    


async function suma() {
    setCount(count+1)
}


    return (
        <View>
            <TouchableOpacity style={{backgroundColor:'red'}} onPress = {()=>suma()}>
                <Text style ={{color:'white'}}>AGREGAR</Text>
            </TouchableOpacity>
            <Text>{count}</Text>
        </View>

      )
};
 
export default BotonExample;
