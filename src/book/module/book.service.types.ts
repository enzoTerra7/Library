import { ApiProperty } from "@nestjs/swagger";

export class BookDTO {
  id?: string

  @ApiProperty({
    description: 'Título do livro'
  })
  title: string;

  @ApiProperty({
    description: 'Descrição do livro'
  })
  description: string;

  @ApiProperty({
    description: 'ID do usuário ao qual o livro pertence'
  })
  userId: string
}