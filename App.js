import React from 'react';
import { StyleSheet, View, Text, Alert, Button } from 'react-native';
import Board from './components/Board';
import Cell from './components/Cell';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points: 0,
            gameOver: false,
        };
    }

    isGameOver = (points) => {
       // this.setState({ gameOver: true, points });
        Alert.alert('Game Over',
            `You hit a mine! Your points: ${this.state.points}`,
            [{ text: 'OK', onPress: () => { this.setState({ gameOver: true }) } }]);
    };

    generateBoard = () => {

    };

    resetGame = () => {

        
        this.setState({
            points: 0,
            gameOver: false,
            flippedCells: new Set(), 
        });
        
    };

    updatePoints = () => {
        this.setState((prevState) => ({ points: prevState.points + 100 }));
    };

    bailOut = () => {
       
        Alert.alert(
            'Bailed Out',
            `Your points: ${this.state.points}`,
            [{ text: 'OK', onPress: () => { this.setState({ gameOver: true }) } }],
            { cancelable: false }
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.points}>Points: {this.state.points}</Text>
                <Board
                    gameOver={this.state.gameOver}
                    onGameOver={this.isGameOver}
                    onReset={this.resetGame}
                    updatePoints={this.updatePoints}
                />
                <Button title="Bail Out?" onPress={this.bailOut} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    points: {
        fontSize: 20,
        marginBottom: 20,
    },
});

