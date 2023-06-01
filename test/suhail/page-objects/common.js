module.exports= class Common
{
    constructor()
    {
    }
    isDescending(priceArray)
    {
      for (let i = 0; i < priceArray.length - 1; i++) {
        if (priceArray[i] < priceArray[i + 1])
          return false;
      }
      return true;
    }
    maxToDescending(priceArray)
    {
        for(let i=0;i< priceArray.length - 1;i++)
        {
            if(priceArray[i]<=30000)
              return true;
        }
        return false;
    }
}