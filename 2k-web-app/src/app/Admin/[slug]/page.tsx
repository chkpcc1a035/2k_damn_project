import { CustomersDisplay } from "@/components/admin/CustomersDisplay";
import { DashboardDisplay } from "@/components/admin/DashboardDisplay";
import { OrdersDisplay } from "@/components/admin/OrdersDisplay";
import { ProductsDisplay } from "@/components/admin/ProductsDisplay";
import { Stack, Text } from "@mantine/core";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      {params.slug === "Home" && (
        <>
          <Stack maw={700} p={"xl"}>
            <Text fw={700} fz={{ base: "h1" }}>
              Admin Portal
            </Text>
            <Text fw={500} fz={{ base: "h3" }}>
              Streamline Your Business Management
            </Text>
            <Text fz={{ base: "md" }} c={"dimmed"}>
              Welcome to the Admin Portal! Effortlessly manage users, products,
              orders, and settings from one centralized platform. Get insights,
              take action, and drive success.
            </Text>
          </Stack>
        </>
      )}
      {params.slug === "Dashboard" && <DashboardDisplay />}
      {params.slug === "Orders" && <OrdersDisplay />}
      {params.slug === "Products" && <ProductsDisplay />}
      {params.slug === "Customers" && <CustomersDisplay />}
    </>
  );
}
