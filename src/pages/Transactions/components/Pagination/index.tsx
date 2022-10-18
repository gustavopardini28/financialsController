import { ButtonsContainer, PaginationButton } from "./styles";

interface PaginationProps {
  totalPosts: number;
  postsPerPage:number;
  setCurrentPage: (currentPage:number) => void;
  currentPage: number;
}

export function Pagination ({totalPosts, postsPerPage,setCurrentPage,currentPage}: PaginationProps) {
    let pages = [];

    for( let i = 1; i<= Math.ceil(totalPosts/postsPerPage); i++) {
      pages.push(i)
    }

    return (
     <ButtonsContainer>
     {
        pages.map((page,index) => {
          
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
    )
}

