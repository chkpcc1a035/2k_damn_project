import {
  Anchor,
  Button,
  Card,
  Center,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

export default function Page() {
  return (
    <>
      <Center>
        <Stack maw={600} w={"100%"} m={"xs"}>
          <Card withBorder shadow="md" radius="md" mt={"10vh"}>
            <Stack align="center" gap="xl" p="xl">
              <ThemeIcon radius="xl" size={60} color="green">
                <IconCheck size={40} />
              </ThemeIcon>
              <Text fw={700} fz={"h3"}>
                Order Success!
              </Text>
              <Text ta="center" c="dimmed">
                We'll handle the rest. For any inquiries, our customer support
                team is here to assist you.
              </Text>
              <Anchor href="/Shop" underline="never">
                <Button>Back to Home</Button>
              </Anchor>
            </Stack>
          </Card>
        </Stack>
      </Center>
    </>
  );
}
