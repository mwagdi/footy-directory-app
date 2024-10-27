'use client';

import { FC } from 'react';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'components/ui/form';
import { useApolloClient, useMutation } from '@apollo/client';
import { CREATE_NATION_MUTATION, LOGIN_QUERY } from 'src/queries';
import { toast } from 'sonner';

interface FormValues {
    name: string;
    population: string;
}

const CreateNation: FC = () => {
    const client = useApolloClient();
    const form = useForm<FormValues>();
    const query = client.readQuery({ query: LOGIN_QUERY  });

    const [createNation] = useMutation(CREATE_NATION_MUTATION, {
        onCompleted: (data) => {
            toast.success('Nation created', { description: data.createNation.name });
            form.reset();
        },
        onError: (error) => {
            toast.error('Error creating nation', { description: error.message });
        }
    });
    
    const onSubmit: SubmitHandler<FormValues> = async ({ name, population }) => {
        await createNation({
            variables: { input: { name, population: parseInt(population) } },
            context: {
                headers: {
                    Authorization: `Bearer ${query.login.token}`,
                }
            }
        });
    };

    return (
        <div>
            <h2>Create Nation</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField control={form.control} name="name" render={() => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...form.register('name')} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="population" render={() => (
                        <FormItem>
                            <FormLabel>Population</FormLabel>
                            <FormControl>
                                <Input {...form.register('population')} type="number" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
};

export default CreateNation;