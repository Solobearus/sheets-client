import React, { useState, useEffect } from 'react'
import './Sheet.css'
import Cell from '../Cell/Cell';


//TODO:fix abc
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWZ'.toLowerCase().split('')

const Sheet = ({ rows, cols }) => {

    const [cells, setCells] = useState({});
    const [sheet, setSheet] = useState([]);

    useEffect(() => {
        setSheet(createSheet());
        fetch('http://localhost:3000/api/Sheet/Get')
            .then(res => res.json())
            .then(res => {
                setCells(res.Cells)
                setSheet(createSheet());
            })
    }, [])

    useEffect(() => {
        setSheet(createSheet());
    }, [cells])


    const getCellValue = (rowIndex, colIndex) => {
        const rowData = cells[rowIndex + 1 + '']
        if (!rowData) {
            return ''
        }
        const cellData = rowData[ALPHABET[colIndex]]

        return cellData || ''
    }

    const getRow = (rowIndex) => {
        return (new Array(cols))
            .fill(0)
            .map((value, colIndex) => (<Cell key={colIndex} value={getCellValue(rowIndex, colIndex)}
                index={{ col: ALPHABET[colIndex], row: rowIndex + 1 }}></Cell>))
    }

    function createSheet() {
        return (new Array(rows)).fill(0).map((column, rowIndex) => {
            return (<div className="row" key={rowIndex}>{getRow(rowIndex)}</div>)
        })
    }

    return (
        <div className="sheet" data-testid="sheet">
            {console.log('sheet rerender')}
            {/* {sheet} */}
            {/* {createSheet()} */}
        </div>
    )
}

export default Sheet
