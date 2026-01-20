export interface IHashService {
	hash(value: string): Promise<string>;
	compare(password: string, userPassword: string): Promise<boolean>;
}
