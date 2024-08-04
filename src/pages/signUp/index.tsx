import { useCallback } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api";

export function SignUp() {
  const onSubmit = useCallback(async (e: any) => {
    e.preventDefault();

    const signIndata = {};

    const form = new FormData(e.target);
    for (let [key, value] of form.entries()) {
      Object.assign(signIndata, { [key]: value });
    }

    await api
      .post("/signup", signIndata)
      .then(() => {
        window.location.href = "/";
      })
      .catch(() => alert("O correu um erro"));
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" name="name" placeholder="Name" />
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />

        <button type="submit">Enviar</button>
      </form>

      <Link to="/">Voltar</Link>
    </div>
  );
}
