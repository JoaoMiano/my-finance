import Logo from "@/components/logo";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RegisterForm } from "@/components/layout/RegisterForm";
import { LoginForm } from "@/components/layout/LoginForm";

export const App = () => {
  return (
    <div className="relative h-screen px-4 py-4 md:py-6 lg:py-8 overflow-hidden">

      {/* imagem de fundo */}
      <img
        src="/images/background.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        style={{ objectPosition: "center" }}
      />

      {/* centro da tela */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-6">
        <Logo size="lg" variant="vertical"/>

        <Card className="w-full max-w-sm backdrop-blur  bg-white/80 shadow-xl">
          <CardHeader className="text-center">
            <h1 className="text-2xl font-bold">Acessar</h1>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="login" className="w-full">

              {/* Abas */}
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="login">Entrar</TabsTrigger>
                <TabsTrigger value="register">Cadastrar-se</TabsTrigger>
              </TabsList>

              {/* Login */}
              <TabsContent value="login" className="pt-4">
                <LoginForm/>
              </TabsContent>

              {/* Cadastro */}
              <TabsContent value="register" className="pt-4">
                <RegisterForm/>
              </TabsContent>

            </Tabs>
          </CardContent>
        </Card>
      </div>

    </div>
  );
};

export default App;
