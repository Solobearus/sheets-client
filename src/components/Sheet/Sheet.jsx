import React, { useState, useEffect } from 'react'
import './Sheet.css'
import Cell from '../Cell/Cell';
import io from 'socket.io-client';


//TODO:fix abc
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWZ'.toLowerCase().split('')

const Sheet = ({ rows, cols }) => {

    const [cells, setCells] = useState({});
    const [sheet, setSheet] = useState(() => createSheet());

    useEffect(() => {
        fetch('http://localhost:3000/api/Sheet/Get')
            .then(res => res.json())
            .then(res => {
                setCells(res.Cells)
            })


    }, [])

    useEffect(() => {
        const socket = io('http://localhost:3000');

        socket.on("onCellSave", function (cells) {
            onCellSave(cells);
        });

        return () => socket.disconnect();
    })

    // const onCellSave = function ({ row, col, text }) {

    //    console.log('sheet', sheet);
    //     console.log('cells', cells);
        
    //     const newSheet = [].concat(sheet);

    //     console.log({ row, col, text });

    //     newSheet[[row][ALPHABET.indexOf(col)]] = <Cell key={col} value={text}
    //         index={{ col: ALPHABET[col], row: row + 1 }}></Cell>;

    //     console.log('socket is active');

    //     setSheet(newSheet);
    // }

    
    const onCellSave = function (cells) {
        setCells(cells);
    }

    useEffect(() => {
        setSheet(createSheet())
    }, [cells])

    function getCellValue(rowIndex, colIndex) {
        const rowData = cells[rowIndex + 1 + '']
        if (!rowData) {
            return ''
        }
        const cellData = rowData[ALPHABET[colIndex]]

        return cellData || ''
    }

    function getRow(rowIndex) {
        return (new Array(cols))
            .fill(0)
            .map((value, colIndex) => (<Cell key={colIndex} value={getCellValue(rowIndex, colIndex)}
                index={{ col: ALPHABET[colIndex], row: rowIndex + 1 }}></Cell>))
    }

    function createSheet() {
        return (new Array(rows))
            .fill(0)
            .map((column, rowIndex) => {
                return (<div className="row" key={rowIndex}>{getRow(rowIndex)}</div>)
            })
    }

    return (
        <div className="sheet" data-testid="sheet">
            {sheet}
        </div>
    )
}

export default Sheet
