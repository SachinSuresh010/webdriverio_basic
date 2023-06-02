module.exports= class Common {
    constructor() {
    }
    async descendingSort(priceSet) {
          let flag=true;
            for (let i = 0; i <= priceSet.length ; i++) {
              if (!(priceSet[i+1] <= priceSet[i])) 
              flag = false;
              return flag;
            }
            
          }
    }
  

  