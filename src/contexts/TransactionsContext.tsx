import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
	id:number;
	description:string;
	type: 'income' | 'outcome';
	price:number;
	category:string;
	createdAt:string;
}

interface TransactionContextType {
  transactions: Transaction[];
	fetchTransactions: (query?: string) => Promise<void>;
	createTransactions: (data:createTransactionsProps) => Promise<void>;
}

interface TransactionProviderProps {
  children:ReactNode;
}

interface createTransactionsProps {
	description:string;
	price:number;
	category:string;
	type: 'income' | 'outcome',
	
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions,setTransactions] = useState<Transaction[]>([]);
	
	async function fetchTransactions(query?: string) {
		const response = await api.get('transactions', {
			params: {
				q:query,
				_sort: 'createdAt',
				_order: 'desc',
			}
		})
		
		setTransactions(response.data);
	}
	async function createTransactions(data: createTransactionsProps) {
		const {category,description,price,type} = data;  


		const response = await api.post('/transactions', {
			description,
			price,
			category,
			type,
			createdAt: new Date(),
	 })

	 setTransactions(state =>[response.data,...state]);
	}

	useEffect(() => {
		fetchTransactions();
	},[])

  return (
    <TransactionsContext.Provider value={{ 
			transactions,
			fetchTransactions,
			createTransactions,
		}}>
      {children}
    </TransactionsContext.Provider>
  )
}
