import { AccountInfo, PublicClientApplication } from "@azure/msal-browser";
import { environment } from "../environments";
import { Token } from "@angular/compiler";

export const authConfig ={
    auth:{
        clientId: environment.clientId, 
        authority:'https://login.microsoftonline.com/'+ environment.tenantId,
        redirectUri: "http://localhost:4200/",
    }
};

const data={
    account:null as AccountInfo | null,
    msalInstance: new PublicClientApplication(authConfig),
    token:""
}


export function useAuth(){
    return data;
} 