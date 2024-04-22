import {
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Image,
  NumberFormatter,
  Popover,
  Stack,
  Text,
  Alert,
  Center,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconInfoCircle } from "@tabler/icons-react";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";

type ProductType = {
  product_id: string;
  product_image: string;
  product_name: string;
  product_description: string;
  product_tag: string | null;
  product_features: string[];
  product_price: number;
  product_stock: number;
  product_quantity: number;
  product_createdAt: string;
};

type CartType = {
  product_id: string;
  product_image: string;
  product_name: string;
  product_price: number;
  quantity: number;
};

export function ProductCard({
  data,
  disabled,
}: {
  data: ProductType;
  disabled: boolean;
}) {
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);

  async function addCart() {
    if (disabled) {
      setOpened(true);
      return;
    }
    const value: CartType = {
      product_id: data.product_id,
      product_image: data.product_image,
      product_name: data.product_name,
      product_price: data.product_price,
      quantity: 1,
    };
    dispatch(addToCart(value));
    notifications.show({
      title: "Add to Cart",
      message: `${data.product_name} has been add to your cart!`,
    });
  }

  const features = data.product_features.map((item, index) => (
    <Badge variant="light" key={index}>
      {item}
    </Badge>
  ));

  return (
    <Card withBorder radius="md" shadow="md">
      <Card.Section>
        <Center>
          <Image
            src={data.product_image}
            alt={`${data.product_name}`}
            h={{ base: 260, lg: 300 }}
            w="auto"
            fit="contain"
            fallbackSrc="https://placehold.co/600x400/white/grey?text=Car+Image"
            loading="lazy"
          />
        </Center>
      </Card.Section>
      <Stack h={"100%"}>
        <Divider />

        <Group justify="space-between">
          <div>
            <Text fw={700}>{data.product_name}</Text>
            <Text fz="sm" c="dimmed">
              {data.product_description}
            </Text>
          </div>
          {data.product_tag && (
            <Badge variant="outline">{data.product_tag}</Badge>
          )}
        </Group>

        <Divider />

        <div>
          <Text fw={500} fz="sm" c="dimmed" mb={"xs"}>
            Basic configuration
          </Text>
          <Group gap={7}>{features}</Group>
        </div>

        <Divider mt={"auto"} />

        <Group gap={30}>
          <div>
            <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
              <NumberFormatter
                prefix="$ "
                value={data.product_price}
                thousandSeparator
                decimalScale={2}
                fixedDecimalScale
              />
            </Text>
            {/* <Text fz="sm" c="dimmed" fw={500} style={{ lineHeight: 1 }} mt={3}>
              per day
            </Text> */}
          </div>

          <Popover
            position="bottom"
            shadow="md"
            withArrow
            opened={opened}
            onChange={setOpened}
          >
            <Popover.Target>
              <Button
                radius="xl"
                style={{ flex: 1 }}
                onClick={addCart}
                disabled={data.product_stock === 0}
              >
                {data.product_stock === 0 ? "Sold Out" : "Add to Cart"}
              </Button>
            </Popover.Target>

            <Popover.Dropdown p={0} maw={"90vw"}>
              <Alert
                variant="transparent"
                color="red"
                title="Please Sign In"
                icon={<IconInfoCircle />}
              >
                <Text size="sm" c={"dimmed"}>
                  You should signin first to add product to cart and checkout.
                </Text>
              </Alert>
            </Popover.Dropdown>
          </Popover>
        </Group>
      </Stack>
    </Card>
  );
}
