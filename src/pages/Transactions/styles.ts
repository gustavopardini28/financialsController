import { Student } from "phosphor-react";
import styled from "styled-components";

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width:1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
  min-height: 10rem;
  overflow:auto;
  
  ::-webkit-scrollbar{
    width:0;
  }
`;

export const TransactionsTable = styled.table`
width:100%;
min-width:1000px;
border-collapse:separate;
border-spacing: 0 0.5rem;
margin-top:1.5rem;
table-layout:fixed;
overflow:auto;

td{
  padding: 1.25rem 2rem;
  background: ${props => props.theme['gray-700']};

  &:first-child {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &:last-child {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    display:flex;
  }

  button {
    border:0;
    background: transparent;
    color: ${props => props.theme['red-300']};
    padding: 0 0.25rem 0.1rem 0.25rem;
    box-shadow: 0 0;

    &:hover {
      color: ${props => props.theme['red-500']};
      transition: 0.2s;
    }    
  }
}


`;


interface PriceHighlightProps {
  variant: 'income' | 'outcome';
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${props => props.variant === 'income' ? props.theme['green-300'] : props.theme['red-300']}
`