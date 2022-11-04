import styled, { css } from 'styled-components'

export const SummaryContainer = styled.section`
  width: 100%;
  max-width:1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); 
  gap: 2rem;

  margin-top: -5rem; 

  @media (max-width:952px ) {    
    grid-template-columns: repeat(3,1fr);
    overflow-x:auto;
    
    ::-webkit-scrollbar{
      width: 0;
    }
  }
`;

interface SummaryCardProps{
  variant?: 'green' | 'red';
}

export const SummaryCard = styled.div<SummaryCardProps>`
  background: ${props => props.theme['gray-600']};
  border-radius: 6px;
  padding: 2rem 2rem 2rem 2rem;

  header{
    display: flex;
    align-items:center;
    justify-content:space-between;
    color: ${props => props.theme['gray-300']};
  }
  
  strong{
    display: inline-block;
    margin-top:1rem;
    font-size:2rem;
 
  }

  ${props => props.variant === 'red' && css`
    background: ${props => props.theme['green-700']};
  `}

  ${props => props.variant === 'green' && css`
    background: ${props => props.theme['red-700']};
  `}

  
`