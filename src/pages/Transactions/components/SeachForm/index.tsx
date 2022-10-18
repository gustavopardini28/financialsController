import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import { SearchFormContainer } from "./styles";
import * as z from 'zod'
import { zodResolver} from '@hookform/resolvers/zod';
import { TransactionsContext } from "../../../../contexts/TransactionsContext";
import { useContext } from "react";

const searchFormSchema = z.object({ 
    query: z.string(),
})

type SearchFormInput = z.infer<typeof searchFormSchema>;

export function SearchForm() {
const { fetchTransactions } = useContext(TransactionsContext);

const { 
   register,
   handleSubmit,
   formState: {isSubmitting}

  } = useForm<SearchFormInput>({
  resolver: zodResolver(searchFormSchema),
})

  async function handleSearchTransactions (data: SearchFormInput) {
    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input 
      type='text' 
      placeholder='Search for transactions'
      {...register('query')}
      />
      <button type='submit' disabled={isSubmitting}>
        <MagnifyingGlass size={20}/>
        Search
      </button>

    </SearchFormContainer>
  )
}