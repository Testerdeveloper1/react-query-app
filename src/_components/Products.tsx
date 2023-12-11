import React, { useState } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { useQuery } from 'react-query';
import { Button } from 'primereact/button';
import { deleteProduct, editProduct } from '../service/apiServices';
import { productStore, useProduct } from '../stores/globaleStore';
import { useStore } from 'zustand';
import { useQueryClient } from 'react-query';

interface Product {
 id: string;
 code: string;
 name: string;
 description: string;
 image: string;
 price: number;
 category: string;
 quantity: number;
 inventoryStatus: string;
 rating: number;
}



const Product = () => {
  const queryClient = useQueryClient();

  
  const {page} = useStore(productStore)
  const {changePage } = useStore(productStore).actions

  const data = useProduct(page)?.data
 
 const products = data?.data;
 const totalRecords = data?.count;
 const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
 const [rowsPerPage, setRowsPerPage] = useState(5);
//  const [rowClick, setRowClick] = useState<boolean>(true);
 const onPageChange = (event:any) => {
  changePage(event.page + 1);
 setRowsPerPage(event.rows);
 }

 const headerTemplate = (data:any) => (
  <div className='w-full flex justify-between '>
    <h2>{data.title}</h2>
    <div className="flex justify-between gap-20 w-full p-datatable-header-tools">
      <div style={{
       display:"flex",
       justifyContent:'space-between'
      }} className="p-datatable-header-tools-left mx-4">
        <Button style={{
         margin:"5px 10px"
        }} className="p-button p-button-outlined p-button-success" onClick={() => setSelectedProducts(products !== undefined ?products.filter(product => product.id !== '1'):[])}>
          Select All
        </Button>
        <Button className="" onClick={() => setSelectedProducts([])}>
          Unselect All
        </Button>
        <Button style={{
         margin:"5px 10px"
        }} className="p-button p-button-outlined p-button-warning" onClick={() => {
          // if (selectedProducts.length > 0) {
            const productId = selectedProducts[0].id;
            deleteProduct(Number(productId));
          // }
          queryClient.invalidateQueries(['products'])

        }}>
          Delete
        </Button>
        <Button style={{
         margin:"5px 10px"
        }} className="p-button p-button-outlined p-button-info" onClick={() => {
          if (selectedProducts.length > 0) {
            const productId = selectedProducts[0].id;
            const updatedProduct = { /* updated product data */ };
            editProduct(productId, updatedProduct);
          }
        }}>
          Edit
        </Button>
      </div>
    </div>
    <p>Number of selected rows: {selectedProducts.length}</p>
  </div>
 );

 return (
 <div>
  <DataTable value={products} selection={selectedProducts} onSelectionChange={e => setSelectedProducts(e.value)}
 selectionMode="multiple"
 header={headerTemplate} rows={rowsPerPage} onPage={onPageChange}>

 <Column field="code" header="Code"></Column>
 <Column field="name" header="Name"></Column>
 <Column field="category" header="Category"></Column>
 <Column field="quantity" header="Quantity"></Column>
 <Column selectionMode="multiple" headerStyle={{width: '3em'}}></Column>
</DataTable>

  <Paginator first={page} rows={rowsPerPage} totalRecords={totalRecords} onPageChange={onPageChange}></Paginator>

 </div>
 );
}

export default Product;
