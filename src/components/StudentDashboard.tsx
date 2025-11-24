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
  Users,
  BookType
} from 'lucide-react';
import { useState } from 'react';

export function StudentDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const grades = [
    { subject: 'Matemática', grade: 8.5, progress: 85 },
    { subject: 'Português', grade: 9.0, progress: 90 },
    { subject: 'História', grade: 7.5, progress: 75 },
    { subject: 'Química', grade: 8.0, progress: 80 },
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
                  <p className="text-sm text-blue-100">Quantidade de notas</p>
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
                <BookType className="w-8 h-8" />
                <div>
                  <p className="text-2xl">5</p>
                  <p className="text-sm text-blue-100">Disciplinas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
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
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                <Button className="flex-col h-auto py-4 gap-2">
                  <Award className="w-5 h-5" />
                  <span className="text-sm">Verificar Notas</span>
                </Button>
                <Button variant="outline" className="flex-col h-auto py-4 gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-sm">Verificar Disciplinas</span>
                </Button>
                </div>
            </CardContent>
          </Card>

          {/* Fórum de Discussões */}
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
