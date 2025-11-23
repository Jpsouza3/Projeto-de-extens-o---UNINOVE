import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BookOpen, GraduationCap, User } from 'lucide-react';

interface LoginProps {
  onLogin: (userType: 'student' | 'teacher') => void;
}

export function Login({ onLogin }: LoginProps) {
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPassword, setTeacherPassword] = useState('');

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin('student');
  };

  const handleTeacherLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin('teacher');
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
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-gray-600">Lembrar-me</span>
                    </label>
                    <a href="#" className="text-blue-600 hover:underline">
                      Esqueceu a senha?
                    </a>
                  </div>
                  <Button type="submit" className="w-full">
                    Entrar como Aluno
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
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-gray-600">Lembrar-me</span>
                    </label>
                    <a href="#" className="text-blue-600 hover:underline">
                      Esqueceu a senha?
                    </a>
                  </div>
                  <Button type="submit" className="w-full">
                    Entrar como Professor
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Footer */}
            <div className="mt-6 text-center text-sm text-gray-600">
              Primeiro acesso?{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Criar conta
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Demo Info */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800 text-center">
            💡 <strong>Demo:</strong> Clique em "Entrar" sem preencher para testar o portal
          </p>
        </div>
      </div>
    </div>
  );
}
