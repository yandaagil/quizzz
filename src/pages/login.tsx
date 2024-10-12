import { useEffect } from 'react'
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input';
import Layout from '@/layouts/layout';

const LoginSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 4 characters.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  })
}).required()

const Login = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    const validUsername: string = 'user'
    const validPassword: string = '12345'
    if (data.username === validUsername && data.password === validPassword) {
      localStorage.setItem('loggedIn', 'f0asjf2398rhasnac7yasan134kjb1297y')
      navigate('/')
    } else {
      alert('Invalid username or password')
    }
  }

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (isLoggedIn) {
      navigate('/')
    }
  }, []);

  return (
    <Layout title='Login'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-3 w-60'>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type='text' placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder="Enter your username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Login</Button>
        </form>
      </Form>
    </Layout>
  )
}

export default Login