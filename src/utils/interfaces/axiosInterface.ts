export interface AxiosRequestInterface {
  method: string;
  url: string;
  params: any;
  data: any;
  timeout: number;
  headers: any;
}

export interface AxiosResponseInterface {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request: any;
}
