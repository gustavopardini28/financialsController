import { ButtonsContainer, PaginationButton } from "./styles";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";


interface PaginationProps {
  totalPosts: number;
  postsPerPage:number;
  setCurrentPage: (currentPage:number) => void;
  currentPage: number;
}

export function Pagination ({totalPosts, postsPerPage,setCurrentPage,currentPage}: PaginationProps) {
  const { alertMaximumTransaction} = useContext(TransactionsContext)
  const notify = () => toast('Maximum transactions reached');  
  
  let pages = [];
    for( let i = 1; i<= Math.ceil(totalPosts/postsPerPage); i++) {
      pages.push(i)
      
      if(pages.length > 3) {
         alertMaximumTransaction()
         notify()       
    }
  }
    
    return (
      <>
      <ButtonsContainer>
        {
          pages.map((page, index) => {
            return (
              <PaginationButton
                key={index}
                variant={page == currentPage ? 'active' : ''}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </PaginationButton>
            )
          })
        }
      </ButtonsContainer>
      <ToastContainer/>
      </>
    )
  }

