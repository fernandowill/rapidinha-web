/*
|--------------------------------------------------------------------------
| Validator file
|--------------------------------------------------------------------------
|
| The validator file is used for configuring global transforms for VineJS.
| The transform below converts all VineJS date outputs from JavaScript
| Date objects to Luxon DateTime instances, so that validated dates are
| ready to use with Lucid models and other parts of the app that expect
| Luxon DateTime.
|
*/

import { DateTime } from 'luxon'
import vine, { SimpleMessagesProvider, VineDate } from '@vinejs/vine'

declare module '@vinejs/vine/types' {
  interface VineGlobalTransforms {
    date: DateTime
  }
}

VineDate.transform((value) => DateTime.fromJSDate(value))

vine.messagesProvider = new SimpleMessagesProvider(
  {
    'required': 'O campo {{ field }} é obrigatório',
    'email': 'E-mail inválido',
    'minLength': 'O campo {{ field }} precisa ter pelo menos {{ min }} caracteres',
    'maxLength': 'O campo {{ field }} pode ter no máximo {{ max }} caracteres',
    'regex': 'Use só letras, números, ponto e _',
    'sameAs': 'As senhas não são iguais',
    'database.unique': 'Esse {{ field }} já está em uso',
    'file': 'Escolha um arquivo',
    'file.size': 'Arquivo muito grande (máximo {{ size }})',
    'file.extname': 'Formato de arquivo não aceito',
  },
  {
    fullName: 'nome',
    username: 'usuário',
    email: 'e-mail',
    password: 'senha',
    passwordConfirmation: 'confirmação de senha',
    title: 'título',
  }
)
