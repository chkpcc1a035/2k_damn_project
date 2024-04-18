import { RootState } from "@/store/store";
import {
  Card,
  Divider,
  Group,
  NumberFormatter,
  Stack,
  Text,
} from "@mantine/core";
import { useSelector } from "react-redux";

export function CheckoutOrderCard() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  let order = 0;
  cartItems.forEach((item) => {
    order += item.product_price * item.quantity;
  });
  const shipping = 30;
  const discount = 0;
  const subtotal = order + shipping + discount;
  const taxes = subtotal * 0.03;
  const total = subtotal + taxes;

  const summary = {
    order,
    shipping,
    discount,
    subtotal,
    taxes,
    total,
  };

  return (
    <Card withBorder radius="lg" shadow="lg" p={"xl"}>
      <Stack>
        <Text fw={700} fz={{ base: 24, xs: 30 }}>
          Review Orders
        </Text>
        <Group justify="space-between" wrap="nowrap">
          <Text c={"dimmed"}>Original Price</Text>
          <Text>
            <NumberFormatter
              prefix="$ "
              value={summary.order}
              thousandSeparator
              decimalScale={2}
              fixedDecimalScale
            />
          </Text>
        </Group>
        <Group justify="space-between" wrap="nowrap">
          <Text c={"dimmed"}>Discount</Text>
          <Text>
            <NumberFormatter
              prefix="$ "
              value={summary.discount}
              thousandSeparator
              decimalScale={2}
              fixedDecimalScale
            />
          </Text>
        </Group>
        <Group justify="space-between" wrap="nowrap">
          <Text c={"dimmed"}>Shipping</Text>
          <Text>
            <NumberFormatter
              prefix="$ "
              value={summary.shipping}
              thousandSeparator
              decimalScale={2}
              fixedDecimalScale
            />
          </Text>
        </Group>
        <Divider />
        <Group justify="space-between" wrap="nowrap">
          <Text fw={700} c={"dimmed"}>
            Subtotal
          </Text>
          <Text fw={700}>
            <NumberFormatter
              prefix="$ "
              value={summary.subtotal}
              thousandSeparator
              decimalScale={2}
              fixedDecimalScale
            />
          </Text>
        </Group>
        <Group justify="space-between" wrap="nowrap">
          <Text c={"dimmed"}>Taxes</Text>
          <Text>
            <NumberFormatter
              prefix="$ "
              value={summary.taxes}
              thousandSeparator
              decimalScale={2}
              fixedDecimalScale
            />
          </Text>
        </Group>
        <Divider />
        <Group justify="space-between" wrap="nowrap">
          <Text fw={700} fz={24}>
            Total
          </Text>
          <Text fw={700} fz={24}>
            <NumberFormatter
              prefix="$ "
              value={summary.total}
              thousandSeparator
              decimalScale={2}
              fixedDecimalScale
            />
          </Text>
        </Group>
      </Stack>
    </Card>
  );
}
