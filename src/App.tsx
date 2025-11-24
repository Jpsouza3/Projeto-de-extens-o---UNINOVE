import React, { PropsWithChildren, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";

import { TeacherDashboard } from "./components/TeacherDashboard";
import { StudentDashboard } from "./components/StudentDashboard";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Button } from "./components/ui/button";
import { BookOpen, LogOut } from "lucide-react";

/**
 * ProtectedRoute: recebe isAllowed e redireciona para /login caso false.
 * Usamos componente em vez de chamar navigate() diretamente dentro de element.
 */
function ProtectedRoute({ isAllowed, children }: { isAllowed: boolean; children: React.ReactNode }) {
  if (!isAllowed) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

/**
 * Layout tipado para os dashboards
 */
type DashboardLayoutProps = {
  children: React.ReactNode;
  onLogout: () => void;
  userType: "student" | "teacher";
};

function DashboardLayout({ children, onLogout }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>

            <div>
              <h1 className="text-gray-900">Portal Escolar Colaborativo</h1>
              <p className="text-sm text-gray-500">Conectando educadores e estudantes</p>
            </div>
          </div>

          <Button variant="outline" onClick={onLogout} className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}

/**
 * AppRoutes: componente que usa useNavigate (só funciona estando dentro de BrowserRouter)
 */
function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<"student" | "teacher">("student");

  const navigate = useNavigate();

  const handleLogin = (type: "student" | "teacher") => {
    setUserType(type);
    setIsLoggedIn(true);
    navigate("/" + type);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // opcional: limpar token do localStorage se estiver usando
    // localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Routes>
      {/* rota de login */}
      <Route path="/login" element={<Login onLogin={handleLogin} />} />

      {/* student */}
      <Route
        path="/student"
        element={
          <ProtectedRoute isAllowed={isLoggedIn}>
            <DashboardLayout userType="student" onLogout={handleLogout}>
              <StudentDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* teacher */}
      <Route
        path="/teacher"
        element={
          <ProtectedRoute isAllowed={isLoggedIn}>
            <DashboardLayout userType="teacher" onLogout={handleLogout}>
              <TeacherDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route path="/register" element={<Register />} />

      {/* raiz e qualquer outra rota -> redireciona para login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

/**
 * App: apenas o BrowserRouter envolvendo AppRoutes — apenas UM BrowserRouter na aplicação.
 */
export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
