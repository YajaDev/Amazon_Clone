// import dayjs from "https://esm.run/dayjs";

// const todayTime = dayjs();
// const add2 = dayjs().add(2,"day");

// const orderTime = dayjs("2025-08-14");
// const deliveryTime = orderTime.add(5, "day");  // arrives 5 days later
// const currentTime = orderTime.add(2, "day");   // 2 days passed

// console.log("Progress %:", progressPercent(currentTime, orderTime, deliveryTime));
// // const dsa = progressPercent()
// const sa = dayDiff(todayTime, add2);
// console.log(sa);
// console.log(add2);

function dayDiff(start, end) {
  return end.diff(start,'time')
}

export function progressPercent(currentT, orderT, deliveryT) {
  // subtract currentT to orderT
  const CTSutractOT = dayDiff(orderT,currentT);
  
  // subtract deliveryT to orderT
  const DTSutractOT = dayDiff(orderT,deliveryT);

  return CTSutractOT / DTSutractOT * 100
}