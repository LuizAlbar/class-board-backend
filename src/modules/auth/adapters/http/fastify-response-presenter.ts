import type { FastifyReply } from "fastify";

export class FastifyResponsePresenter {
	static success(
		reply: FastifyReply,
		status: number,
		message: string,
		data?: unknown,
	) {
		return reply.status(status).send({
			success: true,
			code: status,
			message,
			data,
		});
	}

	static error(
		reply: FastifyReply,
		status: number,
		message: string,
		details?: unknown,
	) {
		return reply.status(status).send({
			success: false,
			code: status,
			error: message,
			details,
		});
	}
}
