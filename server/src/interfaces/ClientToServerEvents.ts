import IUser from "./IUser";

export default interface ClientToServerEvents {
  newUser: (user: IUser) => void;
  hello: (int: number) => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  // withAck: (d: string, callback: (e: number) => void) => void;
}
