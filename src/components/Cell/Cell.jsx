import React, { useState, useEffect } from 'react'
import './Cell.css'

const Cell = React.memo(({ cellText, editingBySomeone, col, row, updateServerCellChange, updateServerCellStartEdit }) => {
    const [cellValue, setCellValue] = useState(cellText);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        setCellValue(cellText);
    }, [cellText])

    const onChangeHandle = (event) => {
        setCellValue(event.target.value);
    }

    const onClickHandle = () => {
        setEditing(true);
        updateServerCellStartEdit(col, row);
    }

    const onBlurHandle = () => {
        setEditing(false);
        updateServerCellChange(col, row, cellValue);
    }

    return editing ?
        <input
            type="text"
            className="cell"
            onChange={onChangeHandle}
            value={cellValue}
            onBlur={() => onBlurHandle()}
            autoFocus />
        :
        <div
            className={`cell ${editingBySomeone && 'editing'}`}
            onClick={() => !editingBySomeone && onClickHandle()}
        >{editingBySomeone ? 'editing...'.split('').map(letter => <span className="letter">{letter}</span>) : cellValue}
        </div>
})

export default Cell
