

import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'




const BotonModal = (value : any  ) =>{
const [visible,setVisible]=useState(false)
useEffect(()=>{
setVisible(value)
},[])
    return (
        <View>
            <TouchableOpacity style={{width:20,height:20,borderWidth:1,borderRadius:100,backgroundColor:visible?'#FF8F15':'#ffff'}}
            onPress={()=>setVisible(!visible)}
            >
                
            </TouchableOpacity>
        </View>

      )
};
 
export default BotonModal;
