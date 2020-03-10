import React, { useMemo } from 'react'
import './Sheet.css'
import Cell from '../Cell/Cell';
import useSheetManagment from './useSheetManagment'
import { ALPHABET } from './useSheetManagment'

const Sheet = React.memo(({ rows, cols }) => {

    const [sheet, updateServerCellChange, updateServerCellStartEdit] = useSheetManagment(rows, cols);

    const header = useMemo(() =>
        (new Array(cols))
            .fill('')
        , [rows]
    )

    return useMemo(
        () => (<div className="sheet" data-testid="sheet">
            {
                <>
                    {/* {console.log(sheet)
                    } */}
                    <div className="cell_header"></div>
                    {header && header.map((item, index) =>
                        <div className="cell_header" key={index}>{ALPHABET[index]}</div>
                    )}

                    {sheet && sheet.map((row, rowIndex) =>

                        <div className="row" key={rowIndex}>
                            <div className="cell_header">{rowIndex}</div>
                            {row.map((cell, colIndex) => {
                                return <Cell
                                    key={rowIndex + colIndex}
                                    cellText={cell.text}
                                    editingBySomeone={cell.editing}
                                    row={rowIndex}
                                    col={ALPHABET[colIndex]}
                                    updateServerCellChange={updateServerCellChange}
                                    updateServerCellStartEdit={updateServerCellStartEdit}
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
