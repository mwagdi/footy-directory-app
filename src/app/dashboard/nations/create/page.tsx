'use client';

import React from 'react';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'components/ui/form';

const CreateNation: React.FC = () => {
    const form = useForm();
    
    const onSubmit = (data) => {
        console.log(data);
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