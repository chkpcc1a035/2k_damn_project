"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { CheckoutList } from "./CheckoutList";
import {
  Group,
  Card,
  Divider,
  Stack,
  Text,
  Grid,
  Stepper,
  Button,
  TextInput,
  Select,
  PasswordInput,
} from "@mantine/core";
import {
  TransformedValues,
  hasLength,
  isEmail,
  isNotEmpty,
  matches,
  useForm,
} from "@mantine/form";
import { useState } from "react";
import { CheckoutOrderCard } from "./CheckoutOrderCard";
import { useWindowScroll } from "@mantine/hooks";
import { CheckoutDetailCard } from "./CheckoutDetailCard";
import { SubmitOrderButton } from "./SubmitOrderButton";

export function CheckoutDisplay() {
  const [scroll, scrollTo] = useWindowScroll();
  const [active, setActive] = useState(0);

  const nextStep = () => {
    if (active === 1) {
      form.validate();
      if (!form.isValid()) {
        return;
      }
    }
    if (active === 2) {
      form.validate();
      if (!form.isValid()) {
        return;
      }
    }
    if (active === 3) {
      console.log(form.getValues());
    }
    setActive((current) => (current < 3 ? current + 1 : current));
    scrollTo({ y: 0 });
  };
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      district: "",
      area: "",
      cardNumber: "",
      cardDate: "",
      cardCVC: "",
      cardHolder: "",
    },

    validate: (() => {
      if (active === 1) {
        return {
          name: isNotEmpty("Name cannot be empty"),
          email: isEmail("Invalid email"),
          phone: matches(/^\d{8}$/, "Invalid phone number"),
          address: isNotEmpty("Address cannot be empty"),
          district: isNotEmpty("District cannot be empty"),
          area: isNotEmpty("Area cannot be empty"),
        };
      }
      if (active === 2) {
        return {
          cardHolder: isNotEmpty("Name cannot be empty"),
          cardNumber: matches(
            /^\d{4}-\d{4}-\d{4}-\d{4}$/,
            "Invalid card number"
          ),
          cardDate: matches(
            /^(0[1-9]|1[0-2])\/(\d{2})$/,
            "Invalid expired date"
          ),
          cardCVC: matches(/^\d{3}$/, "Invalid CVC/CVV"),
        };
      }
    })(),

    transformValues: (values) => ({
      ...values,
    }),
  });

  form.watch("phone", ({ value }) => {
    let v = value.replace(/\D/g, "");
    form.setFieldValue("phone", v);
  });
  form.watch("cardDate", ({ value }) => {
    let v = value.replace(/\D/g, "");
    if (v.length >= 2) {
      v = v.substring(0, 2) + "/" + v.substring(2);
    }
    form.setFieldValue("cardDate", v);
  });
  form.watch("cardCVC", ({ value }) => {
    let v = value.replace(/\D/g, "");
    form.setFieldValue("cardCVC", v);
  });
  form.watch("cardNumber", ({ value }) => {
    let v = value.replace(/\D+/g, "");
    v = v.substring(0, 16);
    const parts = [];
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substring(i, i + 4));
    }
    v = parts.join("-");
    form.setFieldValue("cardNumber", v);
  });

  return (
    <Provider store={store}>
      <Grid gutter="xl" mt={"xl"}>
        <Grid.Col span={{ base: 12, md: 2 }}>
          <Stepper
            active={active}
            onStepClick={setActive}
            orientation="vertical"
            iconSize={28}
            allowNextStepsSelect={false}
          >
            <Stepper.Step label="First step" description="Order Items" />
            <Stepper.Step label="Second step" description="Address" />
            <Stepper.Step label="Final step" description="Payment" />
            <Stepper.Completed>{}</Stepper.Completed>
          </Stepper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          {active === 0 && (
            <>
              <Text fw={700} fz={{ base: 24, xs: 30 }}>
                Orders
              </Text>
              <Divider my={"md"} />
              <CheckoutList />
            </>
          )}
          {active === 1 && (
            <>
              <Text fw={700} fz={{ base: 24, xs: 30 }}>
                Address
              </Text>
              <Divider my={"md"} />
              <form>
                <Stack gap={"md"}>
                  <TextInput
                    withAsterisk
                    label="Name"
                    placeholder="your name"
                    {...form.getInputProps("name")}
                  />
                  <Group grow>
                    <TextInput
                      withAsterisk
                      label="Email"
                      placeholder="your@email.com"
                      {...form.getInputProps("email")}
                    />
                    <TextInput
                      withAsterisk
                      label="Phone Number"
                      placeholder="your phone"
                      maxLength={8}
                      {...form.getInputProps("phone")}
                    />
                  </Group>
                  <TextInput
                    withAsterisk
                    label="Address"
                    placeholder="your address"
                    {...form.getInputProps("address")}
                  />
                  <Group grow>
                    <Select
                      label="District"
                      placeholder="your district"
                      data={[
                        "Islands",
                        "Kwai Tsing",
                        "North",
                        "Sai Kung",
                        "Sha Tin",
                        "Tai Po",
                        "Tsuen Wan",
                        "Tuen Mun",
                        "Yuen Long",
                        "Kowloon City",
                        "Kwun Tong",
                        "Sham Shui Po",
                        "Wong Tai Sin",
                        "Yau Tsim Mong",
                        "Central and Western",
                        "Eastern",
                        "Southern",
                        "Wan Chai",
                      ]}
                      {...form.getInputProps("district")}
                    />
                    <Select
                      label="Area"
                      placeholder="your area"
                      data={["New Territories", "Kowloon", "Hong Kong"]}
                      {...form.getInputProps("area")}
                    />
                  </Group>
                </Stack>
              </form>
            </>
          )}
          {active === 2 && (
            <>
              <Text fw={700} fz={{ base: 24, xs: 30 }}>
                Payment
              </Text>
              <Divider my={"md"} />
              <Card
                withBorder
                radius="lg"
                p={{ base: "xs", xs: "xl" }}
                maw={700}
              >
                <form>
                  <Stack gap={"md"} py={{ base: "md", xs: "xs" }}>
                    <Text fw={500} c={"dimmed"} fz={{ base: 20, xs: 24 }}>
                      Credit Card
                    </Text>
                    <TextInput
                      withAsterisk
                      label="Cardholder Name"
                      placeholder="Full Name"
                      {...form.getInputProps("cardHolder")}
                    />
                    <TextInput
                      withAsterisk
                      placeholder="0000-0000-0000-0000"
                      label="Card Information"
                      maxLength={19}
                      {...form.getInputProps("cardNumber")}
                    />

                    <Group grow>
                      <TextInput
                        placeholder="MM/YY"
                        maxLength={5}
                        {...form.getInputProps("cardDate")}
                      />

                      <PasswordInput
                        placeholder="CVC"
                        maxLength={3}
                        {...form.getInputProps("cardCVC")}
                      />
                    </Group>
                  </Stack>
                </form>
              </Card>
            </>
          )}
          {active === 3 && (
            <>
              <CheckoutDetailCard data={form.getValues()} />
            </>
          )}
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Stack gap={"xl"}>
            <CheckoutOrderCard />
            <Stack>
              {active !== 0 ? (
                <Button
                  size="lg"
                  fullWidth
                  radius="lg"
                  variant="default"
                  onClick={prevStep}
                >
                  Back
                </Button>
              ) : (
                <></>
              )}

              {active !== 3 ? (
                <Button
                  size="lg"
                  fullWidth
                  radius="lg"
                  variant="light"
                  onClick={nextStep}
                >
                  Next step
                </Button>
              ) : (
                <SubmitOrderButton data={form.getValues()} />
              )}
            </Stack>
          </Stack>
        </Grid.Col>
      </Grid>
    </Provider>
  );
}
