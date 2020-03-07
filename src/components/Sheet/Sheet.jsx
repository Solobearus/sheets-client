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

    const getCellValue = (i, j) => {
        return cells[j] && cells[j][ALPHABET[i]] ? cells[j][ALPHABET[i]] : [ALPHABET[i]] + j;
    }

    const getRow = (row) => {
        return (new Array(cols))
            .fill(0)
            .map((value, col) => (<Cell key={col} value={getCellValue(row, col)} index={{ col: col, row: ALPHABET[row] }}></Cell>))
    }

    return (
        <div className="sheet" data-testid="sheet">
            {
                (new Array(rows)).fill(0).map((column, row) => {
                    return (<div className="column" key={row}>{getRow(row)}</div>)
                })
            }
        </div>
    )
}

export default Sheet
