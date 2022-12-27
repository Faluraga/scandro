import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const MenuBar = (props :any) => {

  const [menuBar,setMenuBar]= useState(['Configuración','notificaciones'])
  return (
    <View style={styles.menuBarContainer}>
      {menuBar.map((item :any, index : any) => (
        <TouchableOpacity
          key={index}
          onPress={() => props.onPress(item.title)}
          style={styles.menuBarItem}
        >
          <Text style={styles.menuBarText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  menuBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#e6e6e6',
    padding: 10,
  },
  menuBarItem: {
    marginRight: 10,
    borderRadius: 5,
    padding: 10,
  },
  menuBarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default MenuBar;