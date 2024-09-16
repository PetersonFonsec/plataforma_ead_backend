import * as bcrypt from 'bcrypt';

import { Roles } from "../../src/shared/enums/role.enum";

export const user_student = {
  email: 'thaina@gmail.com',
  name: 'Thaina Alexandre Silva',
  documentNumber: '36482444006',
  password: bcrypt.hashSync('Senha123!', 8),
  active: false,
  role: Roles.STUDENT,
  photo: "ce7509f2-0d8f-490e-81a6-1531005e8100"
}

export const user_director = {
  email: 'peterson@gmail.com',
  name: 'Peterson Fonseca Simião',
  documentNumber: '36479747062',
  password: bcrypt.hashSync('Senha123!', 8),
  active: true,
  role: Roles.DIRECTOR,
  photo: "ce7509f2-0d8f-490e-81a6-1531005e8100"
}

export const user_director_secundary = {
  email: 'bianca@gmail.com',
  name: 'Bianca Fonseca Simião',
  documentNumber: '69793804009',
  password: bcrypt.hashSync('Senha123!', 8),
  active: true,
  role: Roles.DIRECTOR,
  photo: "ce7509f2-0d8f-490e-81a6-1531005e8100"
}

export const user_teacher = {
  email: 'pietro@gmail.com',
  name: 'Pietro Fonseca Simião',
  documentNumber: '90146116097',
  password: bcrypt.hashSync('Senha123!', 8),
  active: false,
  role: Roles.TEACHER,
  photo: "ce7509f2-0d8f-490e-81a6-1531005e8100"
}
