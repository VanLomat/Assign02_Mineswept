import React from 'react';
import { StyleSheet, View, Text, Alert, Button } from 'react-native';
import Board from './components/Board';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points: 0,
            gameOver: false,
        };
    }

    isGameOver = () => {
        this.setState({ gameOver: true });
        Alert.alert('Game Over', 'You hit a mine!', [{ text: 'OK' }]);
    };

    resetGame = () => {
        this.setState({
            points: 0,
            gameOver: false,
        });
    };

    updatePoints = () => {
        this.setState((prevState) => ({ points: prevState.points + 100 }));
    };

    bailOut = () => {
        Alert.alert(
            'Bail Out',
            `Your points: ${this.state.points}`,
            [{ text: 'OK', onPress: () => { this.resetGame() } }],
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

