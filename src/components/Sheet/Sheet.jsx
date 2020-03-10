import React, { useState, useEffect, useCallback, useMemo } from 'react'
import './Sheet.css'
import Cell from '../Cell/Cell';
import io from 'socket.io-client';


const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase().split('')

const Sheet = React.memo(({ rows, cols }) => {

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

        socket.on("onCellSave", function ({ row, col, text }) {

            setCells(cell => {
                const newCells = { ...cells }
                newCells[row] = { ...cell[row], [col]: text }

                return newCells;
            })
        });

        return () => socket.disconnect();
    }, [])

    useEffect(() => {
        populateSheet();
    }, [cells])

    const updateServer = useCallback(
        (col, row, cellValue) => {
            const index = { col, row, text: cellValue };

            fetch('http://localhost:3000/api/Sheet/Save',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        index
                    )
                })
                .catch(err => console.error(err))
        },
        [],
    )

    function populateSheet() {
        const newSheet = [...sheet];

        cells && Object.keys(cells).forEach(row => {
            newSheet[+row] = [...newSheet[+row]]
            Object.keys(cells[row]).forEach(col => {
                newSheet[+row][ALPHABET.indexOf(col)] = cells[+row][col];
            });
        });

        setSheet(newSheet);
    }

    function createSheet() {
        return (new Array(rows))
            .fill(
                (new Array(cols))
                    .fill('')
            )
    }

    const header = useMemo(() =>
        (new Array(cols))
            .fill('test')
        , [rows]
    )

    return useMemo(
        () => (<div className="sheet" data-testid="sheet">
            {
                <>
                    <div className="cell_header"></div>
                    {header && header.map((item, index) =>
                        <div className="cell_header" key={index}>{ALPHABET[index]}</div>
                    )}

                    {sheet && sheet.map((row, rowIndex) =>

                        <div className="row" key={rowIndex}>
                            <div className="cell_header">{rowIndex}</div>
                            {row.map((value, colIndex) => {
                                return <Cell
                                    key={rowIndex + colIndex}
                                    value={value}
                                    row={rowIndex}
                                    col={ALPHABET[colIndex]}
                                    updateServer={updateServer}
                                ></Cell>
                            })}
                        </div>
                    )}
                </>
            }
        </div>),
        [sheet]
    )
})

export default Sheet
