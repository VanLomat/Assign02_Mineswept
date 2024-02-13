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
            timeLeft:10,
        };
    }
    componentDidMount() {
        this.timer = setInterval(this.tick, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick = () => {
       
        this.setState(prevState => ({ timeLeft: prevState.timeLeft - 1 }), () => {
            if (this.state.timeLeft === 0) {

                this.isGameOver();
                clearInterval(this.timer);
            }
        });
    };

    isGameOver = (points) => {
       // this.setState({ gameOver: true, points });
        Alert.alert('Game Over',
            `You hit a mine! \n Your points: ${this.state.points}`,
            [{ text: 'OK', onPress: () => { this.setState({ gameOver: true }) } }]);
    };

    resetGame = () => {

        
        this.setState({
            points: 0,
            gameOver: false,
            flippedCells: new Set(), 
            timeLeft:10,
        }, () => {
            clearInterval(this.timer);
            this.timer = setInterval(this.tick, 1000);
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
                <Text style={styles.timer}>Time Left: {this.state.timeLeft}</Text>
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
    timer: {
        fontSize: 20,
        marginButtom: 10,
    },
});

