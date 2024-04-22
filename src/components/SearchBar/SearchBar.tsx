import { TextInput, Flex, Button, Card, Text } from '@tremor/react';
import { SearchIcon } from "@heroicons/react/solid";
import { useState } from 'react';
import { useGameSearch } from '../../hooks/useGameSearch';
import { useDebounce } from '../../hooks/useDebounce';
import { GameSearchResponse } from '../../new_types';

interface Props {
    onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: Props) {

    const [showResults, setShowResults] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const debouncedSearchQuery = useDebounce(searchQuery, 350); 


    const { dataSearch, isErrorSearch, isLoadingSearch } = useGameSearch(debouncedSearchQuery);


    function handleSearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const query = formData.get('query') as string;
        onSearch(query);
        setShowResults(false)
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newQuery = event.target.value;
        setShowResults(newQuery.length > 0);
        setSearchQuery(newQuery);
    }


    return (
        <nav className='mt-5 mb-12'>
            <form onSubmit={handleSearch}>
                <Flex>
                    <TextInput
                        name="query"
                        icon={SearchIcon}
                        placeholder="Search..."
                        onChange={handleInputChange}
                        value={searchQuery}
                    />
                    <Button type="submit" className='ml-2' color='slate'>
                        Search
                    </Button>
                </Flex>
            </form>

            {showResults && !isLoadingSearch && !isErrorSearch && dataSearch && dataSearch.length > 0 && (
                <div className="results-box absolute z-10 mt-2 content">
                    <Card className="mx-auto mb-7">
                        {dataSearch.map((item) => (
                            <div key={item.id}
                                onClick={() => {
                                    setSearchQuery(item.id);
                                    setShowResults(false);
                                }}>
                                <Text
                                    className='text-result p-2 cursor-pointer'>
                                    {item.title}
                                </Text>
                            </div>
                        ))}
                    </Card>
                </div>
            )}
        </nav>
    );
}
