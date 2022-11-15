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
	handleDeleteTransaction: (id:number) => Promise<void>;
	alertMaximumTransaction: () => Promise<void>;
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
	const [currentId,setCurrentId] = useState(0)
	
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

	async function handleDeleteTransaction(id:number) {
		api.delete('/transactions/'+id)
		setTransactions(transactions.filter(transaction => transaction.id !== id))
	}

	async function alertMaximumTransaction (){
		const response = await api.get('transactions')
		const aux = response.data.at(-1)
		api.delete('/transactions/'+aux.id)
		console.log('hi')
		setTransactions(transactions.filter(transaction => transaction.id !== aux.id))
		console.log(transactions)
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
			handleDeleteTransaction,
			alertMaximumTransaction,
		}}>
      {children}
    </TransactionsContext.Provider>
  )
}
