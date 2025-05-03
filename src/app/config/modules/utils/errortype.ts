export type TerrorSource = {
    path: string | number;
    message: string;

  }[];

  export type TGerrorresponse ={
    statusCode :number;
    message:string;
    errorsource :TerrorSource; 
}

  