import { Injectable } from "@angular/core";
import { io, Socket } from "socket.io-client";
import { ConfigService } from "./config.service";

@Injectable()
export class SocketService {
  private socket: Socket;

  constructor(_configService: ConfigService) {
    this.socket = io(_configService.config.baseUrl);
  }

  getSocket(): Socket {
    return this.socket;
  }
}
