import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
  @ApiProperty({
    description: 'Email do usuário - deve ser único por sistema',
    default: 'user@teste.com'
  })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário - deve ter pelo menos 8 caracteres sendo pelo menos: 1 letra maiúscula, 1 letra minúscula, 1 número e 1 simbolo (*$%!@)',
    default: 'Teste@2023'
  })
  password: string;
}