import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  BookOpen, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  Clock, 
  FileText, 
  MessageSquare,
  TrendingUp,
  Award,
  Users
} from 'lucide-react';
import { useState } from 'react';

export function StudentDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const assignments = [
    { id: 1, title: 'Redação sobre Meio Ambiente', subject: 'Português', dueDate: '2025-11-08', status: 'pending', progress: 60 },
    { id: 2, title: 'Exercícios de Álgebra Linear', subject: 'Matemática', dueDate: '2025-11-06', status: 'pending', progress: 30 },
    { id: 3, title: 'Pesquisa sobre Revolução Industrial', subject: 'História', dueDate: '2025-11-10', status: 'pending', progress: 0 },
    { id: 4, title: 'Relatório de Laboratório', subject: 'Química', dueDate: '2025-11-05', status: 'urgent', progress: 80 },
  ];

  const announcements = [
    { id: 1, title: 'Reunião de Pais - 15/11', author: 'Direção', date: '2025-11-02', category: 'Importante' },
    { id: 2, title: 'Olimpíada de Matemática - Inscrições Abertas', author: 'Prof. Silva', date: '2025-11-01', category: 'Evento' },
    { id: 3, title: 'Biblioteca: Novos Livros Disponíveis', author: 'Biblioteca', date: '2025-10-30', category: 'Notícia' },
  ];

  const grades = [
    { subject: 'Matemática', grade: 8.5, progress: 85 },
    { subject: 'Português', grade: 9.0, progress: 90 },
    { subject: 'História', grade: 7.5, progress: 75 },
    { subject: 'Química', grade: 8.0, progress: 80 },
  ];

  const discussions = [
    { id: 1, title: 'Dúvidas sobre Equações do 2º Grau', subject: 'Matemática', replies: 12, lastActivity: '2h atrás' },
    { id: 2, title: 'Análise do livro "Dom Casmurro"', subject: 'Literatura', replies: 8, lastActivity: '5h atrás' },
    { id: 3, title: 'Projeto de Ciências - Sugestões', subject: 'Ciências', replies: 15, lastActivity: '1d atrás' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-16 h-16 border-2 border-white">
              <AvatarImage src="https://images.unsplash.com/photo-1509062522246-3755977927d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc3Jvb20lMjBzdHVkZW50cyUyMGxlYXJuaW5nfGVufDF8fHx8MTc2MjIxNTAyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" />
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <div>
              <h2>Bem-vindo(a), Aluno!</h2>
              <p className="text-blue-100">Vamos continuar aprendendo hoje</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8" />
                <div>
                  <p className="text-2xl">12</p>
                  <p className="text-sm text-blue-100">Tarefas Concluídas</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8" />
                <div>
                  <p className="text-2xl">8.3</p>
                  <p className="text-sm text-blue-100">Média Geral</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8" />
                <div>
                  <p className="text-2xl">5</p>
                  <p className="text-sm text-blue-100">Conquistas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Assignments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Tarefas Pendentes
              </CardTitle>
              <CardDescription>Organize seu tempo e complete suas atividades</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-gray-900">{assignment.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <Badge variant="outline">{assignment.subject}</Badge>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {assignment.dueDate}
                        </span>
                      </div>
                    </div>
                    {assignment.status === 'urgent' && (
                      <Badge variant="destructive">Urgente</Badge>
                    )}
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Progresso</span>
                      <span className="text-sm">{assignment.progress}%</span>
                    </div>
                    <Progress value={assignment.progress} />
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline">Ver Detalhes</Button>
                    <Button size="sm">Continuar</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Notas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Desempenho Acadêmico
              </CardTitle>
              <CardDescription>Acompanhe suas notas por disciplina</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {grades.map((item) => (
                <div key={item.subject} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>{item.subject}</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">{item.grade}</span>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Fórum de Discussões */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Fórum de Discussões
              </CardTitle>
              <CardDescription>Participe das conversas com colegas e professores</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {discussions.map((discussion) => (
                <div key={discussion.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-gray-900">{discussion.title}</h3>
                      <div className="flex items-center gap-3 mt-2">
                        <Badge variant="secondary">{discussion.subject}</Badge>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {discussion.replies} respostas
                        </span>
                        <span className="text-sm text-gray-500">{discussion.lastActivity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">Ver Todas as Discussões</Button>
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
                className="rounded-md border"
              />
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">Próximos Eventos:</p>
                <div className="text-sm space-y-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>08/11 - Entrega de Redação</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>15/11 - Reunião de Pais</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>20/11 - Feira de Ciências</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Announcements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Avisos e Notícias
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="border-l-4 border-blue-500 pl-3 py-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm text-gray-900">{announcement.title}</h4>
                    <Badge variant="secondary" className="text-xs">{announcement.category}</Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Por {announcement.author} • {announcement.date}</p>
                </div>
              ))}
              <Button variant="link" className="w-full p-0">Ver todos os avisos</Button>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Recursos Compartilhados</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Matemática</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start text-sm">
                        📄 Fórmulas de Geometria
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-sm">
                        📊 Exercícios Resolvidos
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-sm">
                        🎥 Vídeo-aulas
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Português</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start text-sm">
                        📚 Obras Literárias
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-sm">
                        ✍️ Guia de Redação
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>História</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start text-sm">
                        🗺️ Linhas do Tempo
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-sm">
                        📖 Documentários
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
