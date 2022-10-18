import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUpRight, FileDoc, X } from 'phosphor-react';
import { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { api } from '../../lib/axios';

import { Overlay,Content, ClosedButton, TransactionType, TransactionTypeButton } from './styles';

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category:z.string(),
  type: z.enum(['income' , 'outcome']),
})

type newTransactionFormInput = z.infer<typeof newTransactionFormSchema>;

interface closeButtonProps {
  open: boolean;
  onOpenChange: (open:boolean) => void;
}

export function NewTransactionModal({open,onOpenChange}: closeButtonProps ) {

  const {createTransactions} = useContext(TransactionsContext);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: {isSubmitting}
    } = useForm<newTransactionFormInput>
    ({
      resolver: zodResolver(newTransactionFormSchema),
      defaultValues: {
        type: 'income'
      }
    })
   
     async function HandleCrateNewTransaciton (data: newTransactionFormInput) {
       const {category,description,price,type,} = data;  
       
       await createTransactions({
        category,   
        description,
        type,
        price,
       })

        reset();
        onOpenChange(false);
      }


  return (

      <Dialog.Portal>
        <Overlay />
        <Content>
          <Dialog.Title>New Transaction</Dialog.Title>

          <ClosedButton >
            <X size={24} />
          </ClosedButton>


          <form onSubmit={handleSubmit(HandleCrateNewTransaciton)}>
            <input
              type='text'
              placeholder='Description'
              required
              {...register('description')}
            />
            <input
              type='number'
              placeholder='Price'
              required
              {...register('price', { valueAsNumber: true })}
            />
            <input
              type='text'
              placeholder='Category'
              required
              {...register('category')}
            />

            <Controller
              control={control}
              name='type'
              render={({ field }) => {
                return (
                  <TransactionType onValueChange={field.onChange} value={field.value}>
                    <TransactionTypeButton variant='income' value='income'>
                      <ArrowCircleUpRight size={24} />
                      Income
                    </TransactionTypeButton>
                    <TransactionTypeButton variant='outcome' value='outcome'>
                      <ArrowCircleDown size={24} />
                      Outcome
                    </TransactionTypeButton>
                  </TransactionType>
                )
              }}
            />

            <button type='submit' disabled={isSubmitting}>
              Sign up
            </button>
          </form>
        </Content>
      </Dialog.Portal>

  );
}