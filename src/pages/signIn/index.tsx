import { useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/Auth";
import { api } from "../../api";

type formData = {
  email: string;
  password: string;
};

export function SignIn() {
  const { signIn } = useAuth();

  const onSubmit = useCallback(async (e: any) => {
    e.preventDefault();

    const signIndata: formData = {} as formData;

    const form = new FormData(e.target);
    for (let [key, value] of form.entries()) {
      Object.assign(signIndata, { [key]: value });
    }

    await signIn({ email: signIndata.email, password: signIndata.password });

    window.location.href = "/main";
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="email" id="email" name="email" placeholder="email" />
        <input type="password" id="password" name="password" placeholder="Password" />

        <button type="submit">Enviar</button>
      </form>
      <Link to="/signup">Create User</Link>
    </div>
  );
}
