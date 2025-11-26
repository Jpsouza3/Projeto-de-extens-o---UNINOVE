import { useEffect, useState } from 'react';
import { useSpring, animated, SpringValue, to as springTo } from 'react-spring';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { BookOpen, GraduationCap, User } from 'lucide-react';
import { useNavigate, Link} from "react-router-dom";

interface LoginProps {
  onLogin: (userType: 'student' | 'teacher') => void;
}

export function Login({ onLogin }: LoginProps) {
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher'>('student');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPassword, setTeacherPassword] = useState('');

  const [loadingStudent, setLoadingStudent] = useState(false);
  const [loadingTeacher, setLoadingTeacher] = useState(false);
  const [errorStudent, setErrorStudent] = useState<string | null>(null);
  const [errorTeacher, setErrorTeacher] = useState<string | null>(null);

  const [unauthorized, setUnauthorized] = useState(false);
  const API_BASE = 'http://localhost:5293';

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

  // ANIMAÇÃO: pop + shake para erros
  const [springMain, apiMain] = useSpring(() => ({
    from: { opacity: 0, scale: 0.95, y: -8 },
    to: { opacity: 0, scale: 0.95, y: -8 },
    config: { tension: 300, friction: 18 },
  }));

  const [springShake, apiShake] = useSpring(() => ({
    from: { x: 0 },
    to: { x: 0 },
    config: { tension: 500, friction: 8 },
  }));

  // Dispara animação principal quando o componente monta
  useEffect(() => {
    apiCard.start({
      from: { opacity: 0, scale: 0.8, y: 20 },
      to: { opacity: 1, scale: 1, y: 0 }
    });
  }, [apiCard]);

  // dispara animação quando unauthorized vira true
  useEffect(() => {
    if (!unauthorized) return;

    apiMain.start({ opacity: 1, scale: 1, y: 0 });

    (async () => {
      await apiShake.start({ x: -8 });
      await apiShake.start({ x: 8 });
      await apiShake.start({ x: -6 });
      await apiShake.start({ x: 6 });
      await apiShake.start({ x: 0 });
    })();

    const t = setTimeout(() => {
      apiMain.start({ opacity: 0, scale: 0.95, y: -8 });
      setUnauthorized(false);
    }, 3000);

    return () => clearTimeout(t);
  }, [unauthorized, apiMain, apiShake]);

  const findTokenInResponse = (data: any) => {
    return data?.token ?? data?.accessToken ?? data?.data?.token ?? null;
  };

  const navigate = useNavigate();

  const loginRequest = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/api/Auth/login`, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const text = await res.text();
    let data: any;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    if (!res.ok) {
      const msg =
        (data && (data.message || data.error || data.title)) ||
        res.statusText ||
        `Erro ${res.status}`;
      const err: any = new Error(msg);
      err.status = res.status;
      err.body = data;
      throw err;
    }

    return data;
  };

  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingStudent(true);

    try {
      const data = await loginRequest(studentEmail, studentPassword);

      if (data.role !== "Student") {
        setUnauthorized(true);
        window.alert("Você não tem permissão para acessar como aluno.");
        return;
      }

      const token = findTokenInResponse(data);
      if (token) localStorage.setItem("token", token);

      onLogin("student");
      navigate("/student");
    } catch (err: any) {
      if (err?.status === 401) {
        setUnauthorized(true);
        window.alert("Usuário ou senha incorretos.");
      } else {
        window.alert(err?.message ?? "Erro ao autenticar");
      }
    } finally {
      setLoadingStudent(false);
    }
  };

  const handleTeacherLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingTeacher(true);

    try {
      const data = await loginRequest(teacherEmail, teacherPassword);

      if (data.role !== "Teacher") {
        setUnauthorized(true);
        window.alert("Você não tem permissão para acessar como professor.");
        return;
      }

      const token = findTokenInResponse(data);
      if (token) localStorage.setItem("token", token);

      onLogin("teacher");
      navigate("/teacher");
    } catch (err: any) {
      if (err?.status === 401) {
        setUnauthorized(true);
        window.alert("Usuário ou senha incorretos.");
      } else {
        window.alert(err?.message ?? "Erro ao autenticar");
      }
    } finally {
      setLoadingTeacher(false);
    }
  };

  // Estilos animados
  const animatedStyleCard = {
    opacity: springCard.opacity as SpringValue<number>,
    transform: springCard.scale
      ? springTo([springCard.scale, springCard.y], (s: number, y: number) => `translateY(${y}px) scale(${s})`)
      : undefined,
  };

  const animatedStyleMain = {
    opacity: springMain.opacity as SpringValue<number>,
    transform: springMain.scale
      ? springTo([springMain.scale, springMain.y], (s: number, y: number) => `translateY(${y}px) scale(${s})`)
      : undefined,
  };

  const animatedStyleShake = {
    transform: springShake.x
      ? springTo([springShake.x], (x: number) => `translateX(${x}px)`)
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
          <h1 className="text-gray-900 mb-2">Portal Escolar Colaborativo</h1>
          <p className="text-gray-600">Conectando educadores e estudantes</p>
        </animated.div>

        {/* Login Card com animação */}
        <animated.div style={animatedStyleCard}>
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Fazer Login</CardTitle>
              <CardDescription>Escolha seu tipo de acesso</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Nova seleção de tipo de usuário */}
              <div className="space-y-3 mb-6">
                <Label>Você é</Label>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('student')}
                    disabled={loadingStudent || loadingTeacher}
                    className={`
                      flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200
                      ${selectedRole === 'student'
                        ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                      }
                    `}
                    aria-pressed={selectedRole === 'student'}
                  >
                    <div
                      className={`
                          p-2 rounded-full mb-2 transition-colors
                        ${selectedRole === 'student'
                          ? "bg-blue-100"
                          : "bg-gray-100"
                        }
                      `}
                    >
                      <GraduationCap
                        className={`
                          w-5 h-5
                          ${selectedRole === 'student'
                            ? "text-blue-600"
                            : "text-gray-500"
                          }
                        `}
                      />
                    </div>
                    <span className="font-medium text-sm">Aluno</span>
                    <span className="text-xs mt-1 opacity-70">Estudante</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('teacher')}
                    disabled={loadingStudent || loadingTeacher}
                    className={`
                      flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200
                      ${selectedRole === 'teacher'
                        ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                      }
                    `}
                    aria-pressed={selectedRole === 'teacher'}
                  >
                    <div
                      className={`
                        p-2 rounded-full mb-2 transition-colors
                        ${selectedRole === 'teacher'
                          ? "bg-blue-100"
                          : "bg-gray-100"
                        }
                      `}
                    >
                      <User
                        className={`
                          w-5 h-5
                          ${selectedRole === 'teacher'
                            ? "text-blue-600"
                            : "text-gray-500"
                          }
                        `}
                      />
                    </div>
                    <span className="font-medium text-sm">Professor</span>
                    <span className="text-xs mt-1 opacity-70">Educador</span>
                  </button>
                </div>
              </div>

              {/* Student Login */}
              {selectedRole === 'student' && (
                <form onSubmit={handleStudentLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-email">Email ou Matrícula</Label>
                    <Input
                      id="student-email"
                      type="text"
                      placeholder="aluno@escola.com"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-password">Senha</Label>
                    <Input
                      id="student-password"
                      type="password"
                      placeholder="••••••••"
                      value={studentPassword}
                      onChange={(e) => setStudentPassword(e.target.value)}
                      required
                    />
                  </div>

                  {errorStudent && (
                    <div className="text-sm text-red-600">{errorStudent}</div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-gray-600">Lembrar-me</span>
                    </label>
                    <a href="#" className="text-blue-600 hover:underline">
                      Esqueceu a senha?
                    </a>
                  </div>
                  <Button type="submit" className="w-full" disabled={loadingStudent}>
                    {loadingStudent ? 'Entrando...' : 'Entrar como Aluno'}
                  </Button>
                </form>
              )}

              {/* Teacher Login */}
              {selectedRole === 'teacher' && (
                <form onSubmit={handleTeacherLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="teacher-email">Email Institucional</Label>
                    <Input
                      id="teacher-email"
                      type="email"
                      placeholder="professor@escola.com"
                      value={teacherEmail}
                      onChange={(e) => setTeacherEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacher-password">Senha</Label>
                    <Input
                      id="teacher-password"
                      type="password"
                      placeholder="••••••••"
                      value={teacherPassword}
                      onChange={(e) => setTeacherPassword(e.target.value)}
                      required
                    />
                  </div>

                  {errorTeacher && (
                    <div className="text-sm text-red-600">{errorTeacher}</div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-gray-600">Lembrar-me</span>
                    </label>
                    <a href="#" className="text-blue-600 hover:underline">
                      Esqueceu a senha?
                    </a>
                  </div>
                  <Button type="submit" className="w-full" disabled={loadingTeacher}>
                    {loadingTeacher ? 'Entrando...' : 'Entrar como Professor'}
                  </Button>
                </form>
              )}

              {/* Footer */}
              <div className="mt-6 text-center text-sm text-gray-600">
                Primeiro acesso?{' '}
                <Link to="/register" className="text-blue-600 hover:underline">
                  Criar conta
                </Link>
              </div>
            </CardContent>
          </Card>
        </animated.div>
      </div>
    </div>
  );
}