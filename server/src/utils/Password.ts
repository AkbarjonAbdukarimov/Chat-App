import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
type hash = { buff: string; salt: string };
export default class Password {
  private static asyncScrypt = promisify(scrypt);

  static async hashPassword(password: string): Promise<hash> {
    const salt = randomBytes(8).toString("hex");
    const buff = (await Password.asyncScrypt(password, salt, 64)) as Buffer;

    return { buff: buff.toString("hex"), salt: salt };
  }
  static async compare(password: string, userPass: string): Promise<boolean> {
    const hash: hash = {
      buff: userPass.split(".")[0],
      salt: userPass.split(".")[1],
    };
    const buff = (await Password.asyncScrypt(
      password,
      hash.salt,
      64
    )) as Buffer;
    return buff.toString("hex") === hash.buff;
  }
}
