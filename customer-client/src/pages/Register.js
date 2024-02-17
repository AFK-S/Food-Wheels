import React, { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Anchor,
  Stack,
} from "@mantine/core";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Loader } from "@mantine/core";
import { useStateContext } from "../context/StateContext";
import { useNavigate } from "react-router-dom";

export default function Register(PaperProps) {
  const { isLogin, setIsLogin } = useStateContext();
  const Navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      Navigate("/");
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.trim().length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await axios.post("/api/customer/register", {
        email_address: values.email,
        name: values.name,
        password: values.password,
      });

      setIsLogin(true);
      form.reset();
      Navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || err.message || err);
    }
    setLoading(false);
  };

  return (
    <div className="login">
      <Paper
        radius="md"
        p="xl"
        withBorder
        sx={{
          width: "100%",
          maxWidth: 450,
        }}
      >
        <Text size="lg" weight={500}>
          Join us
        </Text>
        <Divider my="lg"></Divider>

        <form
          onSubmit={form.onSubmit((value) => {
            handleSubmit(value);
          })}
        >
          <Stack>
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              radius="md"
            />

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
              radius="md"
            />
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor component="button" type="button" color="dimmed" size="xs">
              Already have an account? <NavLink to="/login">Login</NavLink>
            </Anchor>
            <Button type="submit" radius="xl">
              {loading ? <Loader color="orange" variant="dots" /> : "Register"}
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
}
