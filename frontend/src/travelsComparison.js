function calculateUberPrice(distance) {
  const tarifaFixaMin = 1.5;
  const tarifaFixaMax = 4.5;
  const tarifasPorKmMin = 1.0;
  const tarifasPorKmMax = 2.45;

  const dynamicPrice = Math.random() * (1.5 - 0.8) + 0.8;
  const precoNormalMin = tarifaFixaMin + (distance * tarifasPorKmMin);
  const precoNormalMax = tarifaFixaMax + (distance * tarifasPorKmMax);

  const precoMinComDynamic = precoNormalMin * dynamicPrice;
  const precoMaxComDynamic = precoNormalMax * dynamicPrice;

  return `${precoMinComDynamic.toFixed(2)} - ${precoMaxComDynamic.toFixed(2)}`;
}

function calculateTaxi99Price(distance) {
  const tarifaFixaMin = 1.5;
  const tarifaFixaMax = 4.5;
  const tarifasPorKmMin = 1.0;
  const tarifasPorKmMax = 2.45;

  const dynamicPrice = Math.random() * (1.5 - 0.8) + 0.8;
  const precoNormalMin = tarifaFixaMin + (distance * tarifasPorKmMin);
  const precoNormalMax = tarifaFixaMax + (distance * tarifasPorKmMax);

  const precoMinComDynamic = precoNormalMin * dynamicPrice;
  const precoMaxComDynamic = precoNormalMax * dynamicPrice;

  return `${precoMinComDynamic.toFixed(2)} - ${precoMaxComDynamic.toFixed(2)}`;
}

function compareTravels(distance) {
  const taxi99Price = calculateTaxi99Price(distance);
  const uberPrice = calculateUberPrice(distance);

  if (uberPrice <= taxi99Price) {
    return { app: 'uber', price: uberPrice };
  } else {
    return { app: '99', price: taxi99Price };
  }
}

export default compareTravels;
