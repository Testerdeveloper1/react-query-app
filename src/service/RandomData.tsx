export const ProductService = {
    getProductsData() {
      return {
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
    },
   
    getProductsMini() {
      return new Promise((resolve) => {
        resolve(this.getProductsData());
      });
    }
   };
   