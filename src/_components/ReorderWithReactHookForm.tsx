import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useForm } from 'react-hook-form';

type DataObject = {
 id: string;
 code: string;
 name: string;
};

type DataArray = DataObject[];

const ReorderHookform = () => {
 const [dataArray, setDataArray] = useState<DataArray>([]);
 const { register, setValue } = useForm();

 useEffect(() => {
  const myData = {
    data: {
      actions: {
        id: "1000",
        code: "f230fh0g3",
        name: "Bamboo Watch"
      },
      columnsName: {
        id: "1001",
        code: "code1",
        name: "Bamboo"
      },
      newone: {
        id: "1002",
        code: "d3232",
        name: "hot Watch"
      },
      actions: {
        id: "1003",
        code: "d32233223",
        name: "dssf Watch"
      }
    }
  };

  const dataPromise = Promise.resolve(myData);

  dataPromise.then((myData) => {
    const dataArray = Object.entries(myData.data).map(([key, value]) => ({
      id: key,
      ...value,
    }));

    setDataArray(dataArray);
  });
 }, []);

 const columnNames = ['id', 'code', 'name'];

 const reorderArray = (array: DataArray, startIndex: number, endIndex: number): DataArray => {
  const result = [...array];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
 };

 return (
  <DataTable value={dataArray}
    reorderableColumns
    reorderableRows 
    onRowReorder={(e) => {
      const newDataArray = reorderArray(dataArray, e.dragIndex, e.dropIndex);
      newDataArray.forEach((item, index) => {
        setValue(`id-${index}`, e.dropIndex); // Update the id based on the dropIndex
      });
      setDataArray(newDataArray);
    }}>
    <Column rowReorder style={{ width: '3rem' }} />
    {columnNames.map((columnName) => (
      <Column field={columnName} header={columnName} key={columnName} />
    ))}
  </DataTable>
 );
};

export default ReorderHookform;
