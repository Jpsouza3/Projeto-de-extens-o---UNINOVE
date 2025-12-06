import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Progress } from './ui/progress';
import { 
  BookOpen, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  Clock, 
  FileText, 
  MessageSquare,
  TrendingUp,
  Award,
  Users,
  BookType,
  LogOut,
  User
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface CourseSummary {
  courseId: string;
  courseName: string;
  average: number;
  gradeCount: number;
}

interface StudentInfo {
  studentId: string;
  courseCount: number;
  overallAverage: number;
  summaries: CourseSummary[];
}

interface DecodedToken {
  sub: string;
  email: string;
  name: string;
  uid: string;
  role: string;
  studentId?: string;
  exp: number;
}

export function StudentDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [studentName, setStudentName] = useState<string>('Aluno');
  const [studentEmail, setStudentEmail] = useState<string>('');
  const navigate = useNavigate();

  // Função para decodificar o token JWT
  const decodeToken = (token: string): DecodedToken | null => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      return null;
    }
  };

  // Função para extrair studentId do token
  const getStudentIdFromToken = (token: string): string | null => {
    const decoded = decodeToken(token);
    if (!decoded) return null;

    // Tenta obter o studentId de diferentes campos possíveis
    return decoded.studentId || decoded.uid || decoded.sub || null;
  };

  // Função para obter informações do usuário do token
  const getUserInfoFromToken = (token: string) => {
    const decoded = decodeToken(token);
    if (!decoded) return { name: 'Aluno', email: '' };

    return {
      name: decoded.name || decoded.email?.split('@')[0] || 'Aluno',
      email: decoded.email || ''
    };
  };

  // Função para fazer logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        setLoading(true);
        
        // Obter token do localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('Token não encontrado. Por favor, faça login novamente.');
          setLoading(false);
          return;
        }

        // Obter studentId do token
        const studentId = getStudentIdFromToken(token);
        
        if (!studentId) {
          setError('ID do estudante não encontrado no token.');
          setLoading(false);
          return;
        }

        // Obter informações do usuário do token
        const userInfo = getUserInfoFromToken(token);
        setStudentName(userInfo.name);
        setStudentEmail(userInfo.email);

        // Fazer requisição para o endpoint
        const response = await fetch(
          `http://localhost:5293/api/student/get-info-by-id`,
          {
            headers: {
              'accept': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            setError('Token expirado ou inválido. Por favor, faça login novamente.');
            localStorage.removeItem('token');
            return;
          }
          throw new Error(`Erro ao buscar dados: ${response.status} ${response.statusText}`);
        }

        const data: StudentInfo = await response.json();
        setStudentInfo(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido ao carregar dados');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentInfo();
  }, []);

  const formatAverage = (average: number) => {
    return average.toFixed(2);
  };

  const averageToPercentage = (average: number) => {
    return Math.min(average * 10, 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando dados do estudante...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md p-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-lg font-semibold text-red-600 mb-2">Erro ao carregar dados</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="flex gap-3 justify-center">
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline"
            >
              Tentar novamente
            </Button>
            {error.includes('Token') && (
              <Button 
                onClick={() => {
                  localStorage.removeItem('token');
                  navigate('/login');
                }}
              >
                Ir para login
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!studentInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg font-semibold">Nenhum dado encontrado</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="mt-4"
            variant="outline"
          >
            Recarregar
          </Button>
        </div>
      </div>
    );
  }

  const { overallAverage, courseCount, summaries } = studentInfo;

  return (
    <div className="space-y-6">
      {/* Header with user info and logout */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard do Estudante</h1>
          <p className="text-gray-500">Acompanhe seu desempenho acadêmico</p>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-16 h-16 border-2 border-white">
              <AvatarImage src="https://media.istockphoto.com/id/2218093133/pt/foto/portrait-of-a-schoolgirl-studying-in-the-classroom-at-school.jpg?s=2048x2048&w=is&k=20&c=sIHQQ8YJxB3EOggtjQc7I6vulKthToa_IdwxWqJ7SgE=" />
              <AvatarFallback>PR</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">Bem-vindo(a), {studentName}!</h2>
              <p className="text-blue-100">Continue seu aprendizado e acompanhe seu progresso</p>
              {studentEmail && (
                <p className="text-sm text-blue-200 mt-1">{studentEmail}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8" />
                <div>
                  <p className="text-2xl font-bold">{formatAverage(overallAverage)}</p>
                  <p className="text-sm text-blue-100">Média Geral</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <BookType className="w-8 h-8" />
                <div>
                  <p className="text-2xl font-bold">{courseCount}</p>
                  <p className="text-sm text-blue-100">Disciplinas</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8" />
                <div>
                  <p className="text-2xl font-bold">
                    {summaries.reduce((acc, curr) => acc + curr.gradeCount, 0)}
                  </p>
                  <p className="text-sm text-blue-100">Avaliações</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8" />
                <div>
                  <p className="text-2xl font-bold">
                    {summaries.filter(c => c.average >= 7).length}
                  </p>
                  <p className="text-sm text-blue-100">Aprovados</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Desempenho Acadêmico */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Desempenho Acadêmico
              </CardTitle>
              <CardDescription>Acompanhe suas notas por disciplina</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {summaries.map((course) => (
                <div key={course.courseId} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{course.courseName}</span>
                      <Badge variant="outline" className="text-xs">
                        {course.gradeCount} {course.gradeCount === 1 ? 'nota' : 'notas'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full ${
                        course.average >= 7 ? 'bg-green-100 text-green-800' :
                        course.average >= 5 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {formatAverage(course.average)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={averageToPercentage(course.average)} 
                      className="h-2 flex-1" 
                      indicatorClassName={
                        course.average >= 7 ? 'bg-green-500' :
                        course.average >= 5 ? 'bg-yellow-500' : 'bg-red-500'
                      }
                    />
                    <span className="text-sm text-gray-500">
                      {averageToPercentage(course.average).toFixed(0)}%
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Ações Rápidas */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>Atalhos para funcionalidades importantes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <Button variant="outline" className="flex-col h-auto py-4 gap-2">
                  <Award className="w-5 h-5" />
                  <span className="text-sm">Ver Notas</span>
                </Button>
                <Button variant="outline" className="flex-col h-auto py-4 gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-sm">Disciplinas</span>
                </Button>
                <Button variant="outline" className="flex-col h-auto py-4 gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  <span className="text-sm">Calendário</span>
                </Button>
                <Button variant="outline" className="flex-col h-auto py-4 gap-2">
                  <FileText className="w-5 h-5" />
                  <span className="text-sm">Relatórios</span>
                </Button>
                <Button variant="outline" className="flex-col h-auto py-4 gap-2">
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-sm">Mensagens</span>
                </Button>
                <Button variant="outline" className="flex-col h-auto py-4 gap-2">
                  <Users className="w-5 h-5" />
                  <span className="text-sm">Professores</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Calendário */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                Calendário Acadêmico
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className=" w-fit mx-auto"
              />
            </CardContent>
          </Card>

          {/* Estatísticas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Estatísticas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Disciplinas aprovadas</span>
                  <span className="font-medium">
                    {summaries.filter(c => c.average >= 7).length} / {summaries.length}
                  </span>
                </div>
                <Progress 
                  value={(summaries.filter(c => c.average >= 7).length / summaries.length) * 100} 
                  className="h-2" 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Média geral</span>
                  <span className={`font-medium ${
                    overallAverage >= 7 ? 'text-green-600' :
                    overallAverage >= 5 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {formatAverage(overallAverage)}
                  </span>
                </div>
                <Progress 
                  value={averageToPercentage(overallAverage)} 
                  className="h-2"
                  indicatorClassName={
                    overallAverage >= 7 ? 'bg-green-500' :
                    overallAverage >= 5 ? 'bg-yellow-500' : 'bg-red-500'
                  }
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total de avaliações</span>
                  <span className="font-medium">
                    {summaries.reduce((acc, curr) => acc + curr.gradeCount, 0)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações do Sistema */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Status do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Conexão com API</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Online
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Dados atualizados</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {new Date().toLocaleDateString('pt-BR')}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">ID do estudante</span>
                <span className="text-xs text-gray-500 font-mono">
                  {studentInfo.studentId}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}