import React, { useState, useEffect } from 'react'
import './Cell.css'

const Cell = React.memo(({ value, col, row, updateServer }) => {
    const [cellValue, setCellValue] = useState(value);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        setCellValue(value);
    }, [value])

    const onChangeHandle = (event) => {
        setCellValue(event.target.value);
    }

    const onClickHandle = () => {
        setEditing(true);
    }

    const onBlurHandle = () => {
        setEditing(false);

        updateServer(col, row, cellValue);
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
            className="cell"
            onClick={() => onClickHandle()}
        >{cellValue}
        </div>
})

export default Cell
