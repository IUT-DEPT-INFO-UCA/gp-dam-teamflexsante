import { HttpException } from '@nestjs/common';

export async function checkPasswordStrength(
  password: string,
): Promise<boolean> {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigits = /\d/.test(password);
  const isLongEnough = password.length >= 8;

  if (!hasUpperCase || !hasLowerCase || !hasDigits || !isLongEnough) {
    throw new HttpException(
      'Password does not match the requirements. Please choose a stronger password.',
      400,
    );
  }
  return true;
}
