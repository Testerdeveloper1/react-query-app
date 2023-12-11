import React, { useState, useEffect, useRef } from 'react';
import { OrderList } from 'primereact/orderlist';
import { ProductService } from '../service/DragableService';

interface Product {
    id: string;
    code: string;
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
    quantity: number;
    inventoryStatus: 'string',
    rating: number;
}

interface DraggableItemProps<T> {
  children: T[];
  key: string;
  draggable: true;
  onDragStart: (e: React.DragEvent<T>) => void;
  onDragOver: (e: React.DragEvent<T>) => void;
  onDragDrop: React.DragEvent<Product>; 
  className: string;
}

export default function DraggableComponent() {
    const [products, setProducts] = useState<Product[]>([]);
    const orderListRef = useRef<OrderList>(null);

    useEffect(() => {
        ProductService.getProductsSmall().then((data) => setProducts(data));
    }, []);

    const onDragStart = (e: React.DragEvent<Product>) => {
        e.preventDefault();
        e.target?.classList.add('dragging');
    };

    const onDragOver = (e: React.DragEvent<Product>) => {
        e.preventDefault();
        const targetElement = e.target as HTMLElement;
        if (targetElement.classList.contains('orderlist-item') && targetElement !== e.currentTarget) {
            targetElement.classList.add('drag-over');
        }
    };

     const targetElement = e.target as HTMLElement;
  if (targetElement.classList.contains('orderlist-item') && targetElement !== e.currentTarget) {
    // Get the source and target product indexes.
    const sourceIndex = orderListRef.current?.findItemIndexByElement(e.dataTransfer?.getData('text'));
    const targetIndex = orderListRef.current?.findItemIndexByElement(targetElement);

    // Move the product from the source index to the target index.
    const updatedProducts = [...products];
    updatedProducts.splice(targetIndex, 0, updatedProducts.splice(sourceIndex, 1)[0]);

    // Set the updated products.
    setProducts(updatedProducts);
  }

  // Remove the dragging class from all orderlist items.
  orderListRef.current?.querySelectorAll('.orderlist-item').forEach((element) => {
    element.classList.remove('dragging');
    element.classList.remove('drag-over');
  });

    const itemTemplate = (item: Product): DraggableItemProps<Product> => {
        return (
            <div
                key={item.id}
                draggable={true}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDragDrop={onDragDrop}
                className="flex flex-wrap h-20 p-2 align-items-center gap-3 orderlist-item"
            >
                <div className="flex-1 flex flex-column gap-2 xl:mr-8">
                    <span className="font-bold">{item.name}</span>
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-tag text-sm"></i>
                        <span>{item.category}</span>
                    </div>
                </div>
                <span className="font-bold text-900">${item.price}</span>
            </div>
        );
    };

    return (
        <div className="card xl:flex xl:justify-content-center">
            <OrderList
                ref={orderListRef}
                value={products}
                onChange={(e) => setProducts(e.value)}
                itemTemplate={itemTemplate}
                header="Products"
                filter
                filterBy="name"
            ></OrderList>
        </div>
    );
}
