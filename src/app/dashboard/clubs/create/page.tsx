'use client';

import { FC, useState } from 'react';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'components/ui/form';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { CREATE_CLUB_MUTATION, LOGIN_QUERY, NATIONS_QUERY } from 'src/queries';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'components/ui/select';
import { Nation } from 'src/generated/graphql';

interface FormValues {
    name: string;
    nation_id: string;
    logo?: File;
}

const CreateClub: FC = () => {
    const client = useApolloClient();
    const form = useForm<FormValues>();
    const query = client.readQuery({ query: LOGIN_QUERY  });
    const [file, setFile] = useState<File | null>(null);

    const [createClub] = useMutation(CREATE_CLUB_MUTATION, {
        onCompleted: (data) => {
            toast.success('Club created', { description: data.createClub.name });
            form.reset();
        },
        onError: (error) => {
            toast.error('Error creating club', { description: error.message });
        }
    });
    const { data } = useQuery(NATIONS_QUERY);

    const onSubmit: SubmitHandler<FormValues> = async ({ name, nation_id, logo }) => {
        const input = {
            name,
            nation_id: parseInt(nation_id),
        };
        if (file) {
            input.logo = file;
        }

        await createClub({
            variables: { input },
            context: {
                headers: {
                    Authorization: `Bearer ${query.login.token}`,
                }
            }
        });
    };

    console.log({ form });

    return (
        <div>
            <h2>Create Club</h2>
            <Form {...form}>
                <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField control={form.control} name="name" render={() => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...form.register('name')} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="nation_id" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nation</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value || ''}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select nation" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {data?.nations.map((nation: Pick<Nation, 'id' | 'name'>) =>
                                        <SelectItem value={nation.id} key={nation.id}>{nation.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="logo" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Logo</FormLabel>
                            <FormControl>
                                <Input type="file" {...form.register('logo')} onChange={(event) => {
                                    if (event.target.files && event.target.files.length > 0) {
                                        field.onChange(event.target.files.length > 0);
                                        setFile(event.target.files[0]);
                                    }
                                }}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
};

export default CreateClub;