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
    'string': 'O campo {{ field }} precisa ser um texto',
    'email': 'Informe um e-mail válido',
    'minLength': 'O campo {{ field }} precisa ter pelo menos {{ min }} caracteres',
    'maxLength': 'O campo {{ field }} pode ter no máximo {{ max }} caracteres',
    'regex': 'O campo {{ field }} está em um formato inválido',
    'sameAs': 'A confirmação de senha não confere com a senha',
    'database.unique': 'Esse {{ field }} já está em uso',
    'file': 'Selecione um arquivo para o campo {{ field }}',
    'file.size': 'O arquivo do campo {{ field }} pode ter no máximo {{ size }}',
    'file.extname': 'Formato não aceito no campo {{ field }}. Use: {{ extnames }}',
    'username.regex': 'O nome de usuário só pode ter letras, números, ponto e _',
  },
  {
    fullName: 'nome completo',
    username: 'nome de usuário',
    email: 'e-mail',
    password: 'senha',
    passwordConfirmation: 'confirmação de senha',
    title: 'título',
    description: 'descrição',
    video: 'vídeo',
    thumbnail: 'thumbnail',
  }
)
