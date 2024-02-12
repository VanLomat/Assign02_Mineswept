import React from 'react';
import { StyleSheet, View } from 'react-native';
import Cell from './Cell';

const BOARD_SIZE = 5;
const NUM_MINES = 5;

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: this.initializeBoard(),
            flippedCells: new Set(),
        };
    }

    initializeBoard = () => {
        const board = [];
        for (let i = 0; i < BOARD_SIZE; i++) {
            const row = [];
            for (let j = 0; j < BOARD_SIZE; j++) {
                +        row.push({ value: 0, hidden: true });
            }
            board.push(row);
        }
        this.placeMines(board);
        return board;
    };

    placeMines = (board) => {
        let minesPlaced = 0;
        while (minesPlaced < NUM_MINES) {
            const row = Math.floor(Math.random() * BOARD_SIZE);
            const col = Math.floor(Math.random() * BOARD_SIZE);
            if (board[row][col].value === 0) {
                board[row][col].value = -1; // Represents a mine
                minesPlaced++;
            }
        }
    };

    renderCell = (row, col) => {
        const cell = this.state.board[row][col];
        const key = '${row}-${col}-${cell.value}';
        return (
            <Cell
                key={key}
                value={cell.value}
                hidden={cell.hidden}
                flipped={this.state.flippedCells.has('${row}-${col}')}
        gameOver = { this.props.gameOver }
        onReveal = {() => this.handleCellPress(row, col)
    }
      />
    );
  };

//handleCellPress = (row, col) => {
//    if (this.props.gameOver || !this.state.board[row][col].hidden) return;

//    const cell = this.state.board[row][col];
//    const updatedFlippedCells = new Set(this.state.flippedCells);
//    updatedFlippedCells.add('${row}-${col}');
//    this.setState({ flippedCells: updatedFlippedCells });

//    this.renderBoard();

//    if (cell.value === -1) {
//        this.props.onGameOver();
//        const updateBoard = this.state.board.map((rowArr) =>
//            rowArr.map((cell, colIndex) => ({
//                ...cell,
//                hidden: cell.value === -1 ? false : cell.hidden,
//            }))
//        );
//        this.setState({ board: updatedBoard });

//    } else {
//        this.props.updatePoints();
//        const updatedBoard = [...this.state.board];
//        updatedBoard[row][col].value = this.props.points;
//         updatedBoard[row][col].hidden = false;
//        this.setState({ board: updatedBoard });
//    }
//};

    handleCellPress = (row, col) => {
        if (this.props.gameOver || !this.state.board[row][col].hidden) return;
        const cell = this.state.board[row][col];
        const updatedRevealedCells = new Set(this.state.revealedCells);
        updatedRevealedCells.add(`${row}-${col}`);
        this.setState({ revealedCells: updatedRevealedCells });

        if (cell.value === -1) {
            this.props.onGameOver();
            const updatedBoard = this.state.board.map((rowArr) =>
                rowArr.map((cellObj, colIndex) => ({
                    ...cellObj,
                    hidden: cellObj.value === -1 ? false : cellObj.hidden,
                }))
            );
            this.setState({ board: updatedBoard });
        } else {
            this.props.updatePoints();
            const updatedBoard = [...this.state.board];
            updatedBoard[row][col].value = this.props.points;
            updatedBoard[row][col].hidden = false;
            this.setState({ board: updatedBoard });
        }
    };
 componentDidUpdate(prevProps) {
       if (!prevProps.gameOver && this.props.gameOver) {
           
                 this.resetBoard();
           }
     }

 resetBoard = () => {
       const newBoard = this.initializeBoard();
      this.setState({ board: newBoard });
      this.props.onReset();
     };


renderBoard = () => {
    const board = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
        const row = [];
        for (let j = 0; j < BOARD_SIZE; j++) {
            row.push(this.renderCell(i, j, this.state.flippedCells.has('${i}-${j}')));
        }
        board.push(<View key={i} style={styles.row}>{row}</View>);
    }
    return board;
};

render() {
    return <View style={styles.board}>{this.renderBoard()}</View>;
}
}

const styles = StyleSheet.create({
    board: {
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
    },
});