import Dashboard from "@/components/layout/Dashboard";
import NewTransitionForm from "@/components/forms/NewTransitionForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";


const App = () => {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 pt-20">
      <div className="container mx-auto px-2 sm:px-4 lg:px-6">

        {/* tabs para alternar entre adicionar transaçao e dashboard */}
        <Tabs defaultValue="transactions" className="w-full my-4">

          <TabsList className="w-full grid grid-cols-2 bg-gray-200 px-2 py-1 rounded-md gap-2">
            <TabsTrigger value="transactions" className="data-[state=active]:bg-gray-50 data-[state=active]:text-black rounded-md px-3 py-1.5 transition">Transações</TabsTrigger>
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-gray-50 data-[state=active]:text-black rounded-md px-3 py-1.5 transition">Dashboard</TabsTrigger>
          </TabsList>
          
          <TabsContent value="transactions" >
            <NewTransitionForm />
          </TabsContent>

          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>
        </Tabs>

      </div>
    </main >
  )

}

export default App;