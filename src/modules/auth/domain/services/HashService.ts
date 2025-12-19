export interface HashService {
	hash(value: string): Promise<string>;
	compare(password: string, userPassword: string): Promise<boolean>;
}
