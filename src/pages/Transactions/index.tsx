import { useContext, useEffect, useState } from 'react';
import {Header} from '../../components/Header';
import { Summary } from '../../components/Summary';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { dateFormatter, PriceFormatter } from '../../utils/formatter';
import { Pagination } from './components/Pagination';
import { SearchForm } from './components/SeachForm';
import { PriceHighlight, TransactionsContainer, TransactionsTable } from './styles';

interface Transaction {
	id:number;
	description:string;
	type: 'income' | 'outcome';
	price:number;
	category:string;
	createdAt:string;
}

export function Transactions() {
	const [currentPage,setCurrentPage] = useState(1);
	const [postsPerPage,setPostsPerPage] = useState(7);
	
	const lastPostIndex = currentPage * postsPerPage;
	console.log(lastPostIndex)
	const firstPostIndex = lastPostIndex - postsPerPage;

	const {transactions} = useContext(TransactionsContext);

	const currentPosts = transactions.slice(firstPostIndex, lastPostIndex);
		
	
	
	   
	return (
		<div>
			<Header />
			<Summary />
			<TransactionsContainer>
				<SearchForm />
				<TransactionsTable>
					<tbody>
						{currentPosts.map(currentPost => {
							return (
								<tr key={currentPost.id}>
									<td width='50%'>{currentPost.description}</td>
									<td>
										<PriceHighlight variant={currentPost.type}>
											{currentPost.type === 'outcome' && '-'}
											{PriceFormatter.format(currentPost.price)}
										</PriceHighlight>
									</td>
									<td>{currentPost.category}</td>
									<td>{dateFormatter.format(new Date(currentPost.createdAt))}</td>
								</tr>
							)
						})}
					</tbody>
				</TransactionsTable>
			</TransactionsContainer>
				<Pagination 
				totalPosts={transactions.length} 
				postsPerPage={postsPerPage}
				setCurrentPage={setCurrentPage}
				currentPage={currentPage}
				/>
		</div>
		
	)
}