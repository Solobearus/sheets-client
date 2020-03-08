import React, { useState ,useEffect} from 'react'
import './Cell.css'


const Cell = ({ value, index }) => {
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
        console.log(index);
        
        updateServer();
    }

    const updateServer = () => {
        index.text = cellValue;

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
            .then()
            .catch();
    }

    console.log(index, value, cellValue);
    
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
}

export default Cell
