import { useEffect, useState } from 'react';
import { useSpring, animated, SpringValue, to as springTo } from 'react-spring';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BookOpen, GraduationCap, User } from 'lucide-react';
import { useNavigate, Link} from "react-router-dom";


interface LoginProps {
  onLogin: (userType: 'student' | 'teacher') => void;
}

export function Login({ onLogin }: LoginProps) {
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPassword, setTeacherPassword] = useState('');

  const [loadingStudent, setLoadingStudent] = useState(false);
  const [loadingTeacher, setLoadingTeacher] = useState(false);
  const [errorStudent, setErrorStudent] = useState<string | null>(null);
  const [errorTeacher, setErrorTeacher] = useState<string | null>(null);

  const [unauthorized, setUnauthorized] = useState(false); // flag para 401
  const API_BASE = 'http://localhost:5293'; // altere se necessário

  // ANIMAÇÃO: pop + shake usando react-spring
  // springMain controla entrada (scale/opacity/translateY)
  const [springMain, apiMain] = useSpring(() => ({
    from: { opacity: 0, scale: 0.95, y: -8 },
    to: { opacity: 0, scale: 0.95, y: -8 },
    config: { tension: 300, friction: 18 },
  }));

  // springShake controla o pequeno trem (translateX)
  const [springShake, apiShake] = useSpring(() => ({
    from: { x: 0 },
    to: { x: 0 },
    config: { tension: 500, friction: 8 },
  }));

  // dispara animação quando unauthorized vira true
  useEffect(() => {
    if (!unauthorized) return;

    // animação de entrada
    apiMain.start({ opacity: 1, scale: 1, y: 0 });

    // sequência de "shake" rápida
    (async () => {
      await apiShake.start({ x: -8 });
      await apiShake.start({ x: 8 });
      await apiShake.start({ x: -6 });
      await apiShake.start({ x: 6 });
      await apiShake.start({ x: 0 });
    })();

    // desfaz a flag após 3s para permitir re-disparos futuros
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
  setErrorStudent(null);
  setLoadingStudent(true);

  try {
    const data = await loginRequest(studentEmail, studentPassword);

    if (data.role !== "Student") {
      setUnauthorized(true);
      setErrorStudent("Você não tem permissão para acessar como aluno.");
      return;
    }

    const token = findTokenInResponse(data);
    if (token) localStorage.setItem('token', token);

    onLogin('student');
    navigate("/student")
  } catch (err: any) {
    if (err?.status === 401) {
      setUnauthorized(true);
      setErrorStudent('Usuário ou senha incorretos.');
    } else {
      setErrorStudent(err?.message ?? 'Erro ao autenticar');
    }
  } finally {
    setLoadingStudent(false);
  }
};


const handleTeacherLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setErrorTeacher(null);
  setLoadingTeacher(true);

  try {
    const data = await loginRequest(teacherEmail, teacherPassword);

    if (data.role !== "Teacher") {
      setUnauthorized(true);
      setErrorTeacher("Você não tem permissão para acessar como professor.");
      return;
    }

    const token = findTokenInResponse(data);
    if (token) localStorage.setItem('token', token);

    onLogin('teacher');
    navigate("/teacher")
  } catch (err: any) {
    if (err?.status === 401) {
      setUnauthorized(true);
      setErrorTeacher('Usuário ou senha incorretos.');
    } else {
      setErrorTeacher(err?.message ?? 'Erro ao autenticar');
    }
  } finally {
    setLoadingTeacher(false);
  }
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
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-gray-900 mb-2">Portal Escolar Colaborativo</h1>
          <p className="text-gray-600">Conectando educadores e estudantes</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Fazer Login</CardTitle>
            <CardDescription>Escolha seu tipo de acesso</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="student" className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Aluno
                </TabsTrigger>
                <TabsTrigger value="teacher" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Professor
                </TabsTrigger>
              </TabsList>

              {/* Student Login */}
              <TabsContent value="student">
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

                  {/* Mensagem de erro simples (não-401) */}
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
              </TabsContent>

              {/* Teacher Login */}
              <TabsContent value="teacher">
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
              </TabsContent>
            </Tabs>

            {/* Footer */}
            <div className="mt-6 text-center text-sm text-gray-600">
              Primeiro acesso?{' '}
              <Link to="/register" className="text-blue-600 hover:underline">
                Criar conta
              </Link>
            </div>

            {/* Error animated box para 401 Unauthorized */}
            <div className="mt-4 flex justify-center text-red-500">
              {/* combinamos os dois springs: entrada (scale/opacity/y) + shake (x) */}
              {/** Usamos `animated.div` aninhados para compostura de transforms. **/}
              <animated.div style={animatedStyleMain as any} aria-live="polite">
                <animated.div
                  style={{
                    ...(animatedStyleShake as any),
                  }}
                  className="bg-red-50 border border-red-200 px-4 py-2 rounded-md shadow-sm flex items-center gap-3 max-w-md"
                >
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z" />
                  </svg>
                  <div className="text-sm ">
                    <p className="font-medium text-red-400">Falha na autenticação</p>
                    <p className="text-xs text-red">Usuário ou senha incorretos.</p>
                  </div>
                </animated.div>
              </animated.div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
