import { Length, IsNotEmpty } from 'class-validator';

export abstract class loginDTO {
  @Length(3, 40)
  @IsNotEmpty()
  readonly username: string;

  @Length( 6, 16)
  readonly password: string;
}

export abstract class registerDTO {
  @Length(3, 40)
  readonly username: string;

  @Length( 6, 16)
  readonly password: string;

  @IsNotEmpty()
  readonly adress: string;

  @IsNotEmpty()
  readonly city: string;

  @IsNotEmpty()
  readonly state: string;
}

export abstract class createdUser {
  readonly accessToken: string;
}

export abstract class jwtPayloadModel {
  username: string;
  id: string;
}
