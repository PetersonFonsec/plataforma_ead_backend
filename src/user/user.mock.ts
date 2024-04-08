/* eslint-disable prettier/prettier */
import { Roles } from '../shared/enums/role.enum';

export const USER = JSON.parse(
  JSON.stringify({
    name: 'Peterson Fonseca',
    email: 'peterson@gmail.com',
    password: 'Senha123!',
    documentNumber: '69721577065',
    role: Roles.STUDENT,
    id: 1
  }),
);
