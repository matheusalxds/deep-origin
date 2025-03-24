import { fieldsToObfuscate } from '@/shared/logger/obfuscate-fields';
import { obfuscator } from '@/shared/logger/obfuscator';

export type LogMsgIn = { svc: string; func: string };
export type LogMsgMidIn = { svc: string; msg: string };

type LogMsgOut = {
  msg: string;
  data?: object;
};

export const msgStart = (msg: LogMsgIn, data?: object): LogMsgOut => ({
  msg: `${msg.svc} - ${msg.func} - Start`,
  ...(data && { data: obfuscator(data, fieldsToObfuscate) }),
});

export const msgMid = (msg: LogMsgMidIn, data?: object): LogMsgOut => ({
  msg: `${msg.svc} - ${msg.msg}`,
  ...(data && { data: obfuscator(data, fieldsToObfuscate) }),
});

export const msgEnd = (msg: LogMsgIn, data?: object): LogMsgOut => ({
  msg: `${msg.svc} - ${msg.func} - End`,
  ...(data && { data: obfuscator(data, fieldsToObfuscate) }),
});
