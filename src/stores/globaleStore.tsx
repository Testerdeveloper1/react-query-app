import { useQuery } from "react-query";
import { createStore } from "zustand";
import { fetchProducts } from "../service/apiServices";

3 
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

export type ProductStore ={
    actions:{
        changePage:(page:number)=>void;
    }
    page:number
}

export const productStore = createStore<ProductStore>((set)=>({
    actions:{
        changePage(page){
            set({page})
        }
    },
    page:1


}))
export const useProduct = (page:number) => {
    const { data: productsData, isLoading, error } = useQuery<{ data: Product[], count: number }, Error>({
      queryKey: ['products', page],
      queryFn: () => fetchProducts(page),
    });
   return {
    data:productsData,
    isLoading:isLoading,
    error:error
   }
    // Rest of your code...
   }
   
