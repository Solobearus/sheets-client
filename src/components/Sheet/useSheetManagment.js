import io from 'socket.io-client';
import React, { useState, useEffect, useCallback } from 'react'

export const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');

export default function useSheetManagment(rows, cols) {
    const [cells, setCells] = useState({});
    const [sheet, setSheet] = useState(() => createSheet());
    let socket = null

    useEffect(() => {
        fetch('http://localhost:3000/api/Sheet/Get')
            .then(res => res.json())
            .then(res => {
                setCells(res.Cells)
            })
    }, [])

    useEffect(() => {
        socket = io('http://localhost:3000');

        socket.on("onCellSave", function ({ row, col, value }) {

            setCells(cell => {

                const newCells = { ...cells }
                newCells[row] = { ...cell[row], [col]: value }
                // console.log(newCells);

                return newCells;
            })
        });

        socket.on("onCellStartEditing", function ({ row, col }) {
            console.log('onCellStartEditing');

            setSheet(sheet => {
                const newSheets = [...sheet]

                newSheets[row][ALPHABET.indexOf(col)] = { ...newSheets[row][ALPHABET.indexOf(col)], editing: true }

                return newSheets;
            })
        });

        return () => socket.disconnect();
    }, [])

    useEffect(() => {
        populateSheet();
    }, [cells]);

    const updateServerCellChange = useCallback(
        (col, row, cellValue) => {
            const index = { col, row, value: cellValue };

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

    const updateServerCellStartEdit = useCallback(
        (col, row) => {
            const index = { col, row };

            socket.emit("onCellStartEditing", index)
        },
        [],
    )

    function populateSheet() {
        const newSheet = [...sheet];

        cells && Object.keys(cells).forEach(row => {
            newSheet[+row] = [...newSheet[+row]]
            Object.keys(cells[row]).forEach(col => {
                newSheet[+row][ALPHABET.indexOf(col)] = { text: cells[+row][col], editing: false };
            });
        });

        setSheet(newSheet);
    }

    function createSheet() {
        return (new Array(rows))
            .fill(
                (new Array(cols))
                    .fill({ text: '', editing: false })
            )
    }
    return [sheet, updateServerCellChange, updateServerCellStartEdit];
}