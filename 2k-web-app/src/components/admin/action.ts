"use server";

import { PrismaClient } from "@prisma/client";
import * as ss from "simple-statistics";

const prisma = new PrismaClient();

export async function getCustomerCounts() {
  const currentDate = new Date();
  const currentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  );
  const thisMonthCount = await prisma.customer.count({
    where: {
      createdAt: {
        gte: currentMonth,
      },
    },
  });
  const lastMonthCount = await prisma.customer.count({
    where: {
      createdAt: {
        gte: lastMonth,
        lt: currentMonth,
      },
    },
  });
  if (lastMonthCount === 0) {
    return {
      value: thisMonthCount,
      diff: 100,
    };
  } else {
    return {
      value: thisMonthCount,
      diff: (thisMonthCount / lastMonthCount - 1) * 100,
    };
  }
}

export async function getTotalRevenue() {
  const currentDate = new Date();
  const currentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  );
  const revenueThisMonth = await prisma.order.aggregate({
    _sum: {
      total: true,
    },
    where: {
      createdAt: {
        gte: currentMonth,
      },
    },
  });
  const revenueLastMonth = await prisma.order.aggregate({
    _sum: {
      total: true,
    },
    where: {
      createdAt: {
        gte: lastMonth,
        lt: currentMonth,
      },
    },
  });
  if (!revenueLastMonth._sum.total) {
    return {
      value: revenueThisMonth._sum.total ?? 0,
      diff: 100,
    };
  } else {
    return {
      value: revenueThisMonth._sum.total ?? 0,
      diff:
        ((revenueThisMonth._sum.total ?? 0) /
          (revenueLastMonth._sum.total ?? 0) -
          1) *
        100,
    };
  }
}

export async function getUnitsSold() {
  const currentDate = new Date();
  const currentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  );
  const unitsThisMonth = await prisma.orderItem.aggregate({
    _sum: {
      quantity: true,
    },
    where: {
      order: {
        createdAt: {
          gte: currentMonth,
        },
      },
    },
  });
  const unitsLastMonth = await prisma.orderItem.aggregate({
    _sum: {
      quantity: true,
    },
    where: {
      order: {
        createdAt: {
          gte: lastMonth,
          lt: currentMonth,
        },
      },
    },
  });

  if (!unitsLastMonth._sum.quantity) {
    return {
      value: unitsThisMonth._sum.quantity ?? 0,
      diff: 100,
    };
  } else {
    return {
      value: unitsThisMonth._sum.quantity ?? 0,
      diff:
        ((unitsThisMonth._sum.quantity ?? 0) /
          (unitsLastMonth._sum.quantity ?? 0) -
          1) *
        100,
    };
  }
}

export async function getAverageOrderTotal() {
  const currentDate = new Date();
  const currentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  );

  const avgThisMonth = await prisma.order.aggregate({
    _avg: {
      total: true,
    },
    where: {
      createdAt: {
        gte: currentMonth,
      },
    },
  });
  const avgLastMonth = await prisma.order.aggregate({
    _avg: {
      total: true,
    },
    where: {
      createdAt: {
        gte: lastMonth,
        lt: currentMonth,
      },
    },
  });
  if (!avgLastMonth._avg.total) {
    return {
      value: avgThisMonth._avg.total ?? 0,
      diff: 100,
    };
  } else {
    return {
      value: avgThisMonth._avg.total ?? 0,
      diff:
        ((avgThisMonth._avg.total ?? 0) / (avgLastMonth._avg.total ?? 0) - 1) *
        100,
    };
  }
}

export async function getTopProducts() {
  const topProducts = await prisma.orderItem.groupBy({
    by: ["productId"],
    _sum: {
      productPrice: true,
    },
    _count: {
      productId: true,
    },
    orderBy: {
      _sum: {
        productPrice: "desc",
      },
    },
    take: 5,
  });
  const productDetails = await prisma.product.findMany({
    where: {
      id: {
        in: topProducts.map((p) => p.productId),
      },
    },
    select: {
      id: true,
      name: true,
    },
  });
  const results = topProducts.map((product, index) => {
    const productDetail = productDetails.find(
      (detail) => detail.id === product.productId
    );
    return [
      index + 1,
      productDetail ? productDetail.name : "Unknown",
      product._count.productId,
      product._sum.productPrice,
    ];
  });

  return results;
}

export async function getTopCustomers() {
  const customers = await prisma.customer.findMany({
    include: {
      orders: {
        select: { total: true },
      },
    },
  });

  const customerTotals = customers
    .map((customer, index) => [
      index + 1,
      customer.name,
      customer.orders.reduce((sum, order) => sum + order.total, 0),
    ])
    .slice(0, 5);

  return customerTotals;
}

export async function getOrderStatistics() {
  const orders = await prisma.order.findMany({
    select: {
      orderTotal: true,
    },
  });
  const orderTotals = orders.map((order) => order.orderTotal);
  const mean = ss.mean(orderTotals);
  const median = ss.median(orderTotals);
  const stdDeviation = ss.standardDeviation(orderTotals);
  const firstQuartile = ss.quantile(orderTotals, 0.25);
  const thirdQuartile = ss.quantile(orderTotals, 0.75);
  const interQuartileRange = ss.interquartileRange(orderTotals);

  return [
    ["Mean", mean],
    ["Median", median],
    ["Standard Deviation", stdDeviation],
    ["First Quartile", firstQuartile],
    ["Third Quartile", thirdQuartile],
    ["Interquartile Range", interQuartileRange],
  ];
}
