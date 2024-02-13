import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function Cell({ value, hidden, revealed, gameOver, onReveal }) {
    let cellStyle = styles.cell;
    let content = '';

    if (!hidden || revealed) {
        cellStyle = [styles.cell, styles.disabledCell];
    }

    if (!hidden && revealed) {
        if (value === -1) {
            content = 'b';
            
        } else if (value > 0) {
            content = value;
            
        }
    }

    return (
        <TouchableOpacity
            style={cellStyle}
            disabled={gameOver || !hidden || revealed}
           
            onPress={onReveal}
        >
            <Text style={styles.cellText}>{revealed ? content:''}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cell: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgrey',
    },
    cellText: {
        fontSize: 16,
    },
    disabledCell: {
        backgroundColor: '#FFF', // Adjusted color for disabled cells
    },

    bombCell: {
        backgroundColor: 'red', 
    },
});