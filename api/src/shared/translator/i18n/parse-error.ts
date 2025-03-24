type ParseError = {
  source: string;
  internal: string;
  args?: object;
  stackTrace?: Error;
};

export const parseError = ({ source, internal, args, stackTrace }: ParseError): ParseError => ({
  source,
  internal,
  ...(args && { args }),
  ...(stackTrace && { stackTrace }),
});
