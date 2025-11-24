import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { BookOpen, GraduationCap, User } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  // campos do formulário
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "teacher">("student");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // validação simples
    if (!name.trim()) return setError("Nome é obrigatório.");
    if (!email.includes("@")) return setError("Email inválido.");
    if (password.length < 6) return setError("Senha deve ter ao menos 6 caracteres.");

    setLoading(true);

    try {
      // escolhe a rota com base no role (student | teacher)
      const endpoint = `http://localhost:5293/api/${role}/create`;

      const payload = {
        name,
        email,
        password,
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // trata resposta
      if (!res.ok) {
        // tenta ler JSON de erro, senão mensagem genérica
        const body = await res.text();
        let msg = `Erro na requisição: ${res.status}`;
        try {
          const json = JSON.parse(body);
          // adapta conforme formato da sua API (message / error / detail...)
          msg = json?.message || json?.error || JSON.stringify(json) || msg;
        } catch (e) {
          // body não é JSON
          if (body) msg = body;
        }
        throw new Error(msg);
      }

      // sucesso
      
    } catch (err: any) {
      setError(err?.message ?? "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-gray-900 mb-2">Portal Escolar Colaborativo</h1>
          <p className="text-gray-600">Conectando educadores e estudantes</p>
        </div>

        <Card className="w-full max-w-md shadow-xl">
          <CardHeader>
            <CardTitle>Criar Conta</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  placeholder="Seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@escola.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Seleção de tipo de usuário melhorada */}
              <div className="space-y-3">
                <Label>Você é</Label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("student")}
                    disabled={loading}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 ${
                      role === "student"
                        ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                    aria-pressed={role === "student"}
                  >
                    <div
                      className={`p-2 rounded-full mb-2 transition-colors ${
                        role === "student" ? "bg-blue-100" : "bg-gray-100"
                      }`}
                    >
                      <GraduationCap
                        className={`w-5 h-5 ${role === "student" ? "text-blue-600" : "text-gray-500"}`}
                      />
                    </div>
                    <span className="font-medium text-sm">Aluno</span>
                    <span className="text-xs mt-1 opacity-70">Estudante</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole("teacher")}
                    disabled={loading}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 ${
                      role === "teacher"
                        ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                    aria-pressed={role === "teacher"}
                  >
                    <div
                      className={`p-2 rounded-full mb-2 transition-colors ${
                        role === "teacher" ? "bg-blue-100" : "bg-gray-100"
                      }`}
                    >
                      <User className={`w-5 h-5 ${role === "teacher" ? "text-blue-600" : "text-gray-500"}`} />
                    </div>
                    <span className="font-medium text-sm">Professor</span>
                    <span className="text-xs mt-1 opacity-70">Educador</span>
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center">Escolha o perfil que melhor descreve você.</p>
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">{error}</div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Registrando..." : "Criar Conta"}
              </Button>

              <Button type="button" variant="ghost" className="w-full mt-2" onClick={() => navigate("/login")}>
                Já tem uma conta? Fazer Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
