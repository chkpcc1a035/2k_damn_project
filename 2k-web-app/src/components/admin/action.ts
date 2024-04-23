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
  const products = await prisma.orderItem.groupBy({
    by: ["productId"],
    _sum: {
      quantity: true,
    },
    _count: {
      productId: true,
    },
  });
  const productDetails = await prisma.product.findMany({
    where: {
      id: {
        in: products.map((p) => p.productId),
      },
    },
    select: {
      id: true,
      name: true,
      price: true,
    },
  });
  const results = products.map((product) => {
    const productDetail = productDetails.find(
      (detail) => detail.id === product.productId
    );
    return {
      name: productDetail ? productDetail.name : "Unknown",
      count: product._sum.quantity ? product._sum.quantity : 0,
      total:
        (product._sum.quantity ? product._sum.quantity : 0) *
        (productDetail?.price ? productDetail.price : 0),
    };
  });
  const topProducts = results
    .sort((a, b) => b.total - a.total)
    .slice(0, 5)
    .map((item, index) => [index + 1, item.name, item.count, item.total]);
  return topProducts;
}

export async function getTopCustomers() {
  const customers = await prisma.customer.findMany({
    include: {
      orders: {
        select: { total: true },
      },
    },
  });

  const results = customers.map((customer, index) => ({
    name: customer.name,
    total: customer.orders.reduce((sum, order) => sum + order.total, 0),
  }));
  const topCustomer = results
    .sort((a, b) => b.total - a.total)
    .slice(0, 5)
    .map((item, index) => [index + 1, item.name, item.total]);

  return topCustomer;
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
  const firstQuartile = ss.quantile(orderTotals, 0.25);
  const thirdQuartile = ss.quantile(orderTotals, 0.75);
  const interQuartileRange = ss.interquartileRange(orderTotals);

  return [
    ["Mean", mean],
    ["Median", median],
    ["First Quartile", firstQuartile],
    ["Third Quartile", thirdQuartile],
    ["Interquartile Range", interQuartileRange],
  ];
}
