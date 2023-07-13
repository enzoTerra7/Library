import { ApiProperty } from "@nestjs/swagger";

export class CollectionDto {
  @ApiProperty({
    description: 'Nome da coleção',
    default: 'Coleção 1'
  })
  name: string;

  @ApiProperty({
    description: 'Id do usuário responsável pela coleção',
    default: '64aff4cbae202d7f3676fbc4'
  })
  userId: string;
}
