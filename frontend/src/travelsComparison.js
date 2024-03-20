const compareTravels = () => {
    const uberPrice = 35;
    const taxi99Price = 30;
  
    if (uberPrice < taxi99Price) {
      return 'uber';
    } else if (taxi99Price < uberPrice) {
      return '99';
    } else {
      return 'uber';
    }
  };
  
  export default compareTravels;
  