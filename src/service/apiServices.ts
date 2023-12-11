import axios from "axios";


export const fetchProducts = async (page: number) => {
    const { data } = await axios.get(`http://127.0.0.1:8000/test/products/?page=${page}`);
    return { data: data?.results, count: data?.count };
   }
   
export  const deleteProduct = async (productId:number) => {
     
     try {
       const response = await axios.delete(`http://127.0.0.1:8000/test/products/${productId}/`);
       console.log(response.data); 
     } catch (error) {
       console.error(error);
     }
     // queryClient.invalidateQueries('products');
   
     };
   
export  const editProduct = async (productId:any, updatedProduct:any) => {
   
    try {
      const response = await axios.put(`http://127.0.0.1:8000/test/products/${productId}/`,{
       code:'jamal',name:'jamal'
      }
   
       // updatedProduct
       );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
   //  queryClient.invalidateQueries('products');
   
   };