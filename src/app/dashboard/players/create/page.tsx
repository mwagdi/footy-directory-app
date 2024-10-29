'use client';

import { FC } from 'react';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'components/ui/form';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { CREATE_PLAYER_MUTATION, LOGIN_QUERY, NATIONS_WITH_CLUBS_QUERY } from 'src/queries';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'components/ui/select';
import { Club, Nation } from 'src/generated/graphql';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';
import { cn } from 'lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from 'components/ui/calendar';

interface FormValues {
    name: string;
    nationality_ids: string[];
    club_id?: string;
    birthdate: Date;
    position: string;
}

const CreatePlayer: FC = () => {
    const client = useApolloClient();
    const form = useForm<FormValues>();
    const query = client.readQuery({ query: LOGIN_QUERY  });

    const [createPlayer] = useMutation(CREATE_PLAYER_MUTATION, {
        onCompleted: (data) => {
            toast.success('Player created', { description: data.createPlayer.name });
            form.reset();
        },
        onError: (error) => {
            toast.error('Error creating player', { description: error.message });
        }
    });
    const { data } = useQuery(NATIONS_WITH_CLUBS_QUERY);

    const onSubmit: SubmitHandler<FormValues> = async ({ name, birthdate, club_id, nationality_ids, position }) => {
        await createPlayer({
            variables: {
                input: {
                    name,
                    birthdate,
                    position,
                    nationality_ids: nationality_ids.map(id => parseInt(id)),
                    ...(club_id ? { club_id: parseInt(club_id) }:{}),
                }
            },
            context: {
                headers: {
                    Authorization: `Bearer ${query.login.token}`,
                }
            }
        });
    };

    return (
        <div>
            <h2>Create Player</h2>
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
                    <FormField control={form.control} name="position" render={() => (
                        <FormItem>
                            <FormLabel>Position</FormLabel>
                            <FormControl>
                                <Input {...form.register('position')} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="birthdate" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Birthdate</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={'outline'}
                                            className={cn(
                                                'w-[240px] pl-3 text-left font-normal',
                                                !field.value && 'text-muted-foreground'
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, 'PPP')
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date('1900-01-01')
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="nationality_ids" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nationalities</FormLabel>
                            {field.value?.map((val, index) => (
                                <Select key={`nation_${index}_select`} onValueChange={(i) => {
                                    const values = field.value;
                                    values[index] = i;
                                    form.setValue('nationality_ids', values);
                                }} defaultValue={val} value={val || ''}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select nation" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {data?.nations.map((nation: Pick<Nation, 'id' | 'name'>) => <SelectItem value={nation.id} key={`nation_${nation.id}`}>{nation.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            ))}
                            <Button onClick={(event) => {
                                event.preventDefault();
                                form.setValue('nationality_ids', field.value ? [...field.value, ''] : ['']);
                            }}>Add Nation</Button>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="club_id" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Club</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value || ''}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select club" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {data?.clubs.map((club: Pick<Club, 'id' | 'name'>) => <SelectItem value={club.id} key={`club_${club.id}`}>{club.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
};

export default CreatePlayer;