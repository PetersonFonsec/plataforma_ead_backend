/* eslint-disable prettier/prettier */
import { Roles } from '../shared/enums/role.enum';

export const USER = () => JSON.parse(
  JSON.stringify({
    id: 1,
    role: Roles.STUDENT,
    password: 'Senha123!',
    name: 'Peterson Fonseca',
    email: 'peterson@gmail.com',
    confirm_password: 'Senha123!',
    documentNumber: '69721577065',
  }),
);
