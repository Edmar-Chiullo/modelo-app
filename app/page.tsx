"use client"

import { useRouter } from "next/navigation"
import { useState } from 'react'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { getUserAll } from "./controler-firebase/realtime-database"
import { useLoginContext } from "./context/loginContext/LoginContext"
import { EmployeeProps } from "./interface/interfaces"
//import authDatabase from "./controler-firebase/auth-firebase"

const formSchema = z.object({
  login: z.string().min(2, {
    message: "É nescessario inserir o login",
  }),
  password: z.string().min(2, {
    message: "É nescessario inserir a senha",
  }),
})

const EmployeeLogin:EmployeeProps = {
  employeeId: 2,
  employeeName: 'DevConxt',
  employeePermitionType: 'admin'
}

//////////////////////////////////////////////////////////////////////////////////

export default function Login() {
 
  const router = useRouter()
  const [alertMessage, setAlertMessage] = useState(false) // Controlador mensagem de alerta caso o usuario e senha não corresponderem
  const { setEmployee } = useLoginContext()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "",
      password: ""
    },
  })

  const showAlert = () => {
    setTimeout(() => {
      setAlertMessage(false)
    }, 3000);
    
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    //const auth = authDatabase().then(e => console.log(e + 'Aqui!'))
    
    setEmployee(EmployeeLogin)

    router.push('/pages/painel')
    //const user = getUserAll().then(valor => console.log(valor))

    // user.then((element) => {
    //   if (element) { 
    //     const users = Object.values(element)

    //     users.map(user => {
    //         const { email, username }:any = user
            
    //         if (email === values.login && username === values.password ) {
    //             setEmployeeName(Employee2.employeeName)
    //             router.push('/pages/home')

    //         } else {
    //             setAlertMessage(true)
    //             showAlert()        
    //         }
    //     })
    //   } else {
    //     setAlertMessage(true)
    //     showAlert()
    //   }        
    // })
    form.reset({
      login: '',  
      password: ''
    })

  }

  return (
      <div className="flex flex-col items-center justify-center w-full h-[100vh] space-y-20">
          <h1 className="lg:text-7xl md:text-5x1 sm:text-4xl">Login</h1>
          <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 lg:w-[40%] md:w-[50%] smLight:w-[90%]">
              <FormField
                  control={form.control}
                  name="login"
                  render={({ field }) => (
                  <FormItem>
                      <FormLabel>Login</FormLabel>
                      <FormControl>
                      <Input placeholder="Login" className="login h-12" {...field} />
                      </FormControl>
                      <FormDescription>
                      </FormDescription>
                      <FormMessage />
                  </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                  <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                      <Input type='password' placeholder="password" className="password h-12" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                  </FormItem>
                  )}
              />
              <Button type="submit" className="w-full h-12">Entrar</Button>
              </form>
              { alertMessage &&
              <Alert className='w-96'>
                  <AlertTitle className='text-[red]'>Erro!</AlertTitle>
                  <AlertDescription className='text-[red]'>
                  Usuário ou senha não correspondem.
                  </AlertDescription>
              </Alert>
              }
          </Form>
      </div>
  );
}