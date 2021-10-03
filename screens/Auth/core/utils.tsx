export const emailValidator = (email: string) => {
  const re = /\S+@\S+\.\S+/

  if (!email || email.length <= 0) {
    return 'Email не может быть пустым :('
  }
  if (!re.test(email)) {
    return 'Ой! Кажется вы ошиблись при вводе.'
  }

  return ''
}

export const passwordValidator = (password: string) => {
  if (!password || password.length <= 0) {
    return 'Неверная длинная пароля.'
  }

  return ''
}

export const nameValidator = (name: string) => {
  if (!name || name.length <= 0) {
    return 'Имя не может быть пустое.'
  }

  return ''
}
