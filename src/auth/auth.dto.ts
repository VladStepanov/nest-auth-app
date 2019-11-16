export abstract class loginDTO {
  readonly username: string;
  readonly password: string;
}

export abstract class registerDTO {
  readonly username: string;
  readonly password: string;
  readonly adress: string;
  readonly city: string;
  readonly state: string;
}

export abstract class createdUser {
  readonly accessToken: string;
}

export abstract class jwtPayloadModel {
  username: string;
  id: string;
}
