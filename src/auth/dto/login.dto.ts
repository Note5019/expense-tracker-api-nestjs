export class LoginDTO {
  /**
   * Email for login
   * @example test@mail.com
   */
  readonly email: string;

  /**
   * Password for loing
   * @example password
   */
  readonly password: string;
}
