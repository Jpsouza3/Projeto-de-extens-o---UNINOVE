import React, { useState, useEffect } from "react";
import { useSpring, animated, SpringValue, to as springTo } from 'react-spring';
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { BookOpen, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function RegisterSubject() {
  const navigate = useNavigate();

  // campo do formulário
  const [name, setName] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ANIMAÇÃO PRINCIPAL: pop-in quando a tela abre
  const [springCard, apiCard] = useSpring(() => ({
    from: { 
      opacity: 0, 
      scale: 0.8, 
      y: 20 
    },
    to: { 
      opacity: 1, 
      scale: 1, 
      y: 0 
    },
    config: { 
      tension: 280,
      friction: 25,
      mass: 1
    }
  }));

  useEffect(() => {
    apiCard.start({
      from: { opacity: 0, scale: 0.8, y: 20 },
      to: { opacity: 1, scale: 1, y: 0 }
    });
  }, [apiCard]);

  const handleRegisterSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // validação simples
    if (!name.trim()) return setError("Nome da disciplina é obrigatório.");

    setLoading(true);

    try {
      const endpoint = `http://localhost:5293/api/subject/create`;

      const payload = {
        name: name.trim(),
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.text();
        let msg = `Erro na requisição: ${res.status}`;
        try {
          const json = JSON.parse(body);
          msg = json?.message || json?.error || JSON.stringify(json) || msg;
        } catch (e) {
          if (body) msg = body;
        }
        throw new Error(msg);
      }

      setName("");
      window.alert("Disciplina cadastrada com sucesso!");
      navigate("/teacher");

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Estilo animado
  const animatedStyleCard = {
    opacity: springCard.opacity as SpringValue<number>,
    transform: springCard.scale
      ? springTo([springCard.scale, springCard.y], (s: number, y: number) => `translateY(${y}px) scale(${s})`)
      : undefined,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header com animação */}
        <animated.div 
          style={animatedStyleCard}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-gray-900 mb-2">GradeFlow</h1>
          <p className="text-gray-600">Gerenciamento de disciplinas</p>
        </animated.div>

        {/* Card com animação */}
        <animated.div style={animatedStyleCard}>
          <Card className="shadow-xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate(-1)}
                  className="h-8 w-8"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <CardTitle>Cadastrar Disciplina</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegisterSubject} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome da Disciplina</Label>
                  <Input
                    id="name"
                    placeholder="Ex: Matemática, Português, História..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {error && (
                  <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">{error}</div>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Cadastrando..." : "Cadastrar Disciplina"}
                </Button>
              </form>

            </CardContent>
          </Card>
        </animated.div>
      </div>
    </div>
  );
}