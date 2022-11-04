import { Trash } from 'phosphor-react';
import { useContext, useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { Summary } from '../../components/Summary';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { dateFormatter, PriceFormatter } from '../../utils/formatter';
import { Pagination } from './components/Pagination';
import { SearchForm } from './components/SeachForm';
import { PriceHighlight, TransactionsContainer, TransactionsTable } from './styles';

export function Transactions() {
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage, setPostsPerPage] = useState(7);

	const lastPostIndex = currentPage * postsPerPage;
	const firstPostIndex = lastPostIndex - postsPerPage;

	const { transactions, handleDeleteTransaction } = useContext(TransactionsContext);

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
									<td className='transactionTitle' width='50%'>{currentPost.description}</td>
									<td>
										<PriceHighlight variant={currentPost.type}>
											{currentPost.type === 'outcome' && '-'}
											{PriceFormatter.format(currentPost.price)}
										</PriceHighlight>
									</td>
									<td>{currentPost.category}</td>
									<td>
										{dateFormatter.format(new Date(currentPost.createdAt))}
										<button title='Delete' onClick={() => handleDeleteTransaction(currentPost.id)}>
											<Trash size={20} />
										</button>
									</td>
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