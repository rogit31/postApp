import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import classes from './AuthenticationTitle.module.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginService, authLoading, user } = useBoundStore((state) => state);

  useEffect(() => {
    if (!!user) {
      navigate("/posts");
    }
  }, [user]);

  const onLogin = async (e) => {
    e.preventDefault();
    let email = e.target.email?.value;
    let password = e.target.password?.value;
    if (!email || !password) return;
    loginService(email, password);
  };
  return (
    <>
    <Container size={420} my={40} >
      <form onSubmit={onLogin}>
          <Title ta="center" className={classes.title}>This is the login page</Title>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md" style={{
            display:"flex",
            flexDirection:"column",
            gap:"22px"

          }}>
            <TextInput
              placeholder="email"
              name="email"
              type="email"
              required
              style={{ minWidth: "320px", height: "26px" }}
            />
            <PasswordInput
              placeholder="password"
              name="password"
              type="password"
              required
              style={{ minWidth: "320px", height: "26px" }}
            />
            <Button type="submit">login</Button>
            {authLoading ? <h2>Loading...</h2> : null}
            <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          </Paper>
      </form>
    </Container>
    </>

  );
};

export default LoginPage;
