import React, { useState } from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import { ColDef } from '@ag-grid-community/core';
import { SummaryRow } from '../../types/table.types';

function SummaryGrid({ userData }: { userData: SummaryRow[] }) {
  const [rowData, setRowData] = useState<SummaryRow[]>(userData);
  const [colDefs, setColDefs] = useState<ColDef<SummaryRow>[]>([
    { field: 'name' },
    { field: 'complete' },
    { field: 'incomplete' },
  ]);
  const defaultColDef: ColDef = {
    flex: 1,
  };

  return (
    <div className="ag-theme-quartz summary-grid">
      <AgGridReact rowData={rowData} columnDefs={colDefs} defaultColDef={defaultColDef} />
    </div>
  );
};

export default SummaryGrid;