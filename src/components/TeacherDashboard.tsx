import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Calendar } from './ui/calendar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  Users, 
  FileText, 
  MessageSquare,
  Calendar as CalendarIcon,
  Upload,
  CheckCircle,
  Clock,
  TrendingUp,
  Bell,
  PlusCircle,
  BarChart3
} from 'lucide-react';
import { useState } from 'react';

export function TeacherDashboard() {
  const [newAnnouncementTitle, setNewAnnouncementTitle] = useState('');
  const [newAnnouncementContent, setNewAnnouncementContent] = useState('');

  const classes = [
    { id: 1, name: 'Matemática', students: 32, subject: 'Matemática', nextClass: 'Hoje, 14:00' },

  ];

  const pendingGrades = [
    { id: 1, assignment: 'Prova de Álgebra', class: '9º Ano A', submitted: 28, total: 32, deadline: '2025-11-07' },
    { id: 2, assignment: 'Trabalho em Grupo', class: '8º Ano B', submitted: 24, total: 28, deadline: '2025-11-08' },
    { id: 3, assignment: 'Exercícios Cap. 5', class: '9º Ano C', submitted: 30, total: 30, deadline: '2025-11-05' },
  ];

  const recentDiscussions = [
    { id: 1, student: 'Ana Silva', topic: 'Dúvida sobre Equações', class: '9º Ano A', time: '30min atrás', unread: true },
    { id: 2, student: 'João Santos', topic: 'Pedido de Material Extra', class: '8º Ano B', time: '2h atrás', unread: true },
    { id: 3, student: 'Maria Costa', topic: 'Projeto de Matemática', class: '9º Ano C', time: '5h atrás', unread: false },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Reunião Pedagógica', date: '2025-11-06', time: '16:00' },
    { id: 2, title: 'Conselho de Classe', date: '2025-11-10', time: '14:00' },
    { id: 3, title: 'Feira de Ciências', date: '2025-11-20', time: '09:00' },
  ];

  const classPerformance = [
    { class: 'Matemática', average: 7.8},
  ];

  const navigate = useNavigate();

    const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-16 h-16 border-2 border-white">
              <AvatarImage src="https://images.unsplash.com/photo-1596574027151-2ce81d85af3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwZWR1Y2F0aW9ufGVufDF8fHx8MTc2MjEzNDY5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" />
              <AvatarFallback>PR</AvatarFallback>
            </Avatar>
            <div>
              <h2>Bem-vindo(a), Professor(a)!</h2>
              <p className="text-purple-100">Gerencie suas turmas e atividades</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8" />
                <div>
                  <p className="text-2xl">32</p>
                  <p className="text-sm text-purple-100">Alunos</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8" />
                <div>
                  <p className="text-2xl">12</p>
                  <p className="text-sm text-purple-100">Notas inseridas</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8" />
                <div>
                  <p className="text-2xl">8</p>
                  <p className="text-sm text-purple-100">Disciplinas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                <Button className="flex-col h-auto py-4 gap-2"
                onClick={() => navigate("/register-grade")}>
                  <PlusCircle className="w-5 h-5" />
                  <span className="text-sm">Registrar nota</span>
                </Button>
                <Button variant="outline" className="flex-col h-auto py-4 gap-2"
                 onClick={() => navigate("/register-subject")}>
                  <Upload className="w-5 h-5" />
                  <span className="text-sm">Registrar Disciplina</span>
                </Button>

              </div>
            </CardContent>
          </Card>

          {/* Desempenho das Turmas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Desempenho dos alunos
              </CardTitle>
              <CardDescription>Média</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {classPerformance.map((item) => (
                <div key={item.class} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-gray-900">{item.class}</h3>
                    <div className="flex gap-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Média</p>
                        <p className={`${item.average >= 7 ? 'text-green-600' : 'text-yellow-600'}`}>
                          {item.average}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Ver Detalhes</Button>
                    <Button size="sm" variant="outline">Exportar Dados</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                Calendário
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
        </div>
      </div>
    </div>
  );
}
