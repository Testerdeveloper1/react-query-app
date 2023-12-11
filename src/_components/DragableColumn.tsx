import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { DragDrop } from 'primereact/dragdrop';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

const DragableColumn: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    // Your initial products data
  ]);

  const onDragStart = (event: any, index: number) => {
    event.dataTransfer.setData('text', index.toString());
  };

  const onDragEnd = (event: any) => {
    const fromIndex = parseInt(event.dataTransfer.getData('text'), 10);
    const toIndex = event.currentTarget.dataset.index;

    const newProducts = [...products];
    const item = newProducts.splice(fromIndex, 1)[0];
    newProducts.splice(toIndex, 0, item);

    setProducts(newProducts);
  };

  return (
    <DataTable value={products} responsive={true}>
      <Column field="name" header="Name"></Column>
      <Column field="description" header="Description"></Column>
      <Column field="price" header="Price"></Column>
      <DragDrop onDragStart={onDragStart} onDragEnd={onDragEnd}>
        {products.map((product, index) => (
          <div key={product.id} data-index={index}>
            {product.name}
          </div>
        ))}
      </DragDrop>
    </DataTable>
  );
};

export default DragableColumn;