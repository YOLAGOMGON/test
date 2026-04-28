"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/services/authService";
import { useAuth } from "@/app/hooks/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const { setTokens } = useAuth();
  const router = useRouter();
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMensaje("");

    try {
      const tokens = await login({ email, password });
      setTokens(tokens);
      setMensaje("Login correcto.");
      router.push("/dashboard");
    } catch (error) {
      setMensaje(error instanceof Error ? error.message : "Error en login.");
    }
  };

  return (
    <main className="card stack">
      <h3>Login</h3>
      <form className="stack" onSubmit={onSubmit}>
        <label className="stack">
          <span className="label">Email</span>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label className="stack">
          <span className="label">Password</span>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <button className="button" type="submit">
          Entrar
        </button>
      </form>
      <p className="auth-link">
        ¿No tienes cuenta? <a href="/auth/register">Crear cuenta</a>
      </p>
      {mensaje ? <p>{mensaje}</p> : null}
    </main>
  );
}
