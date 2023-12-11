import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const ReorderDemo = () => {
 const [dataArray, setDataArray] = useState([]);

 useEffect(() => {
  const myData = {
    data: {
      actions: {
        id: "1000",
        code: "f230fh0g3",
        name: "Bamboo Watch"
      },
      columnsName: {
        id: "1000",
        code: "code1",
        name: "Bamboo"
      },
      newone: {
        id: "1000",
        code: "d3232",
        name: "hot Watch"
      },
      actions: {
        id: "1000",
        code: "d32233223",
        name: "dssf Watch"
      }
    }
  };

  const dataPromise = Promise.resolve(myData);

  dataPromise.then((myData) => {
    const dataArray = Object.entries(myData.data).map(([key, value]) => ({
      key,
      ...value,
    }));

    setDataArray(dataArray);
  });
 }, []);

 const columnNames = ['key', 'id', 'code', 'name'];

 return (
  <DataTable value={dataArray}
   reorderableColumns
    reorderableRows 
    onRowReorder={(e) => setDataArray(e.value)}>
    <Column rowReorder style={{ width: '3rem' }} />
    {columnNames.map((columnName) => (
      <Column field={columnName} header={columnName} key={columnName} />
    ))}
  </DataTable>
 );
};

export default ReorderDemo;
