export abstract class loginDTO {
  readonly username: string;
  readonly password: string;
}

export abstract class registerDTO {
  readonly username: string;
  readonly password: string;
  readonly city?: string;
}