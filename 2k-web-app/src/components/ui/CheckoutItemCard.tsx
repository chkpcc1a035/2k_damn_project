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

export function CheckoutItemCard({ data }: { data: CartType }) {
  const dispatch = useDispatch();
  return (
    <Card>
      <Group wrap="nowrap" justify="space-between">
        <Group wrap="nowrap">
          <Image
            src={data.product_image}
            radius={"sm"}
            w={{ base: 60, xs: 130, md: 230 }}
            alt={`${data.product_name}`}
            mr={{ base: "xs", xs: "md", md: "xl" }}
          />
          <div>
            <Text fw={700} lineClamp={1} fz={{ base: "sm", xs: "md" }}>
              {data.product_name}
            </Text>
            <Text fz={{ base: "sm", xs: "md" }}>
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
          size={"sm"}
        >
          <IconTrash stroke={1} />
        </ActionIcon>
      </Group>
    </Card>
  );
}
