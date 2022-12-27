import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const Sidebar = () => {
    const [active, setActive] = useState('home');

    return (
        <View style={styles.sidebarContainer}>
            <ScrollView>
                <TouchableOpacity
                    style={active === 'home' ? styles.activeItem : styles.item}
                    onPress={() => setActive('home')}
                >
                    <Text style={active === 'home' ? styles.activeText : styles.text}>
                        Home
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={active === 'profile' ? styles.activeItem : styles.item}
                    onPress={() => setActive('profile')}
                >
                    <Text style={active === 'profile' ? styles.activeText : styles.text}>
                        Profile
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={active === 'settings' ? styles.activeItem : styles.item}
                    onPress={() => setActive('settings')}
                >
                    <Text style={active === 'settings' ? styles.activeText : styles.text}>
                        Settings
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    sidebarContainer: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        paddingTop: 15,
    },
    item: {
        padding: 15,
    },
    activeItem: {
        padding: 15,
        backgroundColor: '#8a8a8a',
    },
    text: {
        fontSize: 16,
    },
    activeText: {
        fontSize: 16,
        color: '#FFFFFF',
    },
});

export default Sidebar;