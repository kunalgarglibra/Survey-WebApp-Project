export interface UserForRegister {
  id?:number;
  name?:string;
  email?:string;
  mobile?:string;
  password?:string;
}

export interface UserForLogin {
  name:string;
  id:number;
  password:string;

}
