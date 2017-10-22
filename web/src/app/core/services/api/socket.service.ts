import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { ConfigService } from "./config.service";


@Injectable()
export class SocketService {
  private socket: io.SocketIOClient.Socket;

  constructor (private _configService: ConfigService) {
    this.socket = io(_configService.config.baseUrl);
  }

  getSocket (): io.SocketIOClient.Socket {
    return this.socket;
  }
}
