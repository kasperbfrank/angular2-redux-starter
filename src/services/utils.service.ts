import { Injectable } from '@angular/core';


@Injectable()
export class UtilsService {



  // UUID - Generator
  // -------------------------------------------------
  // Created by: https://github.com/wulfsolter
  // Repo: https://github.com/wulfsolter/angular2-uuid

  createUUID(): string {
    if (typeof (window.crypto) !== 'undefined' && typeof (window.crypto.getRandomValues) !== 'undefined') {
        let buf: Uint16Array = new Uint16Array(8);
        window.crypto.getRandomValues(buf);
        return (this.uuid_pad4(buf[0]) + this.uuid_pad4(buf[1]) + '-' + this.uuid_pad4(buf[2]) + '-' + this.uuid_pad4(buf[3]) +
          '-' + this.uuid_pad4(buf[4]) + '-' + this.uuid_pad4(buf[5]) + this.uuid_pad4(buf[6]) + this.uuid_pad4(buf[7]));
    } else {
        return this.uuid_rand4() + this.uuid_rand4() + '-'+ this.uuid_rand4() + '-' + this.uuid_rand4() + '-' +
            this.uuid_rand4() + '-' + this.uuid_rand4() + this.uuid_rand4() + this.uuid_rand4();
    }
  }

  private uuid_pad4(num: number): string {
    let ret: string = num.toString(16);
    while (ret.length < 4) {
      ret = '0' + ret;
    }
    return ret;
  }

  private uuid_rand4(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  // End @ UUID

}
