import { InvalidCredentialError } from "../../domain/errors/invalid-credential-error.ts";
import type { RefreshTokenRepository } from "../../domain/repositories/refresh-token-repository.ts";
import type { UsersRepository } from "../../domain/repositories/users-repository.ts";
import type { HashService } from "../../domain/services/HashService.ts";
import type { AuthenticateUserDTO, UserDto } from "../dtos/user-dtos.ts";
import { UserMapper } from "../mappers/user-mapper.ts";

export class AuthenticateUseCase {
	constructor(
		private usersRepository: UsersRepository,
		private refreshTokensRepository: RefreshTokenRepository,
		private hashService: HashService,
	) {}

	async execute({ email, password }: AuthenticateUserDTO): Promise<UserDto> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new InvalidCredentialError();
		}

		const doesPasswordMatch = await this.hashService.compare(
			password,
			user.password,
		);

		if (!doesPasswordMatch) {
			throw new InvalidCredentialError();
		}

		await this.refreshTokensRepository.deleteByUserId(user.id);
		await this.refreshTokensRepository.generate(user.id);

		return UserMapper.toDTO(user);
	}
}
