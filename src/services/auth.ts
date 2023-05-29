import { HydratedDocument } from "mongoose";
import { IUser } from "../types/user";
import {
  FastifyReply,
  FastifyRequest,
  RawServerBase,
  RouteGenericInterface,
} from "fastify";
import SessionService from "./session";

class AuthService<
  Request extends RouteGenericInterface,
  Reply extends RawServerBase
> {
  private readonly sessionService: SessionService<Request, Reply>;
  constructor(
    private readonly request: FastifyRequest<Request>,
    private readonly reply: FastifyReply<Reply>,
    private readonly user: HydratedDocument<IUser>
  ) {
    this.sessionService = new SessionService(request, reply, user);
  }

  public async login() {
    if (this.user.two_factor.enabled) {
      // handle 2FA
    } else {
      await this.sessionService.saveUser();
    }
  }
}

export default AuthService;
