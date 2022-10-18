import * as RadioGroup from "@radix-ui/react-radio-group";
import styled from "styled-components";

interface ActiveButtonProps {
  variant: 'active' | '';
}

export const ButtonsContainer = styled.div`
width: 100%;
max-width:1120px;
margin: 0.5rem auto 0;
padding: 0 1.5rem;
display: flex;
justify-content: center;
gap: 10px;
`
export const PaginationButton = styled.button<ActiveButtonProps>`
  border:0;
  padding:1rem;
  background: ${props => props.variant === 'active' ? props.theme['green-300'] : ['transparent'] };
  border: 1px solid ${props => props.theme['green-300']};
  color:${props => props.variant === 'active' ? props.theme['white'] : props.theme['green-300']};
  font-weight: bold;
  border-radius: 6px;
  box-shadow: 0 0 0 0;
  
  &:hover {
    background: ${props => props.theme['green-500']};;
    border-color: 1px solid ${props => props.theme['green-500']};
    color: ${props => props.theme['white']};
    transition: background-color 0.2s, color 0.2s, border-color 0,2s;
  }
 
`