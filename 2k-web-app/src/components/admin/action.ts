"use server";

import { PrismaClient } from "@prisma/client";

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

  // Get number of customers created this month
  const thisMonthCount = await prisma.customer.count({
    where: {
      createdAt: {
        gte: currentMonth,
      },
    },
  });

  // Get number of customers created last month
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

  // Calculate total revenue for the current month
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

  // Calculate total revenue for the last month
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
      value: revenueThisMonth._sum.total ?? 0, // If no orders, return 0
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

  // Calculate units sold for the current month
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

  // Calculate units sold for the last month
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
      value: unitsThisMonth._sum.quantity ?? 0, // If no orders, return 0
      diff:
        ((unitsThisMonth._sum.quantity ?? 0) /
          (unitsLastMonth._sum.quantity ?? 0) -
          1) *
        100,
    };
  }
}
