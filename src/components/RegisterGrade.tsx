import React, { useState, useEffect } from "react";
import { useSpring, animated, SpringValue, to as springTo } from 'react-spring';
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { BookOpen, ArrowLeft, GraduationCap, User } from "lucide-react";
import { Link } from "react-router-dom";

interface Course {
  id: string;
  name: string;
}

interface Student {
  id: string;
  name: string;
}

interface InputInfo {
  courses: Course[];
  students: Student[];
}

export default function RegisterGrade() {
  const navigate = useNavigate();

  // campos do formulário
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [grade, setGrade] = useState("");

  // dados da API
  const [inputInfo, setInputInfo] = useState<InputInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

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

  // Carrega dados iniciais (cursos e estudantes)
  useEffect(() => {
    const fetchInputInfo = async () => {
      try {
        setLoadingData(true);
        const res = await fetch('http://localhost:5293/api/teacher/get-input-info', {
          method: "GET",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Erro ao carregar dados: ${res.status}`);
        }

        const data: InputInfo = await res.json();
        setInputInfo(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoadingData(false);
      }
    };

    fetchInputInfo();
  }, []);

  // Dispara animação principal quando o componente monta
  useEffect(() => {
    apiCard.start({
      from: { opacity: 0, scale: 0.8, y: 20 },
      to: { opacity: 1, scale: 1, y: 0 }
    });
  }, [apiCard]);

  const handleRegisterGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // validação
    if (!selectedCourseId) return setError("Selecione uma disciplina.");
    if (!selectedStudentId) return setError("Selecione um aluno.");
    if (!grade.trim()) return setError("Nota é obrigatória.");
    
    const gradeValue = parseFloat(grade);
    if (isNaN(gradeValue) || gradeValue < 0 || gradeValue > 10) {
      return setError("Nota deve ser um número entre 0.0 e 10.0");
    }

    setLoading(true);

    try {
      const endpoint = `http://localhost:5293/api/grade/create`;

      const payload = {
        courseId: selectedCourseId,
        studentId: selectedStudentId,
        grade: gradeValue,
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

      // sucesso - limpa o formulário
      setSelectedCourseId("");
      setSelectedStudentId("");
      setGrade("");
      window.alert("Nota cadastrada com sucesso!");

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
          <p className="text-gray-600">Lançamento de notas</p>
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
                  <CardTitle>Lançar Nota</CardTitle>
                  <CardDescription>Atribua uma nota para um aluno</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loadingData ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="text-gray-600 mt-2">Carregando disciplinas e alunos...</p>
                </div>
              ) : (
                <form onSubmit={handleRegisterGrade} className="space-y-4">
                  {/* Dropdown de Disciplina */}
                  <div className="space-y-2">
                    <Label htmlFor="course">Disciplina</Label>
                    <div className="relative">
                      <select
                        id="course"
                        value={selectedCourseId}
                        onChange={(e) => setSelectedCourseId(e.target.value)}
                        className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm
focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                        required
                      >
                        <option value="">Selecione uma disciplina</option>
                        {inputInfo?.courses.map((course) => (
                          <option key={course.id} value={course.id}>
                            {course.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Dropdown de Aluno */}
                  <div className="space-y-2">
                    <Label htmlFor="student">Aluno</Label>
                    <div className="relative">
                      <select
                        id="student"
                        value={selectedStudentId}
                        onChange={(e) => setSelectedStudentId(e.target.value)}
                        className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm
focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                        required
                      >
                        <option value="">Selecione um aluno</option>
                        {inputInfo?.students.map((student) => (
                          <option key={student.id} value={student.id}>
                            {student.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Campo de Nota */}
                  <div className="space-y-2">
                    <Label htmlFor="grade">Nota</Label>
                    <Input
                      id="grade"
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      placeholder="0.0"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      required
                    />
                    <p className="text-xs text-gray-500">Digite uma nota entre 0.0 e 10.0</p>
                  </div>

                  {error && (
                    <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">{error}</div>
                  )}

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Lançando nota..." : "Lançar Nota"}
                  </Button>
                </form>
              )}

            </CardContent>
          </Card>
        </animated.div>
      </div>
    </div>
  );
}