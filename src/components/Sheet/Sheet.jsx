import React, { useState, useEffect } from 'react'
import './Sheet.css'
import Cell from '../Cell/Cell';


//TODO:fix abc
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWZ'.toLowerCase().split('')

const Sheet = ({ rows, cols }) => {

    const [cells, setCells] = useState({});

    const mock = {
        "Cells":
        {
            "1": {
                "a": "aaaaaa1 aaaaaa1 aaaaaa1 aaaaa1",
                "b": "bbbbbb1",
            },
            "2": {
                "a": "aaaaaa12",
                "b": "bbbbbb12",
                "c": "ccccccc2",
            }
        }
    }

    useEffect(() => {
        setCells(mock.Cells);
    }, [])

    const getCellValue = (rowIndex, colIndex) => {
        return ALPHABET[colIndex]+rowIndex
    }

    const getRow = (rowIndex) => {
        return (new Array(cols))
            .fill(0)
            .map((value, colIndex) => (<Cell key={colIndex} value={getCellValue(rowIndex, colIndex)}
             index={{ col: ALPHABET[colIndex], row: rowIndex }}></Cell>))
    }

    return (
        <div className="sheet" data-testid="sheet">
            {
                (new Array(rows)).fill(0).map((column, rowIndex) => {
                    return (<div className="row" key={rowIndex}>{getRow(rowIndex)}</div>)
                })
            }
        </div>
    )
}

export default Sheet
