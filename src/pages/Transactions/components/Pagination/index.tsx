import { ButtonsContainer, PaginationButton } from "./styles";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface PaginationProps {
  totalPosts: number;
  postsPerPage:number;
  setCurrentPage: (currentPage:number) => void;
  currentPage: number;
}

export function Pagination ({totalPosts, postsPerPage,setCurrentPage,currentPage}: PaginationProps) {
  const notify = () => toast('maximum post reached');
    
  
  let pages = [];
    for( let i = 1; i<= Math.ceil(totalPosts/postsPerPage); i++) {
      pages.push(i)
      console.log(pages.length)
      if(pages.length > 3) {
        
         pages.splice(-1)
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

