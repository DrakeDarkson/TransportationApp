// Updated data at march 2024

function calculateUberPrice(distance, time) {
  const basePrice = 3.23;
  const minPrice = 7.88;
  const perKilometerPrice = 1.33;
  const perMinutePrice = 0.27;
  const currentTime = new Date().getHours();

  const totalPrice = basePrice + (distance * perKilometerPrice);
  const timePrice = perMinutePrice * time;
  const finalPrice = Math.max(totalPrice, minPrice + timePrice);

  let dynamicPriceFactor = 1.25;

  if (currentTime >= 22 || currentTime <= 10) {
    dynamicPriceFactor = 1.5;
  }

  const minPriceWithDynamic = finalPrice * dynamicPriceFactor * 0.75;
  const maxPriceWithDynamic = finalPrice * dynamicPriceFactor * 1.25;

  const minPriceFormatted = minPriceWithDynamic.toFixed(2).replace('.', ',');
  const maxPriceFormatted = maxPriceWithDynamic.toFixed(2).replace('.', ',');

  return `${minPriceFormatted} - ${maxPriceFormatted}`;
}

function calculateTaxi99Price(distance, time) {
  const basePrice = 2.00;
  const minPrice = 7.67;
  const perKilometerPrice = 1.69;
  const perMinutePrice = 0.11;
  const currentTime = new Date().getHours();

  const totalPrice = basePrice + (distance * perKilometerPrice);
  const timePrice = perMinutePrice * time;
  const finalPrice = Math.max(totalPrice, minPrice + timePrice);

  let dynamicPriceFactor = 1.25;

  if (currentTime > 10 && currentTime < 22) {
    dynamicPriceFactor = 1.5;
  }

  const minPriceWithDynamic = finalPrice * dynamicPriceFactor * 0.75;
  const maxPriceWithDynamic = finalPrice * dynamicPriceFactor * 1.25;

  const minPriceFormatted = minPriceWithDynamic.toFixed(2).replace('.', ',');
  const maxPriceFormatted = maxPriceWithDynamic.toFixed(2).replace('.', ',');

  return `${minPriceFormatted} - ${maxPriceFormatted}`;
}

function compareTravels(distance, time, userApps) {
  const taxi99Price = calculateTaxi99Price(distance, time);
  const uberPrice = calculateUberPrice(distance, time);

  const hasUberAccess = userApps.includes('Uber');
  const hasTaxi99Access = userApps.includes('99');

  if (hasUberAccess && hasTaxi99Access) {
    if (uberPrice <= taxi99Price) {
      return { app: 'uber', price: uberPrice };
    } else {
      return { app: '99', price: taxi99Price };
    }
  } else if (hasUberAccess) {
    return { app: 'uber', price: uberPrice };
  } else if (hasTaxi99Access) {
    return { app: '99', price: taxi99Price };
  } else {
    return { app: 'Nenhum app disponível', price: '-' };
  }
}

export default compareTravels;
