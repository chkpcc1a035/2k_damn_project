import {
  ActionIcon,
  Card,
  Divider,
  Group,
  Image,
  NumberFormatter,
  Text,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

import { useDispatch } from "react-redux";
import { removeFromCart } from "@/store/slices/cartSlice";

type CartType = {
  product_id: string;
  product_image: string;
  product_name: string;
  product_price: number;
  quantity: number;
};

export function CartItemCard({ data }: { data: CartType }) {
  const dispatch = useDispatch();
  return (
    <Card withBorder>
      <Group wrap="nowrap" justify="space-between">
        <Group wrap="nowrap">
          <Image
            src={data.product_image}
            radius={"sm"}
            w={100}
            alt={`${data.product_name}`}
          />
          <Divider orientation="vertical" />
          <div>
            <Text fw={700} lineClamp={1}>
              {data.product_name}
            </Text>
            <Text>
              <NumberFormatter
                prefix="$ "
                value={data.product_price}
                thousandSeparator
                decimalScale={2}
                fixedDecimalScale
              />
            </Text>
            <Text c={"dimmed"} fz={"xs"} mt={"xs"}>
              Quantity: {data.quantity}
            </Text>
          </div>
        </Group>
        <ActionIcon
          variant="subtle"
          aria-label="Remove"
          color="grey"
          onClick={() => dispatch(removeFromCart(data.product_id))}
        >
          <IconTrash stroke={1} />
        </ActionIcon>
      </Group>
    </Card>
  );
}
