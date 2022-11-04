import {  HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import * as Dialog from '@radix-ui/react-dialog'

import logoImg from '../../assets/logo.svg';
import { NewTransactionModal } from "../NewTransacitonModal";
import { useState } from "react";
import { PlusCircle } from "phosphor-react";

export function Header() {
    const [open, setOpen] = useState(false);

    return (
        <HeaderContainer>
          <HeaderContent>
						<img src={logoImg} alt=""/>
            <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Trigger asChild>
                <NewTransactionButton>
                  New Transation
                <PlusCircle size={28}/>
                </NewTransactionButton>
              </Dialog.Trigger>

             <NewTransactionModal open={open} onOpenChange={setOpen}/>
            </Dialog.Root>
          </HeaderContent>
         
        </HeaderContainer>        
    )
}