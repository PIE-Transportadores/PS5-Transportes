import { NextRequest, NextResponse } from "next/server";
import AutorizacaoSessao from "./action/service/auth-service";

export const config = {
    matcher: '/((?!_next/static|_next/image|favicon.ico).*)'   
}

const rotasnext = ['/','/componetes/Tela_login','/componetes/Tela_cadastro','/user','/home']

export async function middleware(req: NextRequest ){
    
    const pathname = req.nextUrl.pathname

    if(rotasnext.includes(pathname)){  
        return NextResponse.next();
    }
    
    const sessao = await AutorizacaoSessao.estavalidado();// validar a sesao da JWT

    if (!sessao){
        return NextResponse.redirect(new URL('/componetes/Tela_login',req.url))
    }

    return NextResponse.next()
}