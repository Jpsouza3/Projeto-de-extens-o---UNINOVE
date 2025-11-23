import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
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
    { id: 1, name: '9º Ano A', students: 32, subject: 'Matemática', nextClass: 'Hoje, 14:00' },
    { id: 2, name: '8º Ano B', students: 28, subject: 'Matemática', nextClass: 'Amanhã, 10:00' },
    { id: 3, name: '9º Ano C', students: 30, subject: 'Matemática', nextClass: 'Qua, 15:00' },
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
    { class: '9º Ano A', average: 7.8, attendance: 92 },
    { class: '8º Ano B', average: 8.2, attendance: 95 },
    { class: '9º Ano C', average: 7.5, attendance: 88 },
  ];

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
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8" />
                <div>
                  <p className="text-2xl">3</p>
                  <p className="text-sm text-purple-100">Turmas Ativas</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8" />
                <div>
                  <p className="text-2xl">12</p>
                  <p className="text-sm text-purple-100">Atividades Criadas</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8" />
                <div>
                  <p className="text-2xl">82</p>
                  <p className="text-sm text-purple-100">Para Corrigir</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-8 h-8" />
                <div>
                  <p className="text-2xl">5</p>
                  <p className="text-sm text-purple-100">Mensagens Novas</p>
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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Button className="flex-col h-auto py-4 gap-2">
                  <PlusCircle className="w-5 h-5" />
                  <span className="text-sm">Nova Atividade</span>
                </Button>
                <Button variant="outline" className="flex-col h-auto py-4 gap-2">
                  <Upload className="w-5 h-5" />
                  <span className="text-sm">Upload Material</span>
                </Button>
                <Button variant="outline" className="flex-col h-auto py-4 gap-2">
                  <Bell className="w-5 h-5" />
                  <span className="text-sm">Criar Aviso</span>
                </Button>
                <Button variant="outline" className="flex-col h-auto py-4 gap-2">
                  <BarChart3 className="w-5 h-5" />
                  <span className="text-sm">Relatórios</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Minhas Turmas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Minhas Turmas
              </CardTitle>
              <CardDescription>Gerencie e acompanhe suas turmas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {classes.map((classItem) => (
                <div key={classItem.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-gray-900">{classItem.name}</h3>
                      <div className="flex items-center gap-3 mt-2">
                        <Badge variant="outline">{classItem.subject}</Badge>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {classItem.students} alunos
                        </span>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {classItem.nextClass}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline">Ver Turma</Button>
                    <Button size="sm" variant="outline">Diário de Classe</Button>
                    <Button size="sm">Acessar</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Desempenho das Turmas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Desempenho das Turmas
              </CardTitle>
              <CardDescription>Média e frequência por turma</CardDescription>
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
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Frequência</p>
                        <p className={`${item.attendance >= 90 ? 'text-green-600' : 'text-yellow-600'}`}>
                          {item.attendance}%
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

          {/* Create Announcement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Criar Novo Aviso
              </CardTitle>
              <CardDescription>Compartilhe informações importantes com seus alunos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título do Aviso</Label>
                  <Input 
                    id="title" 
                    placeholder="Ex: Reunião de pais marcada" 
                    value={newAnnouncementTitle}
                    onChange={(e) => setNewAnnouncementTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Conteúdo</Label>
                  <Textarea 
                    id="content" 
                    placeholder="Descreva os detalhes do aviso..."
                    rows={4}
                    value={newAnnouncementContent}
                    onChange={(e) => setNewAnnouncementContent(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="class">Destinatários</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a turma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as turmas</SelectItem>
                      <SelectItem value="9a">9º Ano A</SelectItem>
                      <SelectItem value="8b">8º Ano B</SelectItem>
                      <SelectItem value="9c">9º Ano C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">Publicar Aviso</Button>
                  <Button variant="outline">Salvar Rascunho</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pending Grades */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Pendências
              </CardTitle>
              <CardDescription>Atividades para corrigir</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingGrades.map((item) => (
                <div key={item.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                  <h4 className="text-sm text-gray-900">{item.assignment}</h4>
                  <p className="text-xs text-gray-500 mt-1">{item.class}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {item.submitted}/{item.total} enviados
                    </span>
                    <Badge variant={item.submitted === item.total ? 'default' : 'secondary'}>
                      {Math.round((item.submitted / item.total) * 100)}%
                    </Badge>
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-2">
                    Corrigir Agora
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Discussions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Mensagens Recentes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentDiscussions.map((discussion) => (
                <div key={discussion.id} className="border-l-4 border-blue-500 pl-3 py-2 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm text-gray-900">{discussion.student}</h4>
                        {discussion.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{discussion.topic}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">{discussion.class}</Badge>
                        <span className="text-xs text-gray-500">{discussion.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="link" className="w-full p-0">Ver todas as mensagens</Button>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                Próximos Eventos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="border rounded-lg p-3">
                  <h4 className="text-sm text-gray-900">{event.title}</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <CalendarIcon className="w-3 h-3 text-gray-500" />
                    <span className="text-xs text-gray-600">{event.date}</span>
                    <Clock className="w-3 h-3 text-gray-500 ml-2" />
                    <span className="text-xs text-gray-600">{event.time}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Biblioteca de Recursos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  📚 Planos de Aula
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  📊 Modelos de Provas
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  🎥 Vídeos Educacionais
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  📝 Exercícios Extras
                </Button>
                <Button variant="outline" className="w-full mt-4">
                  <Upload className="w-4 h-4 mr-2" />
                  Adicionar Recurso
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
